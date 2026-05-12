import React, { useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ExternalLink, Cpu, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactCTA from '../components/ContactCTA.jsx';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { translations } from '../i18n/translations.js';

const ProjectDetailPage = () => {
  const { language, data } = useLanguage();
  const t = translations[language].project;
  const { id } = useParams();
  const project = data.work.find((p) => p.id === id);
  const [activeSection, setActiveSection] = React.useState('overview');
  const [showBackButton, setShowBackButton] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
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
    const sections = document.querySelectorAll('.pd-section, .pd-specs-section');
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      setShowBackButton(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id]);

  if (!project) return <Navigate to="/work" replace />;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const navigate = useNavigate();

  return (
    <div className="pd-wrapper">
      {/* Return Header */}
      <header className="pd-header">
        <Link
          to="/"
          className="pd-return"
          onClick={(e) => {
            if (window.history.length > 1) {
              e.preventDefault();
              navigate(-1);
            }
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span>{t.allWork}</span>
        </Link>
      </header>

      {/* Enhanced Hero Section */}
      <section
        className="pd-hero"
        style={{ backgroundColor: project.cardBgHover }}
      >
        <div className="page-container-wide">
          <div className="pd-hero-grid">
            <motion.div
              className="pd-hero-text-wrap"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="pd-meta-top"
                style={{ color: project.accentColor }}
              >
                {project.category} · {project.companyLink ? (
                  <a href={project.companyLink} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                    {project.company}
                  </a>
                ) : project.company}
              </span>
              <h1 className="pd-title">
                {project.headline.endsWith('.') ? (
                  <>
                    {project.headline.slice(0, -1)}
                    <span style={{ color: project.accentColor }}>.</span>
                  </>
                ) : (
                  project.headline
                )}
              </h1>

              {/* ── Hero action buttons */}
              <div className="pd-action-buttons">
                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-action-btn pd-action-btn--primary"
                  >
                    <ExternalLink size={14} strokeWidth={2} />
                    {t.liveDemo}
                  </a>
                )}
                {project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-action-btn pd-action-btn--outline"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    {t.sourceCode}
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              className="pd-hero-side-meta"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '24px' }}
            >
              {project.logo && (
                <img
                  src={project.logo}
                  alt={`${project.company} Logo`}
                  style={{
                    height: project.id === 'warden' ? '55px' : '90px',
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              )}
              <div style={{ textAlign: 'right' }}>
                <p className="pd-meta-label">{t.selectedProject}</p>
                <p className="pd-meta-value" style={{ fontSize: '18px' }}>{project.year}</p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Main Content Grid */}
      <div className="page-container-wide">
        <div className="pd-detail-layout">

          {/* Side Summary Navigation */}
          <aside className="pd-side-summary">
            <div className="pd-sticky-wrap" style={{
              maxHeight: 'calc(100vh - 140px)',
              overflowY: 'auto'
            }}>
              <p className="pd-meta-label" style={{ marginBottom: '24px' }}>{t.onThisPage}</p>
              <nav className="pd-summary-nav">
                <a
                  href="#overview"
                  className={`pd-summary-link ${activeSection === 'overview' ? 'active' : ''}`}
                >
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

            {/* Overview Section */}
            <motion.div id="overview" className="pd-section" {...fadeInUp}>
              <span className="pd-section-label">01 — {t.overview}</span>
              <h2 className="pd-section-title">{t.projectSummary}</h2>
              <div className="pd-section-body">
                <p>{project.description}</p>
              </div>
            </motion.div>

            {/* Iterative Sections */}
            {project.sections && project.sections.map((section, i) => (
              <motion.div key={i} id={`section-${i}`} className="pd-section" {...fadeInUp}>
                <span className="pd-section-label">0{i + 2} — {section.title}</span>
                <h3 className="pd-section-title">{section.title}</h3>
                <div className="pd-section-body">
                  <p>{section.body}</p>
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

      {/* Floating Return Button */}
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

export default ProjectDetailPage;
