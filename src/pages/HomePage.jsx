import {
  MapPin, Terminal, Sun, Wind, Triangle, Code, ArrowUpRight,
  Layers, Layout, Database, Server, PenTool, BarChart,
  Briefcase, GraduationCap, Rocket, Star, ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactCTA from '../components/ContactCTA.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { translations } from '../i18n/translations.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navbar from '../components/Navbar.jsx';

const HomePage = () => {
  const { language, data } = useLanguage();
  const t = translations[language].home;

  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toLowerCase());
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    const getWeatherCondition = (code) => {
      if (code === 0) return 'Clear Sky';
      if (code === 1) return 'Mainly Clear';
      if (code === 2) return 'Partly Cloudy';
      if (code === 3) return 'Overcast';
      if (code >= 45 && code <= 48) return 'Foggy';
      if (code >= 51 && code <= 55) return 'Drizzle';
      if (code >= 61 && code <= 65) return 'Rainy';
      return 'Sunny';
    };

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=35.7595&longitude=-5.8340&current_weather=true`
        );
        const weatherData = await response.json();
        if (weatherData.current_weather) {
          const weatherCode = weatherData.current_weather.weathercode;
          const condition = getWeatherCondition(weatherCode);
          setWeather({
            temp: Math.round(weatherData.current_weather.temperature),
            condition: condition,
          });
        } else {
          setWeather({ temp: 24, condition: 'Sunny' });
        }
      } catch (error) {
        setWeather({ temp: 24, condition: 'Sunny' });
      }
    };

    fetchWeather();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [language]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Editorial Logic: Split headline into 2 balanced lines
  const renderHeadline = (text) => {
    const cleanText = text.replace(/\.\s*$/, '');
    const words = cleanText.split(' ');
    const breakIndex = Math.max(2, Math.floor(words.length / 2));
    const line1 = words.slice(0, breakIndex).join(' ');
    const line2 = words.slice(breakIndex).join(' ');
    return (
      <>
        {line1}<br />
        {line2}<span style={{ color: '#E85D2F' }}>.</span>
      </>
    );
  };

  return (
    <div style={{ paddingTop: 10 }}>
      <Navbar />
      {/* ── Hero Section ──────────────────────────────── */}
      <section
        className="hero-section"
        style={{ padding: '50px 0 100px' }}
      >
        <div className="page-container-wide">
          <div
            className="hero-flex-container"
            style={{
              display: 'flex',
              gap: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="hero-img-box"
              style={{
                width: 220,
                height: 270,
                borderRadius: 15,
                overflow: 'hidden',
                flexShrink: 0,
                transform: 'translateY(-20px)', // Raises the image slightly
              }}
            >
              <img
                src={data.profilePicture}
                alt={data.name}
                fetchpriority="high"
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 80%'
                }}
              />
            </div>

            <div className="hero-right-side" style={{ paddingTop: 0, width: 560, flexShrink: 1 }}>
              <p className="hero-role-label" style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '21px',
                color: 'rgb(154, 150, 144)',
                marginBottom: 12,
              }}>
                {data.role}
              </p>

              <h1 className="hero-main-title" style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '68px',
                lineHeight: '73px',
                color: 'rgb(26, 26, 24)',
                marginBottom: 24,
                maxWidth: '560px',
              }}>
                {renderHeadline(data.headline)}
              </h1>

              <p className="hero-bio-text" style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '26px',
                color: 'rgb(26, 26, 24)',
                marginBottom: 28,
                maxWidth: '580px',
              }}>
                {data.bio}<span className="cursor-blink" style={{ color: '#E85D2F', fontWeight: 500 }}>|</span>
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: '#9A9A8E',
                fontSize: '0.8125rem',
                position: 'relative',
              }} className="location-weather-wrapper">
                <MapPin size={14} strokeWidth={1.5} />
                <span className="location-text" style={{
                  backgroundImage: 'linear-gradient(to right, #C5C5BA 50%, transparent 50%)',
                  backgroundPosition: '0 100%',
                  backgroundRepeat: 'repeat-x',
                  backgroundSize: '6px 1px',
                  paddingBottom: '4px',
                  cursor: 'pointer',
                }}>
                  {data.location}
                </span>

                <div className="weather-widget" style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 'calc(100% + 12px)',
                  width: 155,
                  padding: '16px 18px',
                  background: 'linear-gradient(145deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)',
                  borderRadius: 20,
                  color: 'white',
                  opacity: 0,
                  visibility: 'hidden',
                  transform: 'translateY(8px)',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                }}>
                  <div style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                    opacity: 0.95,
                  }}>{data.location.toUpperCase()}</div>
                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 400,
                    opacity: 0.75,
                    marginBottom: 12,
                  }}>{currentTime || '3:52 pm'}</div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: 4,
                  }}>
                    <span style={{
                      fontSize: '3rem',
                      fontWeight: 300,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}>{weather?.temp || '--'}</span>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: 300,
                      marginTop: '4px',
                    }}>°</span>
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    opacity: 0.9,
                    textTransform: 'capitalize',
                  }}>{weather?.condition || 'Sunny'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Selected Work ───────────────────────────── */}
      <motion.section
        id="work"
        style={{ padding: '24px 0 100px' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
      >
        <div className="page-container-wide">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'var(--color-ink)',
            marginBottom: 40,
            letterSpacing: '-0.02em',
          }}>
            {t.selectedWork}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(() => {
              const projects = data.work;
              const projectRows = [];
              for (let i = 0; i < projects.length; i += 2) {
                const pair = projects.slice(i, i + 2);
                const gridTemplateColumns = pair.length === 1 ? '1fr' : (i % 4 === 0 ? '7fr 5fr' : '5fr 7fr');

                projectRows.push(
                  <div
                    key={i}
                    className="work-row-grid"
                    style={{
                      display: 'grid',
                      '--desktop-grid': gridTemplateColumns,
                      gap: 16
                    }}
                  >
                    {pair.map((project) => {
                      const imgCount = project.images?.length ?? 0;
                      const imgClass = (idx) => {
                        if (imgCount === 1) return 'wc-img-wrap wc-img-single';
                        if (imgCount === 2) return `wc-img-wrap wc-img-solo-${idx}`;
                        return `wc-img-wrap wc-img-${idx}`;
                      };

                      return (
                        <div key={project.id}>
                          <Link
                            to={`/work/${project.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <div
                              className={`work-card-v2 ${pair.length === 1 ? 'wc-full-width' : ''} ${project.id === 'warden' ? 'wc-warden' : ''}`}
                              style={{
                                '--card-bg': project.cardBg,
                                '--card-bg-hover': project.cardBgHover
                              }}
                            >
                              <div className="wc-arrow">
                                <ArrowUpRight size={16} strokeWidth={1.5} />
                              </div>

                              <div className="wc-meta">
                                <span className="wc-category">{project.category}</span>
                                <span className="wc-sep">·</span>
                                <span className="wc-company">{project.company}</span>
                              </div>

                              <h3 className="wc-headline">{project.headline}</h3>

                              {imgCount > 0 && (
                                <div className="wc-images">
                                  {project.images.map((src, idx) => (
                                    <div key={idx} className={imgClass(idx)}>
                                      <img 
                                        src={src} 
                                        alt={`${project.company} screenshot ${idx + 1}`} 
                                        loading="lazy"
                                        decoding="async"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                );
              }
              return projectRows;
            })()}
          </div>
        </div>
      </motion.section>


      {/* ── Stack (Spec Sheet Style) ──────────────────────── */}
      <motion.section
        id="stack"
        className="stack-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
      >
        <div className="page-container-wide">
          <div className="stack-layout">
            <div className="stack-header">
              <h2 className="stack-title">{t.stackTitle}</h2>
              <p className="stack-subtitle">{t.stackSubtitle}</p>
              <p className="stack-description">
                {t.stackDescription}
              </p>
            </div>

            <div className="stack-spec-list">
              {[
                { num: '01', icon: Layers, title: t.stackRow.frameworks, desc: t.stackRow.frameworksDesc, tools: ['React', 'Next.js', 'Laravel'] },
                { num: '02', icon: Layout, title: t.stackRow.frontend, desc: t.stackRow.frontendDesc, tools: ['TypeScript', 'Tailwind CSS', 'Framer Motion', 'Alpine.js'] },
                { num: '03', icon: Database, title: t.stackRow.backend, desc: t.stackRow.backendDesc, tools: ['Node.js', 'PostgreSQL', 'MySQL', 'Rest API'] },
                { num: '04', icon: Server, title: t.stackRow.infra, desc: t.stackRow.infraDesc, tools: ['Docker', 'Vercel', 'GitHub Actions', 'Git'] },
                { num: '05', icon: PenTool, title: t.stackRow.design, desc: t.stackRow.designDesc, tools: ['Figma', 'Notion'] },
                { num: '06', icon: BarChart, title: t.stackRow.analytics, desc: t.stackRow.analyticsDesc, tools: ['Google Analytics', 'Google Search Console'] }
              ].map((row, i) => (
                <motion.div
                  key={i}
                  className="stack-row"
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="stack-row-lead">
                    <span className="stack-num">{row.num}</span>
                    <row.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="stack-row-content">
                    <h3 className="stack-row-title">{row.title}</h3>
                    <p className="stack-row-desc">{row.desc}</p>
                  </div>
                  <div className="stack-row-tools">
                    {row.tools.map((tool, ti) => (
                      <span key={ti} className="stack-pill">{tool}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Experience Timeline ──────────────────────────── */}
      <motion.section
        id="experience"
        className="exp-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
      >
        <div className="page-container-wide">
          <div className="exp-header">
            <p className="exp-eyebrow">{t.experience.title}</p>
            <h2 className="exp-title">{t.experience.subtitle}</h2>
            <p className="exp-subtitle">
              {t.experience.description}
            </p>
          </div>

          <div className="exp-timeline">
            <div className="exp-line" />

            {data.experience.map((entry, i) => {
              const icons = [Rocket, Briefcase, Star, GraduationCap];
              const IconComponent = icons[i % icons.length];
              const side = i % 2 === 0 ? 'right' : 'left';
              return (
                <motion.div
                  key={i}
                  className={`exp-entry exp-entry--${side}`}
                  initial={{ opacity: 0, x: side === 'right' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="exp-node" style={{ background: '#1A1A1A', color: '#fff', borderColor: '#1A1A1A' }}>
                    <IconComponent size={14} strokeWidth={2} />
                  </div>
                  <div className="exp-card">
                    <span className="exp-date">{entry.duration || entry.date}</span>
                    <h3 className="exp-role">{entry.role}</h3>
                    <p className="exp-company">{entry.company}</p>
                    <p className="exp-desc">{entry.description || entry.desc}</p>
                    <div className="exp-tags">
                      {(entry.tags || []).map((tag, ti) => (
                        <span key={ti} className="exp-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
      >
        <ContactCTA />
      </motion.div>

      <div style={{ height: '2rem' }} />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="scroll-top-btn"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;