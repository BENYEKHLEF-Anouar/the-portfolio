import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import WorkPage from './pages/WorkPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import BuildingPage from './pages/BuildingPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

function App() {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith('/work/') && location.pathname.length > 6;

  return (
    <>
      {!isProjectDetail && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<ProjectDetailPage />} />
          <Route path="/building" element={<BuildingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
