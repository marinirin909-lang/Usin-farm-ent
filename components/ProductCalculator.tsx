import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Calculator, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  unit: string;
}

const products: ProductItem[] = [
  { id: 'cattle', name: 'Quality Beef Cattle', price: 3500, unit: 'head' },
  { id: 'broiler', name: 'Broiler Chicken', price: 8, unit: 'kg' },
  { id: 'freerange', name: 'Free-range Chicken', price: 15, unit: 'kg' },
  { id: 'duck', name: 'Meat Ducks', price: 12, unit: 'kg' },
  { id: 'fresh_egg', name: 'Fresh Duck Eggs', price: 0.8, unit: 'egg' },
  { id: 'salted_egg', name: 'Salted Eggs', price: 1.2, unit: 'egg' },
];

export const ProductCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const setExactQuantity = (id: string, value: number) => {
    setQuantities(prev => {
      const next = Math.max(0, value);
      if (next === 0 || isNaN(next)) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const clearCalculator = () => setQuantities({});

  const totalEstimate = useMemo(() => {
    return Object.entries(quantities).reduce((total, [id, qty]) => {
      const product = products.find(p => p.id === id);
      return total + (product ? product.price * qty : 0);
    }, 0);
  }, [quantities]);

  const activeItems = Object.entries(quantities).filter(([_, qty]) => qty > 0);

  return (
    <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-farm-100 dark:bg-gray-800 rounded-2xl mb-4 text-farm-600 dark:text-farm-400">
            <Calculator size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-farm-900 dark:text-farm-400 mb-4">
            {t('Estimated Price Calculator')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Select products and quantities to get an estimated total price. Note: Prices shown are estimates and subject to change.')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-6">
              {t('Available Products')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(product => (
                <div key={product.id} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">{t(product.name)}</h4>
                    <p className="text-sm text-farm-600 dark:text-farm-400">
                      RM {product.price.toFixed(2)} / {t(product.unit)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-farm-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={quantities[product.id] || ''}
                      onChange={(e) => setExactQuantity(product.id, parseInt(e.target.value))}
                      placeholder="0"
                      className="w-full h-10 text-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-farm-500 focus:outline-none dark:text-white"
                    />
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-farm-500 text-white hover:bg-farm-600 transition-colors shadow-sm"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-farm-50 dark:bg-gray-800 rounded-3xl p-6 lg:p-8 border border-farm-100 dark:border-gray-700 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="text-farm-600 dark:text-farm-400" />
                <h3 className="text-xl font-bold text-farm-900 dark:text-white">{t('Summary')}</h3>
              </div>

              {activeItems.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                    {activeItems.map(([id, qty]) => {
                      const product = products.find(p => p.id === id)!;
                      return (
                        <div key={id} className="flex justify-between items-start gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-900 dark:text-gray-200">{t(product.name)}</span>
                            <div className="text-gray-500 dark:text-gray-400">
                              {qty} {t(product.unit)} &times; RM {product.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="font-medium text-gray-900 dark:text-gray-200">
                            RM {(product.price * qty).toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-end mb-6">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">{t('Estimated Total')}</span>
                      <span className="text-3xl font-bold text-farm-600 dark:text-farm-400">
                        RM {totalEstimate.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={clearCalculator}
                        className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title={t('Clear Calculator')}
                      >
                        <Trash2 size={20} />
                      </button>
                      <button className="flex-1 py-3 rounded-xl bg-farm-600 text-white font-medium hover:bg-farm-700 transition-colors shadow-md">
                        {t('Inquire Order')}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Calculator size={48} className="mx-auto mb-4 opacity-20" />
                  <p>{t('Add items to see the estimated total.')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
