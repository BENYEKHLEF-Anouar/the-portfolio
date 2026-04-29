import React from 'react';
import ContactCTA from '../components/ContactCTA.jsx';

const ContactPage = () => {
  return (
    <div style={{ paddingTop: 30 }}>
      <section style={{ padding: '72px 0' }}>
        <div className="page-container">
          <p className="text-label" style={{ marginBottom: 20 }}>Contact</p>
          <h1 className="text-heading accent-dot" style={{ marginBottom: 16, maxWidth: 480 }}>
            Let's build something together
          </h1>
          <p className="text-body" style={{ marginBottom: 48, maxWidth: 440 }}>
            Currently available for freelance and contract work. Response within 24 hours.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-ink-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    background: 'var(--color-surface)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-ink)',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-ink)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-ink-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    background: 'var(--color-surface)',
                    fontSize: '0.9375rem',
                    color: 'var(--color-ink)',
                    outline: 'none',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-ink)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-ink-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message</label>
              <textarea
                required
                rows={6}
                placeholder="Tell me about your project..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  background: 'var(--color-surface)',
                  fontSize: '0.9375rem',
                  color: 'var(--color-ink)',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-ink)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>
              Send message →
            </button>
          </form>
        </div>
      </section>

      <hr className="divider" />
      <ContactCTA />
    </div>
  );
};

export default ContactPage;
