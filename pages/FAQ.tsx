import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const FAQ: React.FC = () => {
  const { t } = useLanguage();

  const faqs = [
    { q: "Are your products 100% organic?", a: "Yes, we adhere strictly to organic farming principles. We do not use any synthetic pesticides, herbicides, or artificial fertilizers." },
    { q: "Do you offer farm tours?", a: "We offer guided farm tours during the spring and summer months. Please check our Services page or contact us to book a slot." },
    { q: "Where can I buy your produce?", a: "Our produce is available for wholesale delivery, and can also be purchased at local farmers' markets and selected organic grocery stores in the region." },
    { q: "How do you handle pest control organically?", a: "We use integrated pest management (IPM) techniques, including introducing beneficial insects, crop rotation, and natural botanical repellents." },
    { q: "Do you deliver to residential addresses?", a: "Currently, we only provide wholesale delivery to businesses. However, individuals can purchase our products via our retail partners." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-6">{t('Frequently Asked Questions')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t('Find answers to common questions about our farm and practices.')}</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="border border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 overflow-hidden"
            >
              <button 
                className="w-full text-left p-6 flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-farm-900 dark:text-farm-100 pr-8">{t(faq.q)}</span>
                <ChevronDown className={`shrink-0 text-farm-500 dark:text-farm-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-gray-600 dark:text-gray-400"
                  >
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                      {t(faq.a)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default FAQ;
