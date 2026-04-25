import React from 'react';
import { motion } from 'framer-motion';
import { useAura } from '../context/AuraContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import heroVisual from '../assets/hero_visual.png';

const Hero = () => {
  const { speak, stop } = useAura();
  const { t } = useTranslation();

  return (
    <section 
      style={{ 
        padding: '160px 5% 100px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        alignItems: 'center',
        gap: '4rem',
        minHeight: '80vh'
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 
          style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '1.5rem' }}
          onMouseEnter={(e) => speak(e.target.innerText)}
          onMouseLeave={stop}
        >
          {t('hero.luxury')} <br /> {t('hero.defines')} <span className="gold-accent">{t('hero.aether')}</span>
        </h1>
        <p 
          style={{ 
            fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '540px', lineHeight: '1.6',
            marginBottom: '2.5rem'
          }}
          onMouseEnter={(e) => speak(e.target.innerText)}
          onMouseLeave={stop}
        >
          {t('hero.tagline')}
        </p>
        <Link to="/collection">
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => speak(t('hero.cta'))}
            onMouseLeave={stop}
          >
            {t('hero.cta')}
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ position: 'relative' }}
      >
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            width: '100%', aspectRatio: '1', borderRadius: '40px',
            background: 'white',
            boxShadow: 'var(--shadow-soft)', border: '1px solid var(--glass-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <img 
            src={heroVisual} 
            alt="Aether Luxury Visual"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
        
        {/* Decorative Gold Accents */}
        <div style={{ 
          position: 'absolute', top: '-20px', right: '-20px', 
          width: '100px', height: '100px', borderRadius: '50%',
          background: 'var(--accent-gold-soft)', border: '1px solid var(--accent-gold)',
          zIndex: -1
        }} />
      </motion.div>
    </section>
  );
};

export default Hero;
