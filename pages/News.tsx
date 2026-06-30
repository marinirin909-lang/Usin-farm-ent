import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../components/LanguageContext';

const News: React.FC = () => {
  const { t } = useLanguage();

  const articles = [
    {
      title: "Spring Harvest Festival Announced",
      date: "May 15, 2025",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800&auto=format&fit=crop",
      excerpt: "Join us for our annual harvest festival featuring farm tours, local artisan markets, and live music."
    },
    {
      title: "New Sustainable Irrigation System Installed",
      date: "April 22, 2025",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
      excerpt: "We're excited to announce the completion of our new smart irrigation project, reducing water waste by 40%."
    },
    {
      title: "Usin Farm Awarded Organic Certification",
      date: "March 10, 2025",
      image: "https://images.unsplash.com/photo-1592982537447-6f29633e2dd9?q=80&w=800&auto=format&fit=crop",
      excerpt: "After years of dedication, we have officially received our regional Organic Farm certification."
    }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-6">{t('Farm News')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('Stay updated with the latest happenings, seasonal harvests, and agricultural innovations at Usin Farm.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img src={article.image} alt={t(article.title)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <span className="text-farm-500 dark:text-farm-400 font-medium text-sm mb-3 block">{t(article.date)}</span>
                <h3 className="text-xl font-serif font-bold text-farm-900 dark:text-farm-300 mb-4">{t(article.title)}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{t(article.excerpt)}</p>
                <button 
                  className="text-farm-600 dark:text-farm-400 font-semibold hover:text-farm-800 dark:hover:text-farm-300 self-start transition-colors"
                  dangerouslySetInnerHTML={{ __html: t('Read More &rarr;') }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default News;
