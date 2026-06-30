import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import yahooFinance from 'yahoo-finance2';
import Parser from 'rss-parser';

const parser = new Parser();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Init Gemini
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  const SYSTEM_INSTRUCTION = `Anda ialah Pakar AI Usin Farm Enterprise. Anda membantu menjawab persoalan berkaitan pertanian, penternakan lembu, ayam kampung, ayam daging, itik, dan produk pertanian lain. Jawab dalam Bahasa Melayu. Sentiasa mesra dan membantu.`;

  // API Route for Gemini Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, mode } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Sistem AI sedang luar talian (Kunci API tiada)." });
      }

      let modelName = "gemini-3.5-flash";
      let toolConfig = {};
      let tools = undefined;
      let thinkingConfig = undefined;

      if (mode === "thinking") {
        modelName = "gemini-3.1-pro-preview";
        thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      } else if (mode === "search") {
        tools = [{ googleSearch: {} }];
      } else if (mode === "maps") {
        tools = [{ googleMaps: {} }];
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: message,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig,
          tools,
        },
      });

      // Extract chunks if present (for grounding)
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      res.json({ text: response.text, chunks });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Gagal menyambung ke sistem AI. Sila cuba lagi." });
    }
  });

  // API Route for Market Prices
  app.get("/api/prices", async (req, res) => {
    try {
      const symbols = [
        { symbol: 'LE=F', name: 'Lembu Hidup (Live Cattle)', unit: 'USD / lb' },
        { symbol: 'HE=F', name: 'Daging Babi (Lean Hogs)', unit: 'USD / lb' },
        { symbol: 'ZC=F', name: 'Jagung (Corn)', unit: 'USD / gantang' },
        { symbol: 'ZS=F', name: 'Kacang Soya (Soybean)', unit: 'USD / gantang' },
        { symbol: 'KE=F', name: 'Gandum (Wheat)', unit: 'USD / gantang' },
        { symbol: 'FCPO.KL', name: 'Minyak Sawit Mentah', unit: 'MYR / tan' }
      ];
      
      const quotes = await Promise.all(
        symbols.map(async (s) => {
          try {
            const quote = await yahooFinance.quote(s.symbol);
            return {
              ...s,
              price: quote.regularMarketPrice,
              change: quote.regularMarketChange,
              changePercent: quote.regularMarketChangePercent,
              currency: quote.currency
            };
          } catch (e) {
            return { ...s, error: 'Tiada data' };
          }
        })
      );
      
      res.json(quotes);
    } catch (error) {
      console.error('Error fetching prices:', error);
      res.status(500).json({ error: 'Gagal mendapatkan harga pasaran' });
    }
  });

  // API Route for Agriculture News
  app.get("/api/news", async (req, res) => {
    try {
      const feed = await parser.parseURL('https://news.google.com/rss/search?q=pertanian+OR+penternakan+malaysia&hl=ms&gl=MY&ceid=MY:ms');
      
      const news = feed.items.slice(0, 10).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        source: item.source || 'Berita Pertanian',
      }));
      
      res.json(news);
    } catch (error) {
      console.error('Error fetching news:', error);
      res.status(500).json({ error: 'Gagal mendapatkan berita' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Express v5 catch-all routing using RegExp
    app.get(/.*/, (req, res, next) => {
      res.sendFile(path.join(distPath, 'index.html'), (err) => {
        if (err) next(err);
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
