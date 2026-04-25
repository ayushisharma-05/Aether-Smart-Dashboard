import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalCost } = useCart();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
              zIndex: 2000
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: '400px',
              background: 'rgba(253, 251, 247, 0.95)',
              backdropFilter: 'blur(20px)',
              borderLeft: '1px solid var(--glass-border)',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.05)',
              zIndex: 2001,
              display: 'flex', flexDirection: 'column',
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <ShoppingBag size={24} className="gold-accent" />
                <h2 className="serif" style={{ fontSize: '1.5rem', margin: 0 }}>{t('cart.title')}</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                  <p>{t('cart.empty')}</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ 
                      display: 'flex', gap: '1rem', marginBottom: '1.5rem', 
                      paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' 
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{t(`collection.${item.type}`)}</h4>
                      <p className="gold-accent" style={{ fontWeight: 600, margin: '0 0 0.8rem' }}>${item.price}</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-gold-soft)', borderRadius: '20px', padding: '4px 8px' }}>
                          <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><Minus size={14} /></button>
                          <span style={{ fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff4444' }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{t('cart.total')}</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 600 }} className="gold-accent">${totalCost}</span>
                </div>
                <button className="btn-primary" style={{ width: '100%', padding: '15px' }}>
                  {t('cart.checkout')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
