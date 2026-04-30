import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';

const scrollState = { shouldScroll: false, y: 0 };
const scrollPositions = {};

// Helper component to handle scrolling to hash links and scroll restoration
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Disable native scroll restoration so it doesn't jump during exit animations
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Track scroll position for the current route to enable "Smart Checkpoints"
  useEffect(() => {
    const handleScroll = () => {
      scrollPositions[pathname] = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Defer scroll until the exit animation completes in AnimatePresence
      scrollState.shouldScroll = true;
      if (navType === 'POP' && scrollPositions[pathname] !== undefined) {
        // Restore previous scroll position on Back navigation
        scrollState.y = scrollPositions[pathname];
      } else {
        // Scroll to top on new page navigation
        scrollState.y = 0;
      }
    }
  }, [pathname, hash, navType]);

  return null;
};

// Page wrapper for consistent transitions
const PageWrapper = ({ children, type }) => {
  const isProject = type === 'project';

  // Editorial Glide: Liquid scale and perspective travel
  const variants = {
    initial: {
      opacity: 0,
      y: isProject ? 80 : 20,
      scale: isProject ? 0.96 : 1,
      filter: isProject ? 'blur(8px)' : 'blur(0px)'
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: {
      opacity: 0,
      y: isProject ? 40 : -20,
      scale: 0.98,
      filter: isProject ? 'blur(8px)' : 'blur(0px)'
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ 
        duration: isProject ? 0.9 : 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{ transformOrigin: 'top center' }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const isProjectDetail = location.pathname.startsWith('/work/') && location.pathname.length > 6;

  return (
    <>
      <ScrollToHash />
      <main>
        <AnimatePresence 
          mode="wait"
          onExitComplete={() => {
            if (scrollState.shouldScroll) {
              window.scrollTo(0, scrollState.y);
              scrollState.shouldScroll = false;
            }
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper type="home"><HomePage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper type="about"><AboutPage /></PageWrapper>} />
            <Route path="/work/:id" element={<PageWrapper type="project"><ProjectDetailPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper type="home"><HomePage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer className={isAboutPage || isProjectDetail ? 'footer-about-page' : ''} />
    </>
  );
}

export default App;

