import React from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { translations } from '../i18n/translations.js';

const Footer = ({ className }) => {
  const { language, data } = useLanguage();
  const t = translations[language].footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${className || ''}`}>
      <div className="page-container-wide">
        <div className="footer-bottom">
          <span className="footer-copy">
            © {currentYear} {data.name}. {t.rights}
          </span>
          
          <div className="footer-meta">
            <div className="footer-status">
              {t.status}
            </div>
            <div className="footer-meta-item">
              {data.location}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
