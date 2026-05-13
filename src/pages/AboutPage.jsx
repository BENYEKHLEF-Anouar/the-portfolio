import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ContactCTA from '../components/ContactCTA';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { translations } from '../i18n/translations.js';

const PhotoItem = ({ card, index, cards, moveToEnd }) => {
  const isTop = index === 0;

  // Snappy reordering physics
  const tossTransition = {
    type: 'spring',
    stiffness: 180,
    damping: 25,
    mass: 0.8
  };

  const variants = {
    initial: {
      rotate: card.rot,
      x: 0,
      y: 0,
      scale: 0.9,
      opacity: 0
    },
    animate: {
      rotate: isTop ? card.rot : card.rot + (index * 2),
      x: isTop ? 0 : card.x,
      y: isTop ? 0 : card.y,
      scale: 1 - (index * 0.02),
      opacity: 1,
      transition: {
        ...tossTransition,
        delay: 0.2 + (index * 0.08)
      }
    },
    hover: {
      rotate: isTop ? card.rot : card.rot + (index * 4),
      x: isTop ? 0 : card.x * 2,
      y: isTop ? 0 : card.y * 2,
      scale: isTop ? 1.02 : 1 - (index * 0.01),
      transition: { type: 'spring', stiffness: 150, damping: 20 }
    }
  };

  return (
    <motion.div
      layout
      className="photo-item"
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover={isTop ? "hover" : ""}
      transition={tossTransition}
      style={{
        zIndex: cards.length - index,
        cursor: isTop ? 'grab' : 'default',
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 50 || Math.abs(info.offset.y) > 50) {
          moveToEnd(index);
        }
      }}
      whileDrag={{
        scale: 1.05,
        zIndex: 100
      }}
    >
      <img src={card.img || card.url} alt={card.caption} loading="lazy" decoding="async" />
      <div className="photo-caption">{card.caption}</div>
    </motion.div>
  );
};

const AboutPage = () => {
  const { language, data } = useLanguage();
  const t = translations[language].about;

  const initialCards = [
    { id: 1, img: data.profilePicture, caption: t.photos.tangier, rot: -2, x: 0, y: 0 },
    { id: 2, img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop", caption: t.photos.deepWork, rot: 3, x: 25, y: -15 },
    { id: 3, img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop", caption: t.photos.design, rot: -5, x: -20, y: 25 },
    { id: 4, img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=600&auto=format&fit=crop", caption: t.photos.editorial, rot: 6, x: 35, y: 20 },
  ];

  const [cards, setCards] = useState(initialCards);

  // Sync cards when language changes
  useEffect(() => {
    setCards(initialCards);
  }, [language]);

  const moveToEnd = (from) => {
    const newCards = [...cards];
    const item = newCards.splice(from, 1)[0];
    newCards.push(item);
    setCards(newCards);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const navigate = useNavigate();

  return (
    <div className="about-page">
      <Link
        to="/"
        className="about-close-btn"
        style={{
          background: 'rgba(0,0,0,0.03)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: '20px',
          right: '20px',
          position: 'fixed',
          zIndex: 2001
        }}
      >
        <X size={20} strokeWidth={1.5} />
      </Link>

      <div className="page-container-wide">
        <div className="about-layout">
          <motion.div className="about-content" variants={staggerContainer} initial="initial" animate="animate">
            <motion.span className="about-mini-title" variants={fadeInUp}>{t.title}</motion.span>
            <motion.h1 className="about-title" variants={fadeInUp}>
              {t.greeting}<span className="accent-dot" />
            </motion.h1>

            <motion.div className="about-phonetic" variants={fadeInUp}>
              <span>{t.phonetic}</span>
              <Volume2 size={14} className="phonetic-icon" />
            </motion.div>

            <div className="about-photos-container about-photos-mobile" style={{ margin: '32px 0', display: 'none' }}>
              <motion.div className="photo-stack" whileHover="hover">
                {cards.map((card, index) => <PhotoItem key={card.id} card={card} index={index} cards={cards} moveToEnd={moveToEnd} />)}
              </motion.div>
            </div>

            <motion.div className="about-bio" variants={fadeInUp}>
              {data.aboutBio.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
            </motion.div>

            <motion.div className="about-languages" variants={fadeInUp} style={{ marginTop: '48px' }}>
              <h2 className="footer-label">{t.languages}</h2>
              <div className="lang-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', marginTop: '24px' }}>
                {data.languages.map((lang, i) => (
                  <div key={i} className="lang-item">
                    <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#111' }}>{lang.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: '#9A9A8E', marginTop: '4px' }}>{lang.level}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div className="about-photos-container about-photos-desktop">
            <motion.div
              className="photo-stack"
              whileHover="hover"
            >
              {cards.map((card, index) => (
                <PhotoItem key={card.id} card={card} index={index} cards={cards} moveToEnd={moveToEnd} />
              ))}
            </motion.div>
          </div>

        </div>

        <motion.section
          className="about-experience-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="exp-sidebar">
            <h2>{t.experienceTitle}</h2>
            <p>{t.experienceDesc}</p>
          </div>

          <div className="exp-main-list">
            {data.experience.map((exp, i) => (
              <div key={i} className="exp-row">
                <div className={`exp-col-logo ${exp.company?.includes('Solicode') ? 'full-fill' : ''}`}>
                  {exp.logo ? (
                    <img src={exp.logo} alt={exp.company} loading="lazy" decoding="async" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🏢</div>
                  )}
                </div>
                <div className="exp-col-info">
                  <span className="exp-company-name">{exp.company}</span>
                  <span className="exp-role-title">{exp.role}</span>
                </div>
                <div className="exp-col-year">
                  {exp.duration}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="about-contact-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingBottom: '0px' }}
        >
          <ContactCTA />
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;
