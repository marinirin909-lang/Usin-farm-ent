import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sprout, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import farmImg from '../src/assets/images/farm_collage_1782835749991.jpg';
import { useLanguage } from '../components/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video 
            src="/hero-video.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg" dangerouslySetInnerHTML={{ __html: t('Cultivating Excellence,<br />Nurturing Nature.') }} />
            <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
              {t('Welcome to Usin Farm Enterprise. Premium agriculture, sustainable practices, and fresh produce straight from our fields to your table.')}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="bg-farm-500 hover:bg-farm-600 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group">
                {t('Explore Our Produce')} <motion.span className="inline-block group-hover:translate-x-1 transition-transform"><ArrowRight size={20} /></motion.span>
              </Link>
              <Link to="/about" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                {t('Discover Our Story')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-4">{t('Why Choose Usin Farm?')}</h2>
            <div className="w-24 h-1 bg-farm-500 mx-auto rounded-full" />
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: <Sprout size={40} className="text-farm-500" />,
                title: "100% Organic",
                description: "Our crops are grown without synthetic pesticides or fertilizers, ensuring pure, natural goodness."
              },
              {
                icon: <Leaf size={40} className="text-farm-500" />,
                title: "Sustainable Methods",
                description: "We employ eco-friendly farming techniques that enrich the soil and protect local biodiversity."
              },
              {
                icon: <Sun size={40} className="text-farm-500" />,
                title: "Fresh Daily",
                description: "Harvested at the peak of ripeness and delivered fresh, guaranteeing maximum nutrition and flavor."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-farm-50 dark:bg-gray-800 p-8 rounded-2xl text-center shadow-sm hover:shadow-2xl transition-all border border-farm-100 dark:border-gray-700 duration-300"
              >
                <div className="w-20 h-20 mx-auto bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-farm-800 dark:text-farm-300 mb-4">{t(feature.title)}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t(feature.description)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 bg-farm-900 dark:bg-gray-950 text-white relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-serif font-bold mb-6">{t('A Legacy of Quality Farming')}</motion.h2>
              <motion.p variants={itemVariants} className="text-farm-100 text-lg mb-8 leading-relaxed">
                {t("At Usin Farm Enterprise, agriculture isn't just an industry—it's our heritage. Spanning acres of fertile land, our farm combines traditional wisdom with modern innovation to cultivate crops and raise livestock of unparalleled quality.")}
              </motion.p>
              <motion.ul variants={itemVariants} className="space-y-4 mb-10">
                {[
                  "Premium Livestock Breeding",
                  "Seasonal Organic Vegetables",
                  "Advanced Irrigation Systems",
                  "Community-Supported Agriculture"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3 text-farm-50"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-farm-500 p-1 rounded-full"><Leaf size={14} /></div>
                    {t(item)}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={itemVariants}>
                <Link to="/about" className="inline-block border-2 border-farm-400 hover:bg-farm-400 text-white px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-1">
                  {t('Learn More About Us')}
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
              >
                <img src={farmImg} alt="Farm operations" className="w-full h-full object-cover transition-transform duration-700" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hidden md:block"
              >
                <div className="flex items-center gap-4 text-farm-900 dark:text-white">
                  <h4 className="text-4xl font-serif font-bold text-farm-600 dark:text-farm-400">20+</h4>
                  <p className="font-medium text-sm leading-tight" dangerouslySetInnerHTML={{ __html: t('Years of<br/>Excellence') }} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
