import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../components/LanguageContext';

const Products: React.FC = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: "Cattle Farming",
      image: "https://6a43190294555f542c2e4a86.imgix.net/kandang-lembu.jpg",
      items: ["Quality Beef Cattle", "Local & Crossbreed Cattle", "Healthy & Well-cared"]
    },
    {
      title: "Broiler Chicken",
      image: "https://6a43190294555f542c2e4a86.imgix.net/ayam-daging-farm.jpg",
      items: ["Fresh Broiler Meat", "High Quality Diet", "Optimum Growth"]
    },
    {
      title: "Free-range Chicken",
      image: "https://6a43190294555f542c2e4a86.imgix.net/ayam-kampung-bebas.jpg",
      items: ["Authentic Free-range Chicken", "Free-roaming Farm", "Firm & Tasty Meat"]
    },
    {
      title: "Duck Farming",
      image: "https://6a43190294555f542c2e4a86.imgix.net/itik-kolam.jpg",
      items: ["Meat Ducks", "Laying Ducks", "Clean Farming Environment"]
    },
    {
      title: "Fresh Duck Eggs",
      image: "https://6a43190294555f542c2e4a86.imgix.net/telur-itik-segar.jpg",
      items: ["Grade A Fresh Duck Eggs", "Beautiful & Quality Yolks", "Rich in Nutrients"]
    },
    {
      title: "Salted Eggs",
      image: "https://6a43190294555f542c2e4a86.imgix.net/proses-telur-masin.jpg",
      items: ["Authentic Salted Eggs", "Traditional Processing", "Suitable for Various Dishes"]
    }
  ];

  return (
    <PageTransition>
      <div className="bg-farm-50 dark:bg-gray-900 py-24 text-center transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-6"
          >
            {t('Our Products & Livestock')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            {t('From our farm straight to you. Explore the range of fresh, healthy, and high-quality livestock produce from Usin Farm Enterprise.')}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md border border-transparent dark:border-gray-700 group transition-colors duration-300"
            >
              <div className="h-72 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img src={cat.image} alt={t(cat.title)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-farm-900 dark:text-farm-300 mb-6">{t(cat.title)}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <span className="w-2 h-2 rounded-full bg-farm-400" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full py-3 rounded-xl border-2 border-farm-500 text-farm-600 dark:text-farm-400 font-medium hover:bg-farm-500 hover:text-white dark:hover:bg-farm-500 dark:hover:text-white transition-colors">
                  {t('Contact Us')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Products;
