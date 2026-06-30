import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Phone, Mail, Leaf, Facebook, Instagram, Twitter, Globe, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIChat from './AIChat';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'News', path: '/news' },
  { name: 'Careers', path: '/careers' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

const Layout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Contact Bar */}
      <div className="hidden md:flex bg-farm-900 text-farm-50 text-xs py-2 px-6 justify-between items-center">
        <div className="flex gap-6">
          <a href="mailto:admin@usinfarmenterprise.site.je" className="flex items-center gap-2 hover:text-farm-300 transition-colors">
            <Mail size={14} /> admin@usinfarmenterprise.site.je
          </a>
          <a href="tel:+60138010718" className="flex items-center gap-2 hover:text-farm-300 transition-colors">
            <Phone size={14} /> +60 13-801 0718
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span>{t('Follow us:')}</span>
          <div className="flex gap-3">
            <Facebook size={14} className="cursor-pointer hover:text-farm-300 transition-colors" />
            <Instagram size={14} className="cursor-pointer hover:text-farm-300 transition-colors" />
            <Twitter size={14} className="cursor-pointer hover:text-farm-300 transition-colors" />
          </div>
          <div className="ml-4 flex items-center gap-2">
            <button onClick={toggleTheme} className="hover:text-farm-300 transition-colors flex items-center justify-center p-1" title="Toggle Theme">
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <span className="text-gray-400">|</span>
            <Globe size={14} />
            <button 
              onClick={() => setLanguage('ms')}
              className={`font-semibold ${language === 'ms' ? 'text-farm-300' : 'text-farm-50 hover:text-farm-300'}`}
            >
              BM
            </button>
            <span className="text-gray-400">|</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`font-semibold ${language === 'en' ? 'text-farm-300' : 'text-farm-50 hover:text-farm-300'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-3' : 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-5'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-farm-800 dark:text-farm-400">
            <Leaf size={32} className="text-farm-500" />
            <div>
              <h1 className="font-serif font-bold text-xl leading-tight dark:text-white">USIN FARM</h1>
              <p className="text-[10px] uppercase tracking-widest text-farm-600 dark:text-farm-400 font-semibold">Enterprise</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-farm-600 dark:hover:text-farm-400 ${location.pathname === link.path ? 'text-farm-600 dark:text-farm-400 border-b-2 border-farm-500 dark:border-farm-400' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {t(link.name)}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle & Lang */}
          <div className="flex lg:hidden items-center gap-4">
            <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 p-2" title="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="flex items-center gap-2 text-sm">
              <button 
                onClick={() => setLanguage('ms')}
                className={`font-semibold ${language === 'ms' ? 'text-farm-600 dark:text-farm-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                BM
              </button>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <button 
                onClick={() => setLanguage('en')}
                className={`font-semibold ${language === 'en' ? 'text-farm-600 dark:text-farm-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                EN
              </button>
            </div>
            <button 
              className="text-farm-800 dark:text-gray-200 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[72px] left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-800 z-40 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col py-4">
              {NAV_LINKS.map(link => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`px-6 py-3 text-lg font-medium border-b border-gray-100 dark:border-gray-800 ${location.pathname === link.path ? 'text-farm-600 dark:text-farm-400 bg-farm-50 dark:bg-farm-900/50' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {t(link.name)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-farm-900 dark:bg-gray-950 text-farm-100 pt-16 pb-8 transition-colors duration-300">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 text-white mb-6">
              <Leaf size={32} className="text-farm-400" />
              <div>
                <h2 className="font-serif font-bold text-2xl leading-tight text-white">USIN FARM</h2>
                <p className="text-xs uppercase tracking-widest text-farm-400 font-semibold">Enterprise</p>
              </div>
            </Link>
            <p className="text-sm text-farm-200 dark:text-gray-400 mb-6 leading-relaxed">
              Dedicated to sustainable agriculture and providing the freshest, highest-quality produce and livestock to our community. Cultivating a greener future.
            </p>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-white mb-4">{t('Quick Links')}</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white dark:text-gray-300 dark:hover:text-white transition-colors">{t('About Us')}</Link></li>
              <li><Link to="/products" className="hover:text-white dark:text-gray-300 dark:hover:text-white transition-colors">{t('Products')}</Link></li>
              <li><Link to="/services" className="hover:text-white dark:text-gray-300 dark:hover:text-white transition-colors">{t('Services')}</Link></li>
              <li><Link to="/sustainability" className="hover:text-white dark:text-gray-300 dark:hover:text-white transition-colors">{t('Sustainability')}</Link></li>
              <li><Link to="/careers" className="hover:text-white dark:text-gray-300 dark:hover:text-white transition-colors">{t('Careers')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-white mb-4">{t('Contact Info')}</h3>
            <ul className="space-y-4 text-sm dark:text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-farm-400 shrink-0 mt-0.5" />
                <span>Jalan Kampung Sungai Besar, <br />Mukim Kota Setia, <br />36000 Teluk Intan, Perak, Malaysia.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-farm-400 shrink-0" />
                <a href="tel:+60138010718" className="hover:text-white transition-colors">+60 13-801 0718</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-farm-400 shrink-0" />
                <a href="mailto:admin@usinfarmenterprise.site.je" className="hover:text-white transition-colors break-all">admin@usinfarmenterprise.site.je</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg text-white mb-4">{t('Newsletter')}</h3>
            <p className="text-sm text-farm-200 dark:text-gray-400 mb-4">{t('Subscribe for seasonal updates and farm news.')}</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('Your email address')} 
                className="px-4 py-2 bg-farm-800 dark:bg-gray-900 border border-farm-700 dark:border-gray-800 rounded-md focus:outline-none focus:border-farm-400 text-white placeholder:text-farm-400 dark:placeholder:text-gray-500"
              />
              <button className="bg-farm-500 dark:bg-farm-600 hover:bg-farm-400 dark:hover:bg-farm-500 text-white font-medium py-2 rounded-md transition-colors">
                {t('Subscribe')}
              </button>
            </form>
          </div>
        </div>
        
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-farm-800 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-farm-400 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} Usin Farm Enterprise. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/faq" className="hover:text-white dark:hover:text-gray-300 transition-colors">{t('Privacy Policy')}</Link>
            <Link to="/faq" className="hover:text-white dark:hover:text-gray-300 transition-colors">{t('Terms of Service')}</Link>
          </div>
        </div>
      </footer>
      <AIChat />
    </div>
  );
};

export default Layout;
