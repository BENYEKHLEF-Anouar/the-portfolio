import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import data from '../data/profile.json';

const AboutPage = () => {
  const initialCards = [
    { id: 1, img: data.profilePicture, caption: "Tangier creative affairs", rot: -2, x: 0, y: 0 },
    { id: 2, img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop", caption: "Deep work sessions", rot: 3, x: 25, y: -15 },
    { id: 3, img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop", caption: "Design & Craft", rot: -5, x: -20, y: 25 },
    { id: 4, img: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=600&auto=format&fit=crop", caption: "Editorial vibes", rot: 6, x: 35, y: 20 },
  ];

  const [cards, setCards] = useState(initialCards);

  const moveToEnd = (from) => {
    const newCards = [...cards];
    const item = newCards.splice(from, 1)[0];
    newCards.push(item);
    setCards(newCards);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* ── Close Button ──────────────────────────────── */}
      <button 
        onClick={() => navigate(-1)} 
        className="about-close-btn"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      <div className="page-container-wide">
        <div className="about-layout">

          {/* ── Left Column: Content ───────────────────── */}
          <motion.div
            className="about-content"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.span className="about-mini-title" variants={fadeInUp}>About</motion.span>

            <motion.h1 className="about-title" variants={fadeInUp}>
              Hello, I'm Anouar<span className="accent-dot" />
            </motion.h1>

            <motion.div className="about-phonetic" variants={fadeInUp}>
              <span>/an·wahr/ — sounds like "un-war"</span>
              <Volume2 size={14} className="phonetic-icon" />
            </motion.div>

            <motion.div className="about-bio" variants={fadeInUp}>
              <p>
                I grew up in Rabat, Morocco and went to school in the heart of the city.
                Over the past 4+ years I've helped build products and teams at various startups —
                starting as a frontend dev and eventually building and shipping full-stack
                products I'm proud of.
              </p>
              <p>
                At SoliQuiz, I built the core pedagogical platform from scratch.
                At Warden Properties, I helped scale the platform's reach across 4 international markets,
                contributing to a 300% increase in lead generation through a robust SEO strategy.
              </p>
              <p>
                I'm drawn to projects where engineering is a competitive advantage
                and where people think, build, and ship together.
              </p>
            </motion.div>

            {/* Experience List */}
            <motion.div className="about-experience" variants={fadeInUp}>
              <h2 className="footer-label">Selected Experience</h2>
              <div className="exp-mini-list">
                {data.experience.map((exp, i) => (
                  <div key={i} className="exp-mini-item">
                    <span className="exp-mini-year">{exp.duration.split(' – ')[0]}</span>
                    <div className="exp-mini-details">
                      <span className="exp-mini-company">{exp.company}</span>
                      <span className="exp-mini-role">{exp.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Interactive Photo Stack ────── */}
          <motion.div
            className="about-photos-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="photo-stack"
              whileHover="hover"
            >
              {cards.map((card, index) => {
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
                      // Staggered entrance for the initial mount
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
                    key={card.id}
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
                      rotate: 0,
                      zIndex: 100
                    }}
                  >
                    <img src={card.img} alt={card.caption} draggable="false" />
                    {isTop && (
                      <div className="photo-caption">
                        <span>{card.caption}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
