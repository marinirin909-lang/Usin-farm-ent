import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className={`w-full flex-grow flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);
