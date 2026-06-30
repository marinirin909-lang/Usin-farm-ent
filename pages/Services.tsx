import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { Truck, BookOpen, Warehouse, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Truck size={48} className="text-farm-600" />,
      title: "Wholesale Delivery",
      desc: "Reliable, temperature-controlled delivery of fresh produce and meats directly to restaurants, supermarkets, and local businesses."
    },
    {
      icon: <BookOpen size={48} className="text-farm-600" />,
      title: "Agricultural Consultation",
      desc: "Expert advice on crop rotation, soil health, and sustainable farming methods for new and transitioning farmers."
    },
    {
      icon: <Warehouse size={48} className="text-farm-600" />,
      title: "Storage Solutions",
      desc: "State-of-the-art cold storage and grain silos available for seasonal rent to help manage harvest overflow."
    },
    {
      icon: <HeartHandshake size={48} className="text-farm-600" />,
      title: "Farm Tours & Education",
      desc: "Immersive guided tours for schools and families to learn about where their food comes from and how it's grown."
    }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-6"
          >
            {t('Farm Services')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            {t('Beyond growing premium crops, Usin Farm Enterprise provides essential services to support the broader agricultural ecosystem and community.')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border-t-4 border-farm-500"
            >
              <div className="mb-6 bg-farm-50 dark:bg-gray-900 w-20 h-20 rounded-2xl flex items-center justify-center">
                {srv.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-farm-900 dark:text-farm-300 mb-4">{t(srv.title)}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t(srv.desc)}</p>
              <button 
                className="text-farm-600 dark:text-farm-400 font-semibold hover:text-farm-800 dark:hover:text-farm-300 transition-colors flex items-center gap-2"
                dangerouslySetInnerHTML={{ __html: t('Inquire Now &rarr;') }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;
