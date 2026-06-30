import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="bg-farm-900 text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            {t('Contact Us')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg text-farm-100 max-w-2xl mx-auto"
          >
            {t('Have a question about our products, services, or want to schedule a visit? We\'d love to hear from you.')}
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-8">{t('Send Us a Message')}</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('First Name')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-farm-500 bg-gray-50 dark:bg-gray-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('Last Name')}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-farm-500 bg-gray-50 dark:bg-gray-800 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('Email Address')}</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-farm-500 bg-gray-50 dark:bg-gray-800 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('Message')}</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-farm-500 bg-gray-50 dark:bg-gray-800 dark:text-white"></textarea>
              </div>
              <button className="w-full bg-farm-600 hover:bg-farm-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl">
                {t('Send Message')}
              </button>
            </form>
          </motion.div>

          {/* Contact Details & Map */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-8">{t('Get In Touch')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-farm-100 dark:bg-gray-800 p-3 rounded-full text-farm-600 dark:text-farm-400 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{t('Our Location')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    Usin Farm Enterprise<br/>
                    Jalan Kampung Sungai Besar,<br/>
                    Mukim Kota Setia,<br/>
                    36000 Teluk Intan, Perak, Malaysia.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-farm-100 dark:bg-gray-800 p-3 rounded-full text-farm-600 dark:text-farm-400 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{t('Operating Hours')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {t('Mon - Fri: 8:00 AM - 5:00 PM')}<br/>
                    {t('Sat: 9:00 AM - 1:00 PM')}<br/>
                    {t('Sun: Closed')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-farm-100 dark:bg-gray-800 p-3 rounded-full text-farm-600 dark:text-farm-400 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{t('Phone')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm"><a href="tel:+60138010718" className="hover:text-farm-600 dark:hover:text-farm-400">+60 13-801 0718</a></p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-farm-100 dark:bg-gray-800 p-3 rounded-full text-farm-600 dark:text-farm-400 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{t('Email')}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm break-all"><a href="mailto:admin@usinfarmenterprise.site.je" className="hover:text-farm-600 dark:hover:text-farm-400">admin@usinfarmenterprise.site.je</a></p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden mt-8 shadow-inner border border-gray-300 dark:border-gray-700 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.12158081356!2d100.87634538389366!3d3.995415337016211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cb47b9e0151435%3A0xa9fd4dabe94740e4!2sUSIN%20FARM%20ENTERPRISE!5e0!3m2!1sen!2smy!4v1782781843588!5m2!1sen!2smy" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
            <div className="flex justify-end mt-4">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Usin+Farm+Enterprise,Jalan+Kampung+Sungai+Besar,Teluk+Intan,Perak" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-farm-600 hover:bg-farm-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm hover:shadow-md"
              >
                <MapPin size={18} />
                {t('Get Directions')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
