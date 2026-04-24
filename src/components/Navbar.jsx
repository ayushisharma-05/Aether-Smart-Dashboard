import React from 'react';
import { useAura } from '../context/AuraContext';
import { Volume2, VolumeX } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const { isAuraEnabled, setIsAuraEnabled } = useAura();

  return (
    <nav className="nav-glass">
      <div className="logo serif" style={{ fontSize: '1.8rem', letterSpacing: '4px', fontWeight: '600' }}>
        AETHER
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Language Hub - 100+ Languages */}
        <LanguageSelector />

        {/* Aura-Reader Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Aura Reader
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
