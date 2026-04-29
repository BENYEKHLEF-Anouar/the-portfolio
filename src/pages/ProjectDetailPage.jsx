import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
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

  return (
    <div className="pd-wrapper">
      {/* Return Header */}
      <header className="pd-header">
        <Link to="/" className="pd-return">
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span>All work</span>
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
                    0{i+2} — {section.title}
                  </a>
                ))}
                <a 
                  href="#specs" 
                  className={`pd-summary-link ${activeSection === 'specs' ? 'active' : ''}`}
                >
                  0{(project.sections?.length || 0) + 2} — Specs
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Body */}
          <main className="pd-main-body">
            {/* Overview Section */}
            <motion.div id="overview" className="pd-section" {...fadeInUp}>
              <p className="pd-section-body" style={{ fontSize: '24px', lineHeight: '1.5', color: '#111' }}>
                {project.description}
              </p>
            </motion.div>

            {/* Iterative Sections */}
            {project.sections && project.sections.map((section, i) => (
              <motion.div key={i} id={`section-${i}`} className="pd-section" {...fadeInUp}>
                <h3 className="pd-section-title">{section.title}</h3>
                <p className="pd-section-body">{section.body}</p>
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
                <div className="pd-spec-item">
                  <p className="pd-meta-label">Tools</p>
                  <p className="pd-meta-value">{project.tags.join(', ')}</p>
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
