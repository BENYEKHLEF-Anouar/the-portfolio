import React from 'react';
import data from '../data/profile.json';

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${className || ''}`}>
      <div className="page-container-wide">
        <div className="footer-bottom">
          <span className="footer-copy">
            © {currentYear} {data.name}. All rights reserved.
          </span>
          
          <div className="footer-meta">
            <div className="footer-status">
              Available for new projects
            </div>
            <div className="footer-meta-item">
              Tangier, Morocco
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
