import React, { useEffect } from 'react';
import { AuraProvider, useAura } from './context/AuraContext';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analytics from './components/Analytics';
import { motion, useScroll, useTransform } from 'framer-motion';

const MainApp = () => {
  const { isAuraEnabled, speak, stop } = useAura();
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  
  // Parallax effect for background elements
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    const handleGlobalHover = (e) => {
      if (!isAuraEnabled) return;
      
      const target = e.target;
      // Read text if it's a heading, paragraph, button, or has data-aura-read
      if (['H1', 'H2', 'H3', 'P', 'BUTTON', 'SPAN'].includes(target.tagName) || target.dataset.auraRead) {
        const text = target.innerText || target.getAttribute('aria-label');
        if (text && text.trim().length > 0) {
          speak(text);
        }
      }
    };

    const handleGlobalLeave = () => {
      if (isAuraEnabled) {
        stop();
      }
    };

    window.addEventListener('mouseover', handleGlobalHover);
    window.addEventListener('mouseout', handleGlobalLeave);

    return () => {
      window.removeEventListener('mouseover', handleGlobalHover);
      window.removeEventListener('mouseout', handleGlobalLeave);
    };
  }, [isAuraEnabled, speak, stop]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background Parallax Elements */}
      <motion.div 
        style={{ 
          position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px',
          borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-gold-soft) 0%, transparent 70%)',
          zIndex: -1, y: y1
        }}
      />
      <motion.div 
        style={{ 
          position: 'absolute', bottom: '10%', left: '5%', width: '300px', height: '300px',
          borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-gold-soft) 0%, transparent 70%)',
          zIndex: -1, y: y2
        }}
      />

      <Navbar />
      <Hero />
      <Analytics />
      
      <footer style={{ padding: '4rem 5%', textAlign: 'center', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
        <div className="serif" style={{ fontSize: '1rem', letterSpacing: '2px', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
          {t('hero.aether')}
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          © 2024 {t('hero.aether')} Luxury Collective. {t('footer.rights')}
        </p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuraProvider>
      <MainApp />
    </AuraProvider>
  );
}

export default App;
