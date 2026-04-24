import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AuraContext = createContext();

export const AuraProvider = ({ children }) => {
  const [isAuraEnabled, setIsAuraEnabled] = useState(false);
  const { i18n } = useTranslation();

  const speak = (text) => {
    if (!isAuraEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language for TTS
    const lang = i18n.language || 'en';
    if (lang.startsWith('hi')) utterance.lang = 'hi-IN';
    else if (lang.startsWith('es')) utterance.lang = 'es-ES';
    else utterance.lang = 'en-US';

    utterance.rate = 0.9;
    utterance.pitch = 1.1; // Slightly higher pitch for "luxury/airy" feel
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <AuraContext.Provider value={{ isAuraEnabled, setIsAuraEnabled, speak, stop }}>
      {children}
    </AuraContext.Provider>
  );
};

export const useAura = () => useContext(AuraContext);
