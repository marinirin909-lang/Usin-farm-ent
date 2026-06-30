import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../components/LanguageContext';

const Gallery: React.FC = () => {
  const { t } = useLanguage();

  const items = [
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/pemotongan-daging.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/makanan-ternakan.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/lembu-padang.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/itik-kolam.mp4' },
    { type: 'video', src: 'https://6a43190294555f542c2e4a86.imgix.net/video/ayam-kampung.mp4' },
    { type: 'image', src: 'https://6a43190294555f542c2e4a86.imgix.net/telur-itik-segar.jpg' },
    { type: 'image', src: 'https://6a43190294555f542c2e4a86.imgix.net/proses-telur-masin.jpg' },
    { type: 'image', src: 'https://6a43190294555f542c2e4a86.imgix.net/pemotongan-daging.jfif' },
    { type: 'image', src: 'https://6a43190294555f542c2e4a86.imgix.net/makanan-ternakan.jpg' },
    { type: 'image', src: 'https://6a43190294555f542c2e4a86.imgix.net/lembu-padang.jpg' },
    { type: 'image', src: 'https://6a43190294555f542c2e4a86.imgix.net/itik-kolam.jpg' },
    { type: 'image', src: 'https://6a43190294555f542c2e4a86.imgix.net/14.jpg' },
    { type: 'image', src: 'https://6a43190294555f542c2e4a86.imgix.net/13.jpg' },
    { type: 'image', src: 'https://6a43190294555f542c2e4a86.imgix.net/4.jpg' },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.1 }}
              className="group aspect-square rounded-2xl overflow-hidden relative shadow-md hover:shadow-xl cursor-pointer bg-gray-100 dark:bg-gray-800"
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
        </div>
      </div>
    </PageTransition>
  );
};

export default Gallery;
