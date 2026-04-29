import { 
  MapPin, Terminal, Sun, Wind, Triangle, Code, ArrowUpRight, 
  Layers, Layout, Database, Server, PenTool, BarChart 
} from 'lucide-react';
import ContactCTA from '../components/ContactCTA.jsx';
import data from '../data/profile.json';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Get current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).toLowerCase());
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    // Helper to convert weather code to condition
    const getWeatherCondition = (code) => {
      if (code === 0) return 'Clear Sky';
      if (code === 1) return 'Mainly Clear';
      if (code === 2) return 'Partly Cloudy';
      if (code === 3) return 'Overcast';
      if (code >= 45 && code <= 48) return 'Foggy';
      if (code >= 51 && code <= 55) return 'Drizzle';
      if (code >= 61 && code <= 65) return 'Rainy';
      return 'Sunny';
    };

    // Fetch weather for Tangier using Open-Meteo (free, no API key needed)
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=35.7595&longitude=-5.8340&current_weather=true`
        );
        const data = await response.json();
        console.log('Weather API response:', data);

        if (data.current_weather) {
          const weatherCode = data.current_weather.weathercode;
          const condition = getWeatherCondition(weatherCode);
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            condition: condition,
          });
        } else {
          setWeather({ temp: 24, condition: 'Sunny' });
        }
      } catch (error) {
        console.error('Weather fetch failed:', error);
        setWeather({ temp: 24, condition: 'Sunny' });
      }
    };

    fetchWeather();

    return () => clearInterval(timeInterval);
  }, []);
  return (
    <div style={{ paddingTop: 10 }}>
      {/* ── Hero Section ──────────────────────────────── */}
      <section style={{ padding: '50px 0 100px' }}>
        <div className="page-container-wide">
          <div style={{
            display: 'flex',
            gap: 48,
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {/* Left — photo */}
            <div
              style={{
                width: 220,
                height: 270,
                borderRadius: 18,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <img
                src={data.profilePicture}
                alt={data.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Right — content */}
            <div style={{ paddingTop: 0, minWidth: 320 }}>
              {/* Role label */}
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '21px',
                color: 'rgb(154, 150, 144)',
                marginBottom: 12,
              }}>
                {data.role}
              </p>

              {/* Headline */}
              <h1 style={{
                fontSize: 'clamp(3rem, 5.5vw, 4.5rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: '#111111',
                marginBottom: 24,
                maxWidth: '850px',
              }}>
                I build fast, scalable<br />web experiences<span style={{ color: '#E85D2F' }}>.</span>
              </h1>

              {/* Bio */}
              <p style={{
                fontSize: '1.0625rem',
                lineHeight: 1.5,
                color: '#1A1A1A',
                marginBottom: 28,
                maxWidth: '580px',
              }}>
                {data.bio}<span className="cursor-blink" style={{ color: '#E85D2F', fontWeight: 500 }}>|</span>
              </p>

              {/* Location with Weather Widget */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: '#9A9A8E',
                fontSize: '0.8125rem',
                position: 'relative',
              }} className="location-weather-wrapper">
                <MapPin size={14} strokeWidth={1.5} />
                {/* <span className="location-text" style={{ borderBottom: '2px dotted #B8B8AD', paddingBottom: '3px', cursor: 'pointer' }}>
                  {data.location}
                </span> */}
                <span className="location-text" style={{
                  backgroundImage: 'linear-gradient(to right, #C5C5BA 50%, transparent 50%)',
                  backgroundPosition: '0 100%',
                  backgroundRepeat: 'repeat-x',
                  backgroundSize: '6px 1px',
                  paddingBottom: '4px',
                  cursor: 'pointer',
                }}>
                  {data.location}
                </span>

                {/* Weather Widget Popup */}
                <div className="weather-widget" style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 'calc(100% + 12px)',
                  width: 155,
                  padding: '16px 18px',
                  background: 'linear-gradient(145deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)',
                  borderRadius: 20,
                  color: 'white',
                  opacity: 0,
                  visibility: 'hidden',
                  transform: 'translateY(8px)',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                }}>
                  <div style={{
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                    opacity: 0.95,
                  }}>TANGIER, MOROCCO</div>
                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 400,
                    opacity: 0.75,
                    marginBottom: 12,
                  }}>{currentTime || '3:52 pm'}</div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: 4,
                  }}>
                    <span style={{
                      fontSize: '3rem',
                      fontWeight: 300,
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}>{weather?.temp || '--'}</span>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: 300,
                      marginTop: '4px',
                    }}>°</span>
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    opacity: 0.9,
                    textTransform: 'capitalize',
                  }}>{weather?.condition || 'Sunny'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Selected Work ───────────────────────────── */}
      <section style={{ padding: '24px 0 100px' }}>
        <div className="page-container-wide">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'var(--color-ink)',
            marginBottom: 40,
            letterSpacing: '-0.02em',
          }}>
            Selected work
          </h2>

          {/* Asymmetric 2-column grid — alternates wide/narrow each row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(() => {
              const projects = data.work;
              const projectRows = [];
              for (let i = 0; i < projects.length; i += 2) {
                const pair = projects.slice(i, i + 2);
                const gridTemplateColumns = pair.length === 1 ? '1fr' : (i % 4 === 0 ? '5fr 7fr' : '7fr 5fr');
                
                projectRows.push(
                  <div key={i} style={{ display: 'grid', gridTemplateColumns, gap: 16 }}>
                    {pair.map((project) => {
                      const imgCount = project.images?.length ?? 0;
                      const imgClass = (idx) => {
                        if (imgCount === 1) return 'wc-img-wrap wc-img-single';
                        if (imgCount === 2) return `wc-img-wrap wc-img-solo-${idx}`;
                        return `wc-img-wrap wc-img-${idx}`;
                      };

                      return (
                        <Link 
                          key={project.id} 
                          to={`/work/${project.id}`} 
                          style={{ textDecoration: 'none' }}
                        >
                          <div
                            className={`work-card-v2 ${pair.length === 1 ? 'wc-full-width' : ''}`}
                            style={{ 
                              '--card-bg-hover': project.cardBgHover 
                            }}
                          >
                            <div className="wc-arrow">
                              <ArrowUpRight size={18} strokeWidth={1} />
                            </div>

                            {/* Header */}
                            <div className="wc-header">
                              <div className="wc-meta">
                                <span className="wc-category">{project.category}</span>
                                <span className="wc-sep">·</span>
                                <span className="wc-company">{project.company}</span>
                              </div>
                            </div>

                            {/* Headline */}
                            <h3 className="wc-headline">{project.headline}</h3>

                            {/* Cascading images */}
                            {imgCount > 0 && (
                              <div className="wc-images">
                                {project.images.map((src, idx) => (
                                  <div key={idx} className={imgClass(idx)}>
                                    <img src={src} alt={`${project.company} screenshot ${idx + 1}`} />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              }
              return projectRows;
            })()}
          </div>
        </div>
      </section>


      {/* ── Stack (Spec Sheet Style) ──────────────────────── */}
      <section className="stack-section">
        <div className="page-container-wide">
          <div className="stack-layout">
            {/* Header */}
            <div className="stack-header">
              <h2 className="stack-title">Stack</h2>
              <p className="stack-subtitle">Tools I reach for every day.</p>
              <p className="stack-description">
                A curated selection of technologies I’ve mastered and rely on to build production-grade applications.
              </p>
            </div>

            {/* Spec List */}
            <div className="stack-spec-list">
              {/* Row 1 */}
              <div className="stack-row">
                <div className="stack-row-lead">
                  <span className="stack-num">01</span>
                  <Layers size={24} strokeWidth={1.5} />
                </div>
                <div className="stack-row-content">
                  <h3 className="stack-row-title">Main Frameworks</h3>
                  <p className="stack-row-desc">The backbone of my application architecture.</p>
                </div>
                <div className="stack-row-tools">
                  <span className="stack-pill">React</span>
                  <span className="stack-pill">Next.js</span>
                  <span className="stack-pill">Laravel</span>
                </div>
              </div>

              {/* Row 2 */}
              <div className="stack-row">
                <div className="stack-row-lead">
                  <span className="stack-num">02</span>
                  <Layout size={24} strokeWidth={1.5} />
                </div>
                <div className="stack-row-content">
                  <h3 className="stack-row-title">Frontend & UI</h3>
                  <p className="stack-row-desc">Crafting fluid, responsive, and accessible interfaces.</p>
                </div>
                <div className="stack-row-tools">
                  <span className="stack-pill">TypeScript</span>
                  <span className="stack-pill">Tailwind CSS</span>
                  <span className="stack-pill">Framer Motion</span>
                  <span className="stack-pill">Alpine.js</span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="stack-row">
                <div className="stack-row-lead">
                  <span className="stack-num">03</span>
                  <Database size={24} strokeWidth={1.5} />
                </div>
                <div className="stack-row-content">
                  <h3 className="stack-row-title">Backend & Data</h3>
                  <p className="stack-row-desc">Scalable server logic and optimized database schemas.</p>
                </div>
                <div className="stack-row-tools">
                  <span className="stack-pill">Node.js</span>
                  <span className="stack-pill">PostgreSQL</span>
                  <span className="stack-pill">MySQL</span>
                  <span className="stack-pill">Rest API</span>
                </div>
              </div>

              {/* Row 4 */}
              <div className="stack-row">
                <div className="stack-row-lead">
                  <span className="stack-num">04</span>
                  <Server size={24} strokeWidth={1.5} />
                </div>
                <div className="stack-row-content">
                  <h3 className="stack-row-title">Infrastructure</h3>
                  <p className="stack-row-desc">Automated deployment pipelines and containerization.</p>
                </div>
                <div className="stack-row-tools">
                  <span className="stack-pill">Docker</span>
                  <span className="stack-pill">Vercel</span>
                  <span className="stack-pill">GitHub Actions</span>
                  <span className="stack-pill">Git</span>
                </div>
              </div>

              {/* Row 5 */}
              <div className="stack-row">
                <div className="stack-row-lead">
                  <span className="stack-num">05</span>
                  <PenTool size={24} strokeWidth={1.5} />
                </div>
                <div className="stack-row-content">
                  <h3 className="stack-row-title">Design & Planning</h3>
                  <p className="stack-row-desc">Systems thinking from wireframes to final handoff.</p>
                </div>
                <div className="stack-row-tools">
                  <span className="stack-pill">Figma</span>
                  <span className="stack-pill">Notion</span>
                </div>
              </div>

              {/* Row 6 */}
              <div className="stack-row">
                <div className="stack-row-lead">
                  <span className="stack-num">06</span>
                  <BarChart size={24} strokeWidth={1.5} />
                </div>
                <div className="stack-row-content">
                  <h3 className="stack-row-title">Analytics</h3>
                  <p className="stack-row-desc">Measuring performance and search visibility.</p>
                </div>
                <div className="stack-row-tools">
                  <span className="stack-pill">Google Analytics</span>
                  <span className="stack-pill">Google Search Console</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </div>
  );
};

export default HomePage;