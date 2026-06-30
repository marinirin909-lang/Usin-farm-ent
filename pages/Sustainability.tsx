import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { Recycle, Droplets, Sun, Sprout } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import sustainableImg from '../src/assets/images/regenerated_image_1782834957355.png';

const Sustainability: React.FC = () => {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="bg-farm-50 dark:bg-gray-900 py-24 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-6">{t('Our Commitment to the Earth')}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t('At Usin Farm, we believe that true agricultural success is measured by the health of the ecosystem. We have implemented comprehensive sustainable practices to ensure our land remains fertile for generations.')}
              </p>
              <button className="bg-farm-600 hover:bg-farm-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
                {t('Read Our Impact Report')}
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <img src={sustainableImg} alt="Sustainable farming" className="rounded-3xl shadow-2xl w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-serif font-bold text-farm-900 dark:text-farm-400 text-center mb-16">{t('Key Initiatives')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Recycle />, title: "Zero Waste", desc: "Composting all organic waste to create natural fertilizers." },
            { icon: <Droplets />, title: "Water Conservation", desc: "Advanced drip irrigation reducing water usage by 40%." },
            { icon: <Sun />, title: "Solar Powered", desc: "Our facilities operate on 100% renewable solar energy." },
            { icon: <Sprout />, title: "Soil Health", desc: "Practicing crop rotation to maintain rich, nutrient-dense soil." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-farm-100 dark:bg-gray-900 text-farm-600 dark:text-farm-400 rounded-full flex items-center justify-center mx-auto mb-6">
                {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold text-farm-900 dark:text-farm-300 mb-4">{t(item.title)}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t(item.desc)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Sustainability;
