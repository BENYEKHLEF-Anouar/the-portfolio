import React, { useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ExternalLink, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactCTA from '../components/ContactCTA.jsx';
import data from '../data/profile.json';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = data.work.find((p) => p.id === id);
  const [activeSection, setActiveSection] = React.useState('overview');

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
    const sections = document.querySelectorAll('.pd-section, .pd-specs-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [id]);

  if (!project) return <Navigate to="/work" replace />;

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

    const navigate = useNavigate();

    return (
      <div className="pd-wrapper">
        {/* Return Header */}
        <header className="pd-header">
          <button 
            onClick={() => navigate(-1)} 
            className="pd-return"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            <span>All work</span>
          </button>
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
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="pd-meta-top"
                style={{ color: project.accentColor }}
              >
                {project.category} · {project.company}
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
                <a
                  href={project.link !== '#' ? project.link : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pd-action-btn pd-action-btn--primary${project.link === '#' ? ' pd-action-btn--disabled' : ''}`}
                >
                  <ExternalLink size={14} strokeWidth={2} />
                  Live Demo
                </a>
                <a
                  href={project.github !== '#' ? project.github : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pd-action-btn pd-action-btn--outline${project.github === '#' ? ' pd-action-btn--disabled' : ''}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  Source Code
                </a>
              </div>
            </motion.div>

            <motion.div
              className="pd-hero-side-meta"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <p className="pd-meta-label">Selected Project</p>
              <p className="pd-meta-value" style={{ fontSize: '18px' }}>{project.year}</p>
            </motion.div>
          </div>

          <motion.div
            className="pd-hero-main-img"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <img src={project.thumbnail} alt={project.company} />
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="page-container-wide">
        <div className="pd-detail-layout">

          {/* Side Summary Navigation */}
          <aside className="pd-side-summary">
            <div className="pd-sticky-wrap">
              <p className="pd-meta-label" style={{ marginBottom: '24px' }}>On this page</p>
              <nav className="pd-summary-nav">
                <a
                  href="#overview"
                  className={`pd-summary-link ${activeSection === 'overview' ? 'active' : ''}`}
                >
                  01 — Overview
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
                  0{(project.sections?.length || 0) + 2} — Specs
                </a>
              </nav>

              {/* Sticky Sidebar Stack — Editorial Professional style */}
              <div className="pd-side-stack">
                <p className="pd-meta-label">Infrastructure</p>
                <div className="pd-side-stack-list">
                  {project.tags.map((tag, i) => (
                    <div key={i} className="pd-side-stack-item">
                      <Cpu size={12} className="pd-side-stack-icon" strokeWidth={1.5} />
                      <span className="pd-side-stack-name">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Body */}
          <main className="pd-main-body">
            {/* Overview Section */}
            <motion.div id="overview" className="pd-section" {...fadeInUp}>
              <span className="pd-section-label">01 — Overview</span>
              <h2 className="pd-section-title">The Project Summary</h2>
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
                {project.images && project.images[i] && (
                  <div className="pd-image-large">
                    <img src={project.images[i]} alt={section.title} />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Project Specs Section */}
            <motion.section id="specs" className="pd-specs-section" {...fadeInUp}>
              <div className="pd-specs-grid">
                <div className="pd-spec-item">
                  <p className="pd-meta-label">Role</p>
                  <p className="pd-meta-value">{project.category}</p>
                </div>
                <div className="pd-spec-item">
                  <p className="pd-meta-label">Company</p>
                  <p className="pd-meta-value">{project.company}</p>
                </div>
                <div className="pd-spec-item">
                  <p className="pd-meta-label">Year</p>
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
                  Visit Live Site <ArrowUpRight size={18} />
                </a>
              )}
            </motion.section>
          </main>
        </div>
      </div>

      <ContactCTA />
    </div>
  );
};

export default ProjectDetailPage;
