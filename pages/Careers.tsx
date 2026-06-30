import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { Briefcase, MapPin } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const Careers: React.FC = () => {
  const { t } = useLanguage();

  const jobs = [
    { title: "Senior Agronomist", type: "Full-Time", dept: "Operations" },
    { title: "Livestock Care Specialist", type: "Full-Time", dept: "Livestock" },
    { title: "Farm Equipment Operator", type: "Full-Time", dept: "Machinery" },
    { title: "Seasonal Harvester", type: "Contract", dept: "Operations" }
  ];

  return (
    <PageTransition>
      <div className="bg-farm-900 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            {t('Join Our Team')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg text-farm-100 max-w-2xl mx-auto"
          >
            {t('Grow your career with us. We\'re always looking for passionate individuals who care about sustainable agriculture.')}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 max-w-4xl text-center">
        <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-700 mb-6 text-gray-400">
            <Briefcase size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-4">
            {t('Tiada kekosongan buat masa sekarang')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {t('Sila semak kembali pada masa akan datang untuk peluang kerjaya bersama kami.')}
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Careers;
