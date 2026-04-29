import React from 'react';
import ProjectCard from '../components/ProjectCard.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import data from '../data/profile.json';

const WorkPage = () => {
  return (
    <div style={{ paddingTop: 30 }}>
      <section style={{ padding: '80px 0' }}>
        <div className="page-container-wide">
          <p className="text-label" style={{ marginBottom: 24, letterSpacing: '0.1em' }}>Work</p>
          <h1 style={{
            marginBottom: 64, 
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: 400,
            color: 'var(--color-ink)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}>
            Selected projects
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {data.work.map((project) => (
              <ProjectCard key={project.id} project={project} variant="wide" />
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />
      <ContactCTA />
    </div>
  );
};

export default WorkPage;
