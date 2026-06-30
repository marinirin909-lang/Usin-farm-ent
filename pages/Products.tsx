import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../components/LanguageContext';

import cattleFarmingImg from '../src/assets/images/cattle_farming_1782846491474.jpg';
import broilerChickenImg from '../src/assets/images/broiler_chicken_1782846502873.jpg';
import freeRangeChickenImg from '../src/assets/images/free_range_chicken_1782846513412.jpg';
import duckFarmingImg from '../src/assets/images/duck_farming_1782846525465.jpg';
import freshDuckEggsImg from '../src/assets/images/fresh_duck_eggs_1782846535474.jpg';
import saltedEggsImg from '../src/assets/images/salted_eggs_1782846545492.jpg';

const Products: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const categories = [
    {
      title: "Cattle Farming",
      image: cattleFarmingImg,
      items: ["Quality Beef Cattle", "Local & Crossbreed Cattle", "Healthy & Well-cared"]
    },
    {
      title: "Broiler Chicken",
      image: broilerChickenImg,
      items: ["Fresh Broiler Meat", "High Quality Diet", "Optimum Growth"]
    },
    {
      title: "Free-range Chicken",
      image: freeRangeChickenImg,
      items: ["Authentic Free-range Chicken", "Free-roaming Farm", "Firm & Tasty Meat"]
    },
    {
      title: "Duck Farming",
      image: duckFarmingImg,
      items: ["Meat Ducks", "Laying Ducks", "Clean Farming Environment"]
    },
    {
      title: "Fresh Duck Eggs",
      image: freshDuckEggsImg,
      items: ["Grade A Fresh Duck Eggs", "Beautiful & Quality Yolks", "Rich in Nutrients"]
    },
    {
      title: "Salted Eggs",
      image: saltedEggsImg,
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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md border border-transparent dark:border-gray-700 group transition-colors duration-300 hover:shadow-2xl"
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
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Products;
