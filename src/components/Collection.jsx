import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';

const products = [
  { id: 1, type: 'ring', price: 450, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80', rating: 4.8 },
  { id: 2, type: 'necklace', price: 1200, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', rating: 4.9 },
  { id: 3, type: 'earrings', price: 320, image: 'https://images.unsplash.com/photo-1535633302704-b02f41af8345?w=800&q=80', rating: 4.7 },
  { id: 4, type: 'anklet', price: 210, image: 'https://images.unsplash.com/photo-1611085583191-a3b111894d9b?w=800&q=80', rating: 4.6 },
  { id: 5, type: 'necklace', price: 2500, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', rating: 5.0 },
  { id: 6, type: 'ring', price: 890, image: 'https://images.unsplash.com/photo-1596944210908-2796bba9fdff?w=800&q=80', rating: 4.9 },
  { id: 7, type: 'tiara', price: 8500, image: 'https://images.unsplash.com/photo-1543508911-304e28cd882b?w=800&q=80', rating: 5.0 },
  { id: 8, type: 'bracelet', price: 750, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80', rating: 4.8 },
  { id: 9, type: 'pendant', price: 1100, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80', rating: 4.9 },
  { id: 10, type: 'ring', price: 3500, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80', rating: 4.9 },
];

const Collection = () => {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ textAlign: 'center', marginBottom: '5rem', padding: '0 5%' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="serif"
          style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
        >
          {t('collection.title')}
        </motion.h1>
        <div style={{ width: '80px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto' }} />
      </section>

      {/* Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem',
        padding: '0 5%'
      }}>
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glass-card"
            style={{ 
              padding: '1.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Image Container */}
            <div style={{ 
              width: '100%', 
              aspectRatio: '1', 
              borderRadius: '15px', 
              overflow: 'hidden',
              background: 'var(--accent-gold-soft)' 
            }}>
              <img 
                src={product.image} 
                alt={product.type} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>

            {/* Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 className="serif" style={{ fontSize: '1.5rem', margin: '0 0 0.5rem' }}>
                  {t(`collection.${product.type}`)}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-gold)' }}>
                  <Star size={14} fill="var(--accent-gold)" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{product.rating}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 600 }} className="gold-accent">
                  ${product.price}
                </span>
              </div>
            </div>

            <button 
              className="btn-primary"
              style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.8rem',
                fontSize: '0.9rem'
              }}
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={18} />
              {t('collection.addToCart')}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
