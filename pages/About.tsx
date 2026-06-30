import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { Target, Eye, ShieldCheck, Users } from 'lucide-react';
import img1 from '../src/assets/images/regenerated_image_1782834869173.jpg';
import img2 from '../src/assets/images/regenerated_image_1782784857857.jpg';
import { useLanguage } from '../components/LanguageContext';

const About: React.FC = () => {
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

  return (
    <PageTransition>
      {/* Header */}
      <div className="bg-farm-800 text-white py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
        <motion.div 
          className="container mx-auto px-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-serif font-bold mb-4"
          >
            {t('About Usin Farm')}
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-farm-100 max-w-2xl mx-auto"
          >
            {t('Rooted in tradition, growing towards the future.')}
          </motion.p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }} 
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '1.5rem' }}
          >
            <motion.img 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              src={img1} alt="Farmer" className="rounded-3xl shadow-2xl w-full h-full object-cover transition-transform duration-700" 
            />
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-6">{t('Our History')}</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {t('Founded on a deep respect for the land, Usin Farm Enterprise began as a humble family endeavor. Over the years, we have expanded our acreage and our expertise, transforming into a premier agricultural supplier.')} 
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {t('Despite our growth, our core philosophy remains unchanged: to work in harmony with nature to produce food that is healthy for both our community and our planet.')}
            </motion.p>
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mt-10">
              <div className="border-l-4 border-farm-500 pl-4">
                <h4 className="text-3xl font-bold text-farm-900 dark:text-white mb-1">500+</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('Acres of Land')}</p>
              </div>
              <div className="border-l-4 border-farm-500 pl-4">
                <h4 className="text-3xl font-bold text-farm-900 dark:text-white mb-1">10k+</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('Happy Customers')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              icon: <Target size={32} className="text-farm-600 mb-4" />,
              title: "Our Mission",
              desc: "To cultivate premium quality agricultural products through sustainable and innovative farming practices, ensuring food security and nutrition for our community."
            },
            {
              icon: <Eye size={32} className="text-farm-600 mb-4" />,
              title: "Our Vision",
              desc: "To be the leading recognized model of sustainable and regenerative agriculture in the region, inspiring a greener, healthier world."
            },
            {
              icon: <ShieldCheck size={32} className="text-farm-600 mb-4" />,
              title: "Core Values",
              desc: "Integrity in our methods, transparency with our consumers, and an unwavering commitment to environmental stewardship."
            },
            {
              icon: <Users size={32} className="text-farm-600 mb-4" />,
              title: "Community First",
              desc: "We believe a farm is the heart of a community. We actively support local initiatives and prioritize fair labor practices."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              {item.icon}
              <h3 className="text-2xl font-serif font-bold text-farm-900 dark:text-farm-300 mb-4">{t(item.title)}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t(item.desc)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default About;
