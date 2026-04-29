import React from 'react';
import data from '../data/profile.json';

const ContactCTA = () => {
  return (
    <section className="cta-section">
      <div className="page-container-wide">
        <div className="cta-card">
          <h2 className="cta-title">
            Let's build something together<span className="accent-dot"></span>
          </h2>
          <p className="cta-body">
            Always drawn to interesting problems. If you're building something and want to think through it together, let's talk.
          </p>
          <div className="cta-buttons">
            <a href={`mailto:${data.email}`} className="cta-btn-primary">Email me</a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="cta-btn-secondary">LinkedIn</a>
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="cta-btn-secondary">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
