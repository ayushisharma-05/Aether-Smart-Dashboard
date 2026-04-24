import React from 'react';
import { motion } from 'framer-motion';
import { useAura } from '../context/AuraContext';

import heroVisual from '../assets/hero_visual.png';

const Hero = () => {
  const { speak, stop } = useAura();

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
          style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '2rem' }}
          onMouseEnter={(e) => speak(e.target.innerText)}
          onMouseLeave={stop}
        >
          Luxury <br /> Defines <span className="gold-accent">Aether</span>
        </h1>
        <p 
          style={{ 
            fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: '1.8',
            marginBottom: '3rem'
          }}
          onMouseEnter={(e) => speak(e.target.innerText)}
          onMouseLeave={stop}
        >
          Elegance is not about being noticed, it's about being remembered. Welcome to the most exquisite dashboard experience ever crafted.
        </p>
        <motion.button 
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => speak("Discover the Collection")}
          onMouseLeave={stop}
        >
          Discover the Collection
        </motion.button>
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
