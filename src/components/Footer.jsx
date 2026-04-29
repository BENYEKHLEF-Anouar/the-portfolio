import React from 'react';

const Footer = () => {
  return (
    <footer style={{ paddingBottom: 64 }}>
      <div className="page-container-wide">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--color-ink-3)',
        }}>
          <span>© {new Date().getFullYear()} Anouar Benyekhlef</span>
          <span>Built with Love</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
