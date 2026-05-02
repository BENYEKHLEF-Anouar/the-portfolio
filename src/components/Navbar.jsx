import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Globe, Menu, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'About', to: '/about' },
    { label: 'Work', to: '/#work' },
    { label: 'Stack', to: '/#stack' },
    { label: 'Experience', to: '/#experience' },
    { label: 'Contact', to: '/#contact' },
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
                maxWidth: '1100px',
                width: '100%',
                height: '100%',
                margin: '0 auto',
                padding: '14px 24px',
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
                  Anouar Benyekhlef
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
                  About
                </Link>
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
                >
                  <Moon size={15} strokeWidth={1.25} />
                </button>
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
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#9A9A8E',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(26, 26, 24)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9A9A8E')}
                >
                  <Globe size={15} strokeWidth={1.25} />
                </button>
                <button
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#9A9A8E',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(26, 26, 24)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9A9A8E')}
                >
                  <Moon size={15} strokeWidth={1.25} />
                </button>
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