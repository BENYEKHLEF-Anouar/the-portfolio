import React, { createContext, useContext, useState, useEffect } from 'react';
import profileEn from '../data/profile.json';

// We will import profileFr once it's created
let profileFr = null;

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('portfolio-language') || 'en');
  const [data, setData] = useState(profileEn);

  useEffect(() => {
    const loadFrenchData = async () => {
      try {
        const frData = await import('../data/profile.fr.json');
        profileFr = frData.default;
        if (language === 'fr') setData(profileFr);
      } catch (e) {
        console.warn("French data not yet available");
      }
    };
    loadFrenchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
    if (language === 'fr' && profileFr) {
      setData(profileFr);
    } else {
      setData(profileEn);
    }
  }, [language]);

  const changeLanguage = (lang) => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, data }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
