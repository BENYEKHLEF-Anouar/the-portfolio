import React, { useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  ArrowUp, 
  ChevronRight,
  Cpu,
  ArrowUpRight,
  List,
  X
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import ContactCTA from '../components/ContactCTA';
import Navbar from '../components/Navbar';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { language, data } = useLanguage();
  const t = translations[language].project;
  const tCommon = translations[language].common;
  const [activeSection, setActiveSection] = React.useState('overview');
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [hideSideActions, setHideSideActions] = React.useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = React.useState(false);

  const project = data.work.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Scrollspy Observer
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    // Use a timeout to ensure DOM elements are rendered before observing
    setTimeout(() => {
      const sections = document.querySelectorAll('.pd-section, .pd-specs-section');
      sections.forEach((section) => observer.observe(section));
    }, 100);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setShowScrollTop(scrollY > 400);
      // Hide side actions when reaching the contact section at the bottom
      setHideSideActions(scrollY + windowHeight > documentHeight - 700);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id, project]);

  useEffect(() => {
    if (isSummaryOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('summary-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('summary-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('summary-open');
    };
  }, [isSummaryOpen]);

  if (!project) return <Navigate to="/work" replace />;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="project-detail-page pd-wrapper">
      {/* Return Header */}
      <header className="pd-header">
        <Link to="/" className="pd-return">
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span>{t.allWork}</span>
        </Link>
      </header>

      {/* ── Hero Section ──────────────────────────────── */}
      <section 
        className="pd-hero"
        style={{ backgroundColor: project.cardBgHover }}
      >
        <div className="page-container-wide">
          <div className="pd-hero-grid">
            <motion.div 
              className="pd-hero-text-wrap"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pd-meta-top" style={{ color: project.accentColor }}>
                <span>{project.category}</span>
                <span className="pd-sep">/</span>
                <span>
                  {project.companyLink ? (
                    <a href={project.companyLink} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                      {project.company}
                    </a>
                  ) : project.company}
                </span>
              </div>
              
              <h1 className="pd-title">
                {project.headline.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line.endsWith('.') ? (
                      <>
                        {line.slice(0, -1)}
                        <span style={{ color: project.accentColor }}>.</span>
                      </>
                    ) : (
                      line
                    )}
                    {i < project.headline.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>

            </motion.div>

            <motion.div 
              className="pd-hero-side-meta"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {project.logo && (
                <img 
                  src={project.logo} 
                  alt={`${project.company} Logo`} 
                  className="pd-hero-logo"
                  style={{ 
                    height: project.id === 'warden' ? '55px' : '90px',
                  }}
                />
              )}
              <div className="pd-hero-side-text">
                <p className="pd-meta-label">{t.selectedProject}</p>
                <p className="pd-meta-value" style={{ fontSize: '18px' }}>{project.year}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────── */}
      <div className="page-container-wide">
        <div className="pd-detail-layout">
          <aside className="pd-side-summary">
            <div className="pd-sticky-wrap" style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}>
              <p className="pd-meta-label" style={{ marginBottom: '24px' }}>{t.onThisPage}</p>
              <nav className="pd-summary-nav">
                <a href="#overview" className={`pd-summary-link ${activeSection === 'overview' ? 'active' : ''}`}>
                  01 — {t.overview}
                </a>
                {project.sections && project.sections.map((section, i) => (
                  <a 
                    key={i} 
                    href={`#section-${i}`} 
                    className={`pd-summary-link ${activeSection === `section-${i}` ? 'active' : ''}`}
                  >
                    0{i + 2} — {section.title}
                  </a>
                ))}
                <a
                  href="#specs"
                  className={`pd-summary-link ${activeSection === 'specs' ? 'active' : ''}`}
                >
                  0{(project.sections?.length || 0) + 2} — {t.specs}
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Body */}
          <main className="pd-main-body">
            {/* Inline Infrastructure Stack */}
            {project.tags && project.tags.length > 0 && (
              <motion.div className="pd-inline-stack" {...fadeInUp}>
                <p className="pd-meta-label">{t.infrastructure}</p>
                <div className="pd-inline-stack-list">
                  {project.tags.map((tag, i) => (
                    <div key={i} className="pd-inline-stack-item">
                      <Cpu size={14} className="pd-side-stack-icon" strokeWidth={1.5} />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Overview Section */}
            <motion.div id="overview" className="pd-section" {...fadeInUp}>
              <span className="pd-section-label">01 — {t.overview}</span>
              <h2 className="pd-section-title">{t.projectSummary}</h2>
              <div className="pd-section-body">
                {project.description.split('\n').map((paragraph, pIdx) => (
                  paragraph.trim() ? <p key={pIdx}>{paragraph}</p> : null
                ))}
              </div>
            </motion.div>

            {/* Iterative Sections */}
            {project.sections && project.sections.map((section, i) => (
              <motion.div key={i} id={`section-${i}`} className="pd-section" {...fadeInUp}>
                <span className="pd-section-label">0{i + 2} — {section.title}</span>
                <h3 className="pd-section-title">{section.title}</h3>
                <div className="pd-section-body">
                  {section.body.split('\n').map((paragraph, pIdx) => (
                    paragraph.trim() ? <p key={pIdx}>{paragraph}</p> : null
                  ))}
                </div>
                {(project.detailImages || project.images) && (project.detailImages || project.images)[i] && (
                  <div className="pd-image-large">
                    <img 
                      src={(project.detailImages || project.images)[i]} 
                      alt={section.title} 
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Project Specs Section */}
            <motion.section id="specs" className="pd-specs-section" {...fadeInUp}>
              <div className="pd-specs-grid">
                <div className="pd-spec-item">
                  <p className="pd-meta-label">{t.role}</p>
                  <p className="pd-meta-value">{project.category}</p>
                </div>
                <div className="pd-spec-item">
                  <p className="pd-meta-label">{t.company}</p>
                  <p className="pd-meta-value">
                    {project.companyLink ? (
                      <a href={project.companyLink} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>
                        {project.company}
                      </a>
                    ) : project.company}
                  </p>
                </div>
                <div className="pd-spec-item">
                  <p className="pd-meta-label">{t.year}</p>
                  <p className="pd-meta-value">{project.year}</p>
                </div>
              </div>

              {project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-live-button"
                >
                  {t.visitSite} <ArrowUpRight size={18} />
                </a>
              )}
            </motion.section>
          </main>
        </div>
      </div>

      <ContactCTA />

      {/* ── Fixed Side Actions ───────────────────────── */}
      <AnimatePresence>
        {!hideSideActions && (
          <motion.div 
            className="pd-side-actions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="pd-side-btn">
                <span className="pd-side-btn-label">GitHub</span>
                <div className="pd-side-btn-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
              </a>
            )}
            {project.link !== '#' && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="pd-side-btn pd-side-btn--primary">
                <span className="pd-side-btn-label">Visit Site</span>
                <div className="pd-side-btn-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
              </a>
            )}
            <button 
              onClick={() => setIsSummaryOpen(true)} 
              className="pd-side-btn pd-side-btn--summary"
            >
              <span className="pd-side-btn-label">Summary</span>
              <div className="pd-side-btn-icon">
                <List size={16} />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile Summary Overlay ───────────────────── */}
      <AnimatePresence>
        {isSummaryOpen && (
          <>
            <motion.div 
              className="pd-mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSummaryOpen(false)}
            />
            <motion.div 
              className="pd-mobile-summary-panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="pd-mobile-summary-header">
                <p className="pd-meta-label">{t.onThisPage}</p>
                <button onClick={() => setIsSummaryOpen(false)} className="pd-mobile-close">
                  <X size={20} />
                </button>
              </div>
              <nav className="pd-mobile-nav">
                <a 
                  href="#overview" 
                  className={`pd-mobile-nav-link ${activeSection === 'overview' ? 'active' : ''}`}
                  onClick={() => setIsSummaryOpen(false)}
                >
                  <span className="pd-nav-num">01</span>
                  <span className="pd-nav-text">{t.overview}</span>
                </a>
                {project.sections && project.sections.map((section, i) => (
                  <a 
                    key={i} 
                    href={`#section-${i}`} 
                    className={`pd-mobile-nav-link ${activeSection === `section-${i}` ? 'active' : ''}`}
                    onClick={() => setIsSummaryOpen(false)}
                  >
                    <span className="pd-nav-num">0{i + 2}</span>
                    <span className="pd-nav-text">{section.title}</span>
                  </a>
                ))}
                <a
                  href="#specs"
                  className={`pd-mobile-nav-link ${activeSection === 'specs' ? 'active' : ''}`}
                  onClick={() => setIsSummaryOpen(false)}
                >
                  <span className="pd-nav-num">0{(project.sections?.length || 0) + 2}</span>
                  <span className="pd-nav-text">{t.specs}</span>
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={scrollToTop}
            className="pd-side-btn pd-side-btn--scroll floating-bottom"
          >
            <span className="pd-side-btn-label">{tCommon.backToTop}</span>
            <div className="pd-side-btn-icon"><ArrowUp size={16} strokeWidth={2.5} /></div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetailPage;
