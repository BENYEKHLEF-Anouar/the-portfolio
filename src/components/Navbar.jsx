import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Globe, Menu, X, ChevronDown } from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { translations } from '../i18n/translations.js';

const Navbar = () => {
  const location = useLocation();
  const { language, changeLanguage, data } = useLanguage();
  const t = translations[language].nav;
  
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangDropdownDesktop, setShowLangDropdownDesktop] = useState(false);
  const [showLangDropdownMobile, setShowLangDropdownMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!showLangDropdownDesktop && !showLangDropdownMobile) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-lang-dropdown]')) {
        setShowLangDropdownDesktop(false);
        setShowLangDropdownMobile(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLangDropdownDesktop, showLangDropdownMobile]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: t.about, to: '/about' },
    { label: t.work, to: '/#work' },
    { label: t.stack, to: '/#stack' },
    { label: t.experience, to: '/#experience' },
    { label: t.contact, to: '/#contact' },
  ];

  return (
    <>
      {createPortal(
        <>
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              backgroundColor: '#FFFFFF',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              borderBottom: '1px solid #EAEAEA',
              boxShadow: 'none',
              width: '100%',
            }}
          >
            {/* Inner container — matches .page-container-wide */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '1200px',
                width: '100%',
                height: '100%',
                margin: '0 auto',
                padding: '14px 12px',
                boxSizing: 'border-box',
              }}
            >
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none' }}>
                <span
                  style={{
                    fontWeight: 400,
                    color: 'rgb(26, 26, 24)',
                    fontSize: '15px',
                    lineHeight: '23px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {data?.name || 'Anouar Benyekhlef'}
                </span>
              </Link>

              {/* Mobile Navigation — Matches Screenshot (About link + icons) */}
              <div
                className="nav-mobile-toggle"
                style={{
                  alignItems: 'center',
                  gap: '20px'
                }}
              >
                <Link
                  to="/about"
                  style={{
                    textDecoration: 'none',
                    color: '#9A9A8E',
                    fontSize: '14px',
                    fontWeight: 300
                  }}
                >
                  {t.about}
                </Link>
                <div style={{ position: 'relative' }} data-lang-dropdown>
                  <button
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      color: '#9A9A8E',
                    }}
                    onClick={() => setShowLangDropdownMobile(!showLangDropdownMobile)}
                  >
                    <Globe size={15} strokeWidth={1.25} />
                  </button>
                  {showLangDropdownMobile && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '12px',
                        background: '#fff',
                        border: '1px solid #EAEAEA',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        zIndex: 2000,
                        overflow: 'hidden',
                        minWidth: '110px'
                      }}
                    >
                      <button
                        onClick={() => { changeLanguage('en'); setShowLangDropdownMobile(false); }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 14px',
                          border: 'none',
                          background: language === 'en' ? '#F5F5F5' : 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: language === 'en' ? '#111' : '#555',
                        }}
                      >
                        🇬🇧 English
                      </button>
                      <button
                        onClick={() => { changeLanguage('fr'); setShowLangDropdownMobile(false); }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 14px',
                          border: 'none',
                          background: language === 'fr' ? '#F5F5F5' : 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: language === 'fr' ? '#111' : '#555',
                        }}
                      >
                        🇫🇷 Français
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                {navLinks.map(({ label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="nav-link"
                    style={{
                      fontWeight: 300,
                      color: location.pathname === to ? 'rgb(26, 26, 24)' : '#9A9A8E',
                      fontSize: '14px',
                      lineHeight: '21px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'rgb(26, 26, 24)')}
                    onMouseLeave={(e) =>
                    (e.target.style.color =
                      location.pathname === to ? 'rgb(26, 26, 24)' : '#9A9A8E')
                    }
                  >
                    {label}
                  </Link>
                ))}
                
                <div style={{ position: 'relative' }} data-lang-dropdown>
                  <button
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '6px 8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#9A9A8E',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(26, 26, 24)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#9A9A8E')}
                    onClick={() => setShowLangDropdownDesktop(!showLangDropdownDesktop)}
                  >
                    <Globe size={16} strokeWidth={1.5} />
                    <ChevronDown size={12} strokeWidth={1.5} style={{ opacity: 0.7 }} />
                  </button>
                  {showLangDropdownDesktop && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '8px',
                        background: '#fff',
                        border: '1px solid #EAEAEA',
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        zIndex: 1001,
                        minWidth: '120px',
                      }}
                    >
                      <button
                        onClick={() => { changeLanguage('en'); setShowLangDropdownDesktop(false); }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 14px',
                          border: 'none',
                          background: language === 'en' ? '#F5F5F5' : 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        🇬🇧 English
                      </button>
                      <button
                        onClick={() => { changeLanguage('fr'); setShowLangDropdownDesktop(false); }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 14px',
                          border: 'none',
                          background: language === 'fr' ? '#F5F5F5' : 'transparent',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        🇫🇷 Français
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </motion.header>
        </>,
        document.body
      )}
      {/* Spacer to prevent content jump when navbar becomes fixed */}
      <div style={{ height: '70px' }} />
    </>
  );
};

export default Navbar;