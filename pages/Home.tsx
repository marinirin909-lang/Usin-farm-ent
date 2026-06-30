import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Sprout, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import farmImg from '../src/assets/images/farm_collage_1782835749991.jpg';
import { useLanguage } from '../components/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video 
            src="/videoplayback (12).mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg" dangerouslySetInnerHTML={{ __html: t('Cultivating Excellence,<br />Nurturing Nature.') }} />
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
              {t('Welcome to Usin Farm Enterprise. Premium agriculture, sustainable practices, and fresh produce straight from our fields to your table.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="bg-farm-500 hover:bg-farm-600 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                {t('Explore Our Produce')} <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2">
                {t('Discover Our Story')}
              </Link>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-farm-50 dark:bg-gray-800 p-8 rounded-2xl text-center hover:shadow-xl transition-shadow border border-farm-100 dark:border-gray-700"
              >
                <div className="w-20 h-20 mx-auto bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-farm-800 dark:text-farm-300 mb-4">{t(feature.title)}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t(feature.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24 bg-farm-900 dark:bg-gray-950 text-white relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">{t('A Legacy of Quality Farming')}</h2>
              <p className="text-farm-100 text-lg mb-8 leading-relaxed">
                {t("At Usin Farm Enterprise, agriculture isn't just an industry—it's our heritage. Spanning acres of fertile land, our farm combines traditional wisdom with modern innovation to cultivate crops and raise livestock of unparalleled quality.")}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Premium Livestock Breeding",
                  "Seasonal Organic Vegetables",
                  "Advanced Irrigation Systems",
                  "Community-Supported Agriculture"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-farm-50">
                    <div className="bg-farm-500 p-1 rounded-full"><Leaf size={14} /></div>
                    {t(item)}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="inline-block border-2 border-farm-400 hover:bg-farm-400 text-white px-8 py-3 rounded-full font-medium transition-colors">
                {t('Learn More About Us')}
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img src={farmImg} alt="Farm operations" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4 text-farm-900 dark:text-white">
                  <h4 className="text-4xl font-serif font-bold text-farm-600 dark:text-farm-400">20+</h4>
                  <p className="font-medium text-sm leading-tight" dangerouslySetInnerHTML={{ __html: t('Years of<br/>Excellence') }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
