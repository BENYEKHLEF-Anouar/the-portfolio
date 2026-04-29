import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Globe } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#FAFAFA',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderBottom: '1px solid #EAEAEA',
          boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
          transition: 'box-shadow 0.3s ease',
          width: '100vw',
          left: '50%',
          transform: 'translateX(-50%)',
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
            padding: '14px 0px',
            boxSizing: 'border-box',
          }}
        >
        <Link to="/" style={{ textDecoration: 'none' }}>
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

        {/* Navigation */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[
            { label: 'About', to: '/about' },
            { label: 'Work', to: '/work' },
            { label: 'Building', to: '/building' },
            { label: 'Contact', to: '/contact' },
          ].map(({ label, to }) => (
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
    </header>
    {/* Spacer to prevent content jump when navbar becomes fixed */}
    <div style={{ height: '50px' }} />
    </>
  );
};

export default Navbar;