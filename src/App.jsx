import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuraProvider, useAura } from './context/AuraContext';
import { CartProvider } from './context/CartContext';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analytics from './components/Analytics';
import Collection from './components/Collection';
import CartDrawer from './components/CartDrawer';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AestheticsGallery = () => {
  const images = [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    'https://images.unsplash.com/photo-1535633302704-b02f41af8345?w=600&q=80'
  ];
  return (
    <section style={{ padding: '4rem 5% 6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Elegance in Detail</h2>
        <div style={{ width: '60px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto' }} />
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {images.map((src, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ y: -10 }}
            style={{
              aspectRatio: idx % 2 === 0 ? '3/4' : '4/5',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-soft)',
              background: 'var(--accent-gold-soft)'
            }}
          >
            <img src={src} alt="Aesthetic Jewelry" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Dashboard = () => (
  <>
    <Hero />
    <AestheticsGallery />
    <Analytics />
  </>
);

const MainApp = () => {
  const { isAuraEnabled, speak, stop } = useAura();
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    const handleGlobalHover = (e) => {
      if (!isAuraEnabled) return;
      const target = e.target;
      if (['H1', 'H2', 'H3', 'P', 'BUTTON', 'SPAN'].includes(target.tagName) || target.dataset.auraRead) {
        const text = target.innerText || target.getAttribute('aria-label');
        if (text && text.trim().length > 0) speak(text);
      }
    };
    const handleGlobalLeave = () => { if (isAuraEnabled) stop(); };
    window.addEventListener('mouseover', handleGlobalHover);
    window.addEventListener('mouseout', handleGlobalLeave);
    return () => {
      window.removeEventListener('mouseover', handleGlobalHover);
      window.removeEventListener('mouseout', handleGlobalLeave);
    };
  }, [isAuraEnabled, speak, stop]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>

      {/* Parallax Background */}
      <motion.div style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-gold-soft) 0%, transparent 70%)', zIndex: -1, y: y1 }} />
      <motion.div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-gold-soft) 0%, transparent 70%)', zIndex: -1, y: y2 }} />

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
    <Router>
      <AuraProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </AuraProvider>
    </Router>
  );
}

export default App;
