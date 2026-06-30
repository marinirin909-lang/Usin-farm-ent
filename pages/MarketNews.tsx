import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw, Newspaper, ExternalLink, Activity } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../components/LanguageContext';

import { WeatherWidget } from '../components/WeatherWidget';

interface PriceQuote {
  symbol: string;
  name: string;
  unit: string;
  price?: number;
  change?: number;
  changePercent?: number;
  currency?: string;
  error?: string;
}

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

const MarketNews: React.FC = () => {
  const { t } = useLanguage();
  const [prices, setPrices] = useState<PriceQuote[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);

  const fetchPrices = async () => {
    setLoadingPrices(true);
    try {
      const res = await fetch('/api/prices');
      if (res.ok) {
        const data = await res.json();
        setPrices(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPrices(false);
    }
  };

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const data = await res.json();
        setNews(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingNews(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    fetchNews();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-4 bg-farm-100 dark:bg-gray-800 rounded-full mb-6 text-farm-600 dark:text-farm-400"
          >
            <Activity size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-farm-900 dark:text-white mb-6"
          >
            {t('Pasaran & Berita Terkini')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            {t('Pantau harga komoditi pertanian dan ikuti berita terkini mengenai industri pertanian dan penternakan.')}
          </motion.p>
        </div>

        <div className="mb-12">
          <WeatherWidget />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Prices Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold flex items-center gap-3 text-farm-900 dark:text-white">
                <TrendingUp className="text-farm-500" />
                {t('Harga Pasaran Semasa')}
              </h2>
              <button 
                onClick={fetchPrices} 
                disabled={loadingPrices}
                className="p-2 text-gray-500 hover:text-farm-600 hover:bg-farm-50 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
              >
                <RefreshCw size={20} className={loadingPrices ? 'animate-spin' : ''} />
              </button>
            </div>

            {loadingPrices ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <RefreshCw size={32} className="animate-spin mb-4 text-farm-500" />
                <p>{t('Memuatkan data pasaran...')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {prices.map((quote, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{quote.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{quote.symbol}</p>
                    </div>
                    {quote.error ? (
                      <div className="text-sm text-red-500 mt-2 sm:mt-0">{quote.error}</div>
                    ) : (
                      <div className="flex items-center gap-4 mt-2 sm:mt-0 text-right">
                        <div>
                          <p className="font-mono font-bold text-lg text-gray-900 dark:text-white">
                            {quote.price?.toFixed(2)} <span className="text-sm font-sans font-normal text-gray-500">{quote.currency}</span>
                          </p>
                          <p className="text-xs text-gray-500">{quote.unit}</p>
                        </div>
                        <div className={`flex items-center gap-1 font-medium ${quote.changePercent && quote.changePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {quote.changePercent && quote.changePercent > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          {Math.abs(quote.changePercent || 0).toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* News Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold flex items-center gap-3 text-farm-900 dark:text-white">
                <Newspaper className="text-blue-500" />
                {t('Berita Terkini')}
              </h2>
              <button 
                onClick={fetchNews} 
                disabled={loadingNews}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
              >
                <RefreshCw size={20} className={loadingNews ? 'animate-spin' : ''} />
              </button>
            </div>

            {loadingNews ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <RefreshCw size={32} className="animate-spin mb-4 text-blue-500" />
                <p>{t('Memuatkan berita...')}</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {news.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">{t('Tiada berita dijumpai.')}</p>
                ) : (
                  news.map((item, idx) => (
                    <motion.a 
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      className="block p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-blue-200 transition-all group"
                    >
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span className="font-medium px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md">
                          {item.source}
                        </span>
                        <div className="flex items-center gap-2">
                          {new Date(item.pubDate).toLocaleDateString()}
                          <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </motion.a>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MarketNews;
