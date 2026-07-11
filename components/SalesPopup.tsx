import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Phone } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const SalesPopup: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      if (!hasOpened) {
        setIsOpen(true);
        setHasOpened(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasOpened]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-[100] w-[calc(100vw-2rem)] sm:w-[400px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-farm-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="bg-farm-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-lg">
                <ShoppingBag size={20} />
                {t('Special Offer!')}
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-farm-100 hover:text-white transition-colors"
                aria-label={t('Close')}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-2">
                {t('Accepting Orders Now')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm">
                {t('Fresh from the farm! We are taking orders for high-quality beef, free-range chicken, duck, and our famous salted eggs.')}
              </p>
              
              <div className="space-y-4">
                <a 
                  href="https://wa.me/60138010718" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors border border-green-100 dark:border-green-800/30 group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Hussin</div>
                    <div className="text-green-600 dark:text-green-400 font-medium">+60 13-801 0718</div>
                  </div>
                </a>
                
                <a 
                  href="https://wa.me/60194079318" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors border border-green-100 dark:border-green-800/30 group"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">Maknuyah</div>
                    <div className="text-green-600 dark:text-green-400 font-medium">+60 19-407 9318</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Action Button when closed */}
      <AnimatePresence>
        {!isOpen && hasOpened && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 left-4 sm:bottom-8 sm:left-8 z-50 w-16 h-16 bg-farm-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-farm-700 hover:scale-105 transition-all"
            aria-label={t('Order Now')}
          >
            <ShoppingBag size={28} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
