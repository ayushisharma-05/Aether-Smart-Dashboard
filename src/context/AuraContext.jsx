import React, { createContext, useContext, useState, useEffect } from 'react';

const AuraContext = createContext();

export const AuraProvider = ({ children }) => {
  const [isAuraEnabled, setIsAuraEnabled] = useState(false);

  const speak = (text) => {
    if (!isAuraEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
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
