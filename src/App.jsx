import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';

// Helper component to handle scrolling to hash links and scroll restoration
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (navType === 'PUSH') {
      // Only scroll to top if we are navigating to a NEW page (Push)
      // Browsers handle scroll restoration for POP (Back button) automatically
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, navType]);

  return null;
};

// Page wrapper for consistent transitions
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const isProjectDetail = location.pathname.startsWith('/work/') && location.pathname.length > 6;

  return (
    <>
      <ScrollToHash />
      {!isProjectDetail && !isAboutPage && <Navbar />}
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/work/:id" element={<PageWrapper><ProjectDetailPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><HomePage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAboutPage && <Footer />}
    </>
  );
}

export default App;
