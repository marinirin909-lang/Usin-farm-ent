import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../components/LanguageContext';

import freshDuckEggsImg from '../src/assets/images/fresh_duck_eggs_1782846535474.jpg';
import saltedEggsImg from '../src/assets/images/salted_eggs_1782846545492.jpg';
import cattleFarmingImg from '../src/assets/images/cattle_farming_1782846491474.jpg';
import broilerChickenImg from '../src/assets/images/broiler_chicken_1782846502873.jpg';
import farmPastureImg from '../src/assets/images/farm_pasture_1782846603942.jpg';
import duckFarmingImg from '../src/assets/images/duck_farming_1782846525465.jpg';
import farmTractorImg from '../src/assets/images/farm_tractor_1782846581667.jpg';
import farmHarvestImg from '../src/assets/images/farm_harvest_1782846592629.jpg';
import freeRangeChickenImg from '../src/assets/images/free_range_chicken_1782846513412.jpg';

const Gallery: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const items = [
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/pemotongan-daging.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/makanan-ternakan.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/lembu-padang.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/itik-kolam.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/ayam-kampung.mp4' },
    { type: 'image', src: freshDuckEggsImg },
    { type: 'image', src: saltedEggsImg },
    { type: 'image', src: cattleFarmingImg },
    { type: 'image', src: broilerChickenImg },
    { type: 'image', src: farmPastureImg },
    { type: 'image', src: duckFarmingImg },
    { type: 'image', src: farmTractorImg },
    { type: 'image', src: farmHarvestImg },
    { type: 'image', src: freeRangeChickenImg },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/videoplayback%20(12).mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/videoplayback%20(11).mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/videoplayback%20(6).mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/telur-masin-proses.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/penghantaran.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/lawatan-farm.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/kandang-lembu.mp4' }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-6">{t('Farm Gallery')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('Take a visual tour through Usin Farm Enterprise. From our golden harvests to our healthy livestock.')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group aspect-square rounded-2xl overflow-hidden relative shadow-md hover:shadow-2xl cursor-pointer bg-gray-100 dark:bg-gray-800 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-farm-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center pointer-events-none">
                <span className="text-white font-medium px-6 py-2 border-2 border-white rounded-full">
                  {item.type === 'video' ? t('Play Video') : t('View Image')}
                </span>
              </div>
              {item.type === 'video' ? (
                <video 
                  src={item.src} 
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              ) : (
                <img 
                  src={item.src} 
                  alt="Gallery Item" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Gallery;
