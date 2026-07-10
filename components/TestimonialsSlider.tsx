import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

import ahmadAvatar from '../src/assets/images/ahmad.jpg';
import sarahAvatar from '../src/assets/images/sarah.jpg';
import farisAvatar from '../src/assets/images/faris.jpg';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ahmad bin Rahman',
    role: 'Local Restaurant Owner',
    content: 'We have been sourcing our poultry and eggs from Usin Farm for over two years now. The quality is consistently excellent, and our customers frequently compliment the taste of our dishes made with their produce.',
    rating: 5,
    avatar: ahmadAvatar
  },
  {
    id: 2,
    name: 'Sarah Lee',
    role: 'Wholesale Distributor',
    content: 'The reliability of Usin Farm is unmatched. Their delivery schedules are precise, and the freshness of their products, especially the salted eggs and broiler chickens, has helped us grow our own customer base.',
    rating: 5,
    avatar: sarahAvatar
  },
  {
    id: 3,
    name: 'Mohammad Faris',
    role: 'Family Customer',
    content: 'My family loves the free-range chicken from Usin Farm. You can really taste the difference compared to supermarket chicken. It\'s comforting to know we are eating healthy, well-cared-for poultry.',
    rating: 4,
    avatar: farisAvatar
  }
];

export const TestimonialsSlider: React.FC = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(nextTestimonial, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  return (
    <section className="py-24 bg-farm-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-farm-200/50 dark:bg-farm-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-farm-300/30 dark:bg-farm-800/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-4">
            {t('What Our Clients Say')}
          </h2>
          <div className="w-24 h-1 bg-farm-500 mx-auto rounded-full" />
        </div>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-farm-100 dark:border-gray-700">
            <Quote size={64} className="absolute top-8 left-8 text-farm-100 dark:text-gray-800 -z-0 opacity-50" />
            
            <div className="relative z-10 min-h-[250px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col md:flex-row items-center md:items-start gap-8"
                >
                  <div className="shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-farm-100 dark:border-gray-800 shadow-md">
                      <img 
                        src={testimonials[currentIndex].avatar} 
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          fill={i < testimonials[currentIndex].rating ? "currentColor" : "none"} 
                          className={i < testimonials[currentIndex].rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                        />
                      ))}
                    </div>
                    
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                      "{t(testimonials[currentIndex].content)}"
                    </p>
                    
                    <div>
                      <h4 className="text-lg font-bold text-farm-900 dark:text-white">
                        {t(testimonials[currentIndex].name)}
                      </h4>
                      <p className="text-farm-600 dark:text-farm-400 font-medium">
                        {t(testimonials[currentIndex].role)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center md:justify-end gap-4 mt-8 md:mt-0 md:absolute md:bottom-12 md:right-12 z-20">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-farm-50 dark:bg-gray-800 text-farm-600 dark:text-farm-400 hover:bg-farm-500 hover:text-white dark:hover:bg-farm-500 dark:hover:text-white transition-all shadow-sm hover:shadow-md"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-farm-50 dark:bg-gray-800 text-farm-600 dark:text-farm-400 hover:bg-farm-500 hover:text-white dark:hover:bg-farm-500 dark:hover:text-white transition-all shadow-sm hover:shadow-md"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'bg-farm-500 w-8' 
                    : 'bg-farm-200 dark:bg-gray-700 hover:bg-farm-400 dark:hover:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
