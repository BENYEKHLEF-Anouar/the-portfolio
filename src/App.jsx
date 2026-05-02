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
  const location = useLocation();
  const navType = useNavigationType();
  const previousPathnameRef = React.useRef(location.pathname);

  useEffect(() => {
    // Disable native scroll restoration so it doesn't jump during exit animations
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Track scroll position for the exact history entry to enable pixel-perfect checkpoints
  // Also track by pathname to allow "app-like" resume when clicking the logo to return home
  useEffect(() => {
    const handleScroll = () => {
      scrollPositions[location.key] = window.scrollY;
      scrollPositions[location.pathname] = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.key, location.pathname]);

  useEffect(() => {
    const isSamePage = previousPathnameRef.current === location.pathname;
    previousPathnameRef.current = location.pathname;

    if (isSamePage) {
      // Same page navigation (e.g. clicking a hash link or POPping back to a hash on the same page)
      if (navType === 'POP' && scrollPositions[location.key] !== undefined) {
        window.scrollTo(0, scrollPositions[location.key]);
      } else if (location.hash) {
        const element = document.getElementById(location.hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      // Cross-page navigation: defer scroll until AnimatePresence exit completes
      scrollState.shouldScroll = true;
      if (navType === 'POP' && scrollPositions[location.key] !== undefined) {
        // Always prioritize exact pixel restoration on Back navigation
        scrollState.hash = '';
        scrollState.y = scrollPositions[location.key];
      } else if (location.pathname === '/' && scrollPositions['/'] !== undefined && !location.hash) {
        // Feature: Smart resume for the home page. When clicking "Return Home", restore previous scroll depth instead of top.
        scrollState.hash = '';
        scrollState.y = scrollPositions['/'];
      } else if (location.hash) {
        scrollState.hash = location.hash.replace('#', '');
        scrollState.y = 0;
      } else {
        scrollState.hash = '';
        scrollState.y = 0;
      }
    }
  }, [location.key, location.hash, navType, location.pathname]);

  return null;
};

// Page wrapper for consistent transitions
const PageWrapper = ({ children, type }) => {
  const isProject = type === 'project';

  // Editorial Glide: Lightweight, lag-free page transition
  const variants = {
    initial: {
      opacity: 0,
      y: 15,
    },
    animate: {
      opacity: 1,
      y: 0,
      transitionEnd: {
        transform: ''
      }
    },
    exit: {
      opacity: 0,
      y: -15,
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
              if (scrollState.hash) {
                // Defer slightly to ensure DOM has painted the element
                setTimeout(() => {
                  const element = document.getElementById(scrollState.hash);
                  if (element) {
                    element.scrollIntoView({ behavior: 'auto' });
                  }
                }, 50);
              } else {
                const targetY = scrollState.y;
                // Fire immediately
                window.scrollTo(0, targetY);
                // And fire across multiple frames to guarantee exact positioning after React's paint cycle
                requestAnimationFrame(() => {
                  window.scrollTo(0, targetY);
                  setTimeout(() => window.scrollTo(0, targetY), 10);
                  setTimeout(() => window.scrollTo(0, targetY), 50);
                  setTimeout(() => window.scrollTo(0, targetY), 100);
                });
              }
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

