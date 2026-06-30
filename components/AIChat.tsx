/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, MapPin, Search, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ChatMode = 'normal' | 'thinking' | 'search' | 'maps';

interface ChatMessage {
  role: 'model' | 'user';
  text: string;
  chunks?: any[];
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>('normal');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Selamat datang ke Usin Farm! Tanya saya tentang ternakan, perkhidmatan, atau gunakan mode AI khas di bawah. 🚜' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(scrollToBottom, 100);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, mode }),
      });
      const data = await res.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'model', text: data.error }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: data.text, chunks: data.chunks }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Ralat rangkaian. Sila cuba lagi.' }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-96 bg-white/95 backdrop-blur-xl border border-farm-200 rounded-2xl overflow-hidden shadow-2xl shadow-farm-900/10 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-farm-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-farm-200 animate-pulse" />
                <h3 className="font-serif font-bold tracking-wider">Usin Farm AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Modes */}
            <div className="bg-farm-50 p-2 flex gap-1 border-b border-farm-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
              <button 
                onClick={() => setMode('normal')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${mode === 'normal' ? 'bg-farm-600 text-white' : 'bg-white text-farm-700 hover:bg-farm-100 border border-farm-200'}`}
              >
                <MessageCircle size={14} /> Sembang
              </button>
              <button 
                onClick={() => setMode('thinking')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${mode === 'thinking' ? 'bg-farm-600 text-white' : 'bg-white text-farm-700 hover:bg-farm-100 border border-farm-200'}`}
              >
                <BrainCircuit size={14} /> Pakar
              </button>
              <button 
                onClick={() => setMode('search')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${mode === 'search' ? 'bg-farm-600 text-white' : 'bg-white text-farm-700 hover:bg-farm-100 border border-farm-200'}`}
              >
                <Search size={14} /> Web
              </button>
              <button 
                onClick={() => setMode('maps')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${mode === 'maps' ? 'bg-farm-600 text-white' : 'bg-white text-farm-700 hover:bg-farm-100 border border-farm-200'}`}
              >
                <MapPin size={14} /> Peta
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth bg-gray-50/50"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-farm-600 text-white rounded-br-sm shadow-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm border border-farm-100 shadow-sm'
                    }`}
                  >
                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                    {msg.chunks && msg.chunks.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs font-semibold text-farm-600 mb-2">Rujukan:</p>
                        <div className="flex flex-col gap-1.5">
                          {msg.chunks.map((chunk: any, i: number) => {
                            const uri = chunk.web?.uri || chunk.maps?.uri;
                            const title = chunk.web?.title || chunk.maps?.title || uri;
                            if (!uri) return null;
                            return (
                              <a key={i} href={uri} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 truncate">
                                {chunk.maps ? <MapPin size={10} /> : <Search size={10} />} {title}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-farm-100 p-4 rounded-2xl rounded-bl-sm flex gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 bg-farm-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-farm-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-farm-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-farm-100">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Tanya saya apa sahaja..."
                  className="flex-1 bg-gray-50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-farm-500 rounded-xl px-4 py-3 border border-gray-200"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-farm-600 p-3 rounded-xl hover:bg-farm-700 transition-colors disabled:opacity-50 text-white flex items-center justify-center absolute right-1 top-1 bottom-1"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-farm-600 hover:bg-farm-700 flex items-center justify-center shadow-lg shadow-farm-900/30 text-white z-50 transition-colors border-2 border-white"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
