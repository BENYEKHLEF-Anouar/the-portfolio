import React from 'react';
import { BrainCircuit, Globe, Package, Code } from 'lucide-react';
import ContactCTA from '../components/ContactCTA.jsx';
import data from '../data/profile.json';

const BuildingPage = () => {
  return (
    <div style={{ paddingTop: 30 }}>
      <section style={{ padding: '72px 0' }}>
        <div className="page-container-wide">
          <p className="text-label" style={{ marginBottom: 20 }}>Building</p>
          <h1 className="text-heading accent-dot" style={{ marginBottom: 12 }}>
            Learning new skills by building
          </h1>
          <p className="text-body" style={{ marginBottom: 56, maxWidth: 480 }}>
            Side projects and experiments — where I try tools, explore ideas, and ship without the pressure of a production deadline.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {data.building.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 20,
                  padding: '28px 0',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {item.emoji === '🧠' ? <BrainCircuit size={24} strokeWidth={1.5} color="var(--color-ink)" /> :
                   item.emoji === '🌐' ? <Globe size={24} strokeWidth={1.5} color="var(--color-ink)" /> :
                   item.emoji === '📦' ? <Package size={24} strokeWidth={1.5} color="var(--color-ink)" /> :
                   <Code size={24} strokeWidth={1.5} color="var(--color-ink)" />}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--color-ink)',
                    marginBottom: 6,
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </p>
                  <p className="text-body" style={{ marginBottom: 12, maxWidth: 560 }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />
      <ContactCTA />
    </div>
  );
};

export default BuildingPage;
