import React from 'react';
import { useAura } from '../context/AuraContext';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, ShoppingBag } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isAuraEnabled, setIsAuraEnabled } = useAura();
  const { totalItems, setIsCartOpen } = useCart();
  const { t } = useTranslation();

  return (
    <nav className="nav-glass">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="logo serif" style={{ fontSize: '1.5rem', letterSpacing: '4px', fontWeight: '600' }}>
          {t('hero.aether')}
        </div>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Language Hub */}
        <LanguageSelector />

        {/* Shopping Bag */}
        <button 
          onClick={() => setIsCartOpen(true)}
          style={{ 
            background: 'none', border: 'none', cursor: 'pointer', 
            position: 'relative', display: 'flex', alignItems: 'center',
            color: 'var(--text-primary)'
          }}
        >
          <ShoppingBag size={22} />
          {totalItems > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{ 
                position: 'absolute', top: '-8px', right: '-8px',
                background: 'var(--accent-gold)', color: 'white',
                fontSize: '0.65rem', fontWeight: 'bold', width: '18px', height: '18px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              {totalItems}
            </motion.span>
          )}
        </button>

        {/* Aura-Reader Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {t('nav.auraReader')}
          </span>
          <button 
            onClick={() => setIsAuraEnabled(!isAuraEnabled)}
            style={{ 
              background: isAuraEnabled ? 'var(--accent-gold)' : 'var(--glass-border)',
              border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease', color: isAuraEnabled ? 'white' : 'var(--text-secondary)'
            }}
          >
            {isAuraEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
