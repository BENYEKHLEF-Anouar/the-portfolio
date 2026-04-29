import React from 'react';
import { Volume2, Rocket, Palette, GraduationCap, Briefcase } from 'lucide-react';
import ContactCTA from '../components/ContactCTA.jsx';
import data from '../data/profile.json';

const AboutPage = () => {
  return (
    <div style={{ paddingTop: 40 }}>

      {/* ── Header ─────────────────────────────────────── */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="page-container-wide">
          <div style={{
            display: 'flex',
            gap: 80,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            {/* Left: bio */}
            <div style={{ flex: '1 1 500px', maxWidth: 640 }}>
              <p className="text-label" style={{ marginBottom: 24, letterSpacing: '0.1em' }}>About</p>
              
              <h1 style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
                marginBottom: 16,
              }}>
                Hello, I'm Anouar<span style={{ color: 'var(--color-accent)' }}>.</span>
              </h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 56 }}>
                <p style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-ink-3)',
                  fontWeight: 400,
                }}>
                  /moh·ham·med/ — sounds like "mo-awesome"
                </p>
                <Volume2 size={12} color="var(--color-ink-3)" strokeWidth={2} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p className="text-body">
                  I grew up in Rabat, Morocco and went to school in the heart of the city. Over the past 4+ years I've helped build products and teams at various startups — starting as a frontend dev and eventually building and shipping full-stack products I'm proud of.
                </p>
                <p className="text-body">
                  At SoliQuiz, I built the core platform from scratch. At Warden Properties, I helped scale the platform's reach across 4 international markets, contributing to a 300% increase in lead generation through a robust SEO strategy.
                </p>
                <p className="text-body">
                  These days I'm building with AI tools like Claude Code and learning how developers can move faster from idea to working product. It's been a fun ride.
                </p>
                <p className="text-body">
                  I'm drawn to projects where <span style={{ color: 'var(--color-ink)', fontWeight: 500 }}>engineering is a competitive advantage</span> and where people think, build, and ship together.
                </p>
                <p className="text-body">
                  When I'm not working, you'll find me exploring the outdoors in Morocco with my camera — capturing youth, culture, and architecture, or behind a screen trying to capture something worth keeping.
                </p>
              </div>
            </div>

            {/* Right: stacked photos */}
            <div style={{ flex: '0 0 400px', paddingTop: 80, position: 'relative' }}>
              {/* Bottom Photo */}
              <div style={{
                position: 'absolute',
                top: 100,
                right: -20,
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                border: '10px solid #fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                transform: 'rotate(6deg)',
                background: '#fff',
                zIndex: 1,
              }}>
                <img src={data.profilePicture} alt="Background" style={{ width: '100%', display: 'block', objectFit: 'cover', filter: 'grayscale(100%) opacity(0.8)' }} />
              </div>

              {/* Middle Photo */}
              <div style={{
                position: 'absolute',
                top: 90,
                right: 10,
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                border: '10px solid #fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                transform: 'rotate(-3deg)',
                background: '#fff',
                zIndex: 2,
              }}>
                <img src={data.profilePicture} alt="Middle" style={{ width: '100%', display: 'block', objectFit: 'cover', filter: 'grayscale(50%)' }} />
              </div>

              {/* Top Photo */}
              <div style={{
                position: 'relative',
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                border: '10px solid #fff',
                boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                transform: 'rotate(2deg)',
                background: '#fff',
                zIndex: 3,
              }}>
                <img src={data.profilePicture} alt={data.name} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                <div style={{ padding: '16px 0 8px', textAlign: 'center' }}>
                   <p style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-ink-3)',
                    fontFamily: 'cursive, sans-serif',
                    fontStyle: 'italic',
                  }}>
                    Rabat design affairs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────── */}
      <section style={{ padding: '80px 0 120px' }}>
        <div className="page-container-wide">
          <div style={{
            display: 'flex',
            gap: 80,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            {/* Left */}
            <div style={{ flex: '0 0 280px' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                marginBottom: 16,
              }}>
                Experience
              </h2>
              <p className="text-body" style={{ fontSize: '0.9375rem' }}>
                4+ years building products and teams.
              </p>
            </div>

            {/* Right: timeline list */}
            <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column' }}>
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 24,
                    padding: '32px 0',
                    borderBottom: i < data.experience.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  {/* Logo */}
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'var(--color-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    flexShrink: 0,
                    border: '1px solid var(--color-border)',
                  }}>
                    {exp.logo === '🚀' ? <Rocket size={20} strokeWidth={1.5} color="var(--color-ink)" /> :
                     exp.logo === '🎨' ? <Palette size={20} strokeWidth={1.5} color="var(--color-ink)" /> :
                     exp.logo === '🎓' ? <GraduationCap size={20} strokeWidth={1.5} color="var(--color-ink)" /> :
                     <Briefcase size={20} strokeWidth={1.5} color="var(--color-ink)" />}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                      marginBottom: 4,
                    }}>
                      {exp.company}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-ink-2)',
                      fontWeight: 400,
                    }}>
                      {exp.role}
                    </p>
                  </div>

                  {/* Duration */}
                  <span style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-ink-3)',
                    fontWeight: 400,
                  }}>
                    {exp.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
};

export default AboutPage;
