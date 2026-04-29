import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, variant = 'compact' }) => {
  if (variant === 'wide') {
    return (
      <Link
        to={`/work/${project.id}`}
        style={{ textDecoration: 'none' }}
      >
        <div 
          className="work-card" 
          style={{ 
            padding: '40px 0',
            borderTop: '1px solid #EBEBEB',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.paddingLeft = '16px';
            e.currentTarget.style.paddingRight = '16px';
            e.currentTarget.style.borderLeftColor = '#E85D2F';
            e.currentTarget.style.borderLeft = '3px solid #E85D2F';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.paddingLeft = '0px';
            e.currentTarget.style.paddingRight = '0px';
            e.currentTarget.style.borderLeft = 'none';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ 
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9A9A8E',
            }}>
              {project.category}
            </span>
            <span style={{ color: '#DCDCD4' }}>·</span>
            <span style={{ 
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9A9A8E',
            }}>
              {project.company}
            </span>
          </div>
          
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 400,
            color: 'var(--color-ink)',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            marginBottom: 16,
            transition: 'color 0.3s ease',
          }}>
            {project.headline}
          </h2>
          
          <p style={{ 
            fontSize: '1.0625rem',
            lineHeight: 1.6,
            color: '#555555',
            maxWidth: '720px',
            marginBottom: 0,
          }}>
            {project.tagline}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/work/${project.id}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="work-card">
        <div className="work-image-container" style={{
          height: 380,
          marginBottom: 24,
        }}>
          <img
            src={project.thumbnail}
            alt={project.headline}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span className="text-label" style={{ color: 'var(--color-ink-3)', letterSpacing: '0.1em' }}>{project.category}</span>
            <span style={{ color: 'var(--color-border)' }}>·</span>
            <span className="text-label" style={{ color: 'var(--color-ink-3)', letterSpacing: '0.1em' }}>{project.company}</span>
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'var(--color-ink)',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
          }}>
            {project.headline}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
