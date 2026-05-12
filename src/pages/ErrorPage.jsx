import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, RefreshCcw } from 'lucide-react';

const ERROR_META = {
  400: {
    label: 'Client Error',
    title: "Bad Request",
    description:
      "The server couldn't understand this request. Double-check the URL or the data you sent.",
  },
  401: {
    label: 'Unauthorized',
    title: "Access Denied",
    description:
      "You don't have permission to view this resource. Please authenticate and try again.",
  },
  403: {
    label: 'Forbidden',
    title: "Forbidden",
    description:
      "You're not allowed to access this page. If this seems wrong, get in touch.",
  },
  404: {
    label: 'Page Not Found',
    title: "Nothing here.",
    description:
      "The page you're looking for doesn't exist, was moved, or never existed in the first place.",
  },
  500: {
    label: 'Server Error',
    title: "Something broke.",
    description:
      "An unexpected error occurred on our end. This has been noted — please try again in a moment.",
  },
  503: {
    label: 'Service Unavailable',
    title: "Back soon.",
    description:
      "The service is temporarily unavailable. We're working on it — please check back shortly.",
  },
};

// Resolve the closest known meta entry (400-class → 404, 500-class → 500)
const resolveMeta = (code) => {
  if (ERROR_META[code]) return { code, ...ERROR_META[code] };
  if (code >= 500) return { code, ...ERROR_META[500] };
  return { code, ...ERROR_META[404] };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * ErrorPage
 * @param {number}   code     - HTTP-like status code (400, 404, 500, …)
 * @param {boolean}  isReset  - when true, show a "Try again" button (for Error Boundaries)
 * @param {function} onReset  - callback to reset the error boundary
 */
const ErrorPage = ({ code = 404, isReset = false, onReset }) => {
  const navigate = useNavigate();
  const meta = resolveMeta(code);
  const is5xx = meta.code >= 500;

  // editorial: hide the chatbot on error pages for a cleaner, isolated look
  useEffect(() => {
    const hideChatbot = () => {
      const elements = document.querySelectorAll('iframe[src*="chirps.cc"], [id*="chirp"], .chirps-embed');
      elements.forEach(el => {
        if (el) el.style.display = 'none';
      });
    };

    hideChatbot();
    // Chirps might load late, so we check again after a short delay
    const timer = setTimeout(hideChatbot, 1000);
    const observer = new MutationObserver(hideChatbot);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      // Restore visibility when leaving error page
      const elements = document.querySelectorAll('iframe[src*="chirps.cc"], [id*="chirp"], .chirps-embed');
      elements.forEach(el => {
        if (el) el.style.display = '';
      });
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA' }}>
      {/* ── Decorative accent line at top ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #E85D2F 0%, #FF9472 60%, transparent 100%)',
          zIndex: 9999,
        }}
      />

      <motion.div
        className="page-container-wide"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          paddingTop: 'clamp(100px, 18vh, 180px)',
          paddingBottom: 80,
        }}
      >
        {/* ── Error code (huge display) ── */}
        <motion.div variants={itemVariants} style={{ marginBottom: 32 }}>
          <span
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(6rem, 18vw, 14rem)',
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: '-0.06em',
              color: '#E85D2F',
              display: 'block',
              userSelect: 'none',
            }}
          >
            {meta.code}
          </span>
        </motion.div>

        {/* ── Divider ── */}
        <motion.hr
          variants={itemVariants}
          style={{
            border: 'none',
            borderTop: '1px solid #E4E4DC',
            marginBottom: 40,
            maxWidth: 540,
          }}
        />

        {/* ── Label + title ── */}
        <motion.div variants={itemVariants} style={{ marginBottom: 16 }}>
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9A9A8E',
              display: 'block',
              marginBottom: 12,
            }}
          >
            {meta.label}
          </span>
          <h1
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#111111',
              margin: 0,
              maxWidth: 540,
            }}
          >
            {meta.title}
          </h1>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: '1rem',
            lineHeight: 1.65,
            color: '#555555',
            maxWidth: 480,
            margin: '0 0 48px',
          }}
        >
          {meta.description}
        </motion.p>

        {/* ── Action buttons ── */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
        >
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
          >
            <motion.span
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#1A1A1A',
                color: '#FFFFFF',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 500,
                padding: '11px 22px',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
            >
              <Home size={14} strokeWidth={2} />
              Go Home
            </motion.span>
          </Link>

          {isReset && onReset ? (
            <motion.button
              onClick={onReset}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                color: '#5C5C5C',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 500,
                padding: '10px 20px',
                borderRadius: 8,
                border: '1px solid #DCDCD4',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <RefreshCcw size={14} strokeWidth={2} />
              Try Again
            </motion.button>
          ) : (
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                color: '#5C5C5C',
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 500,
                padding: '10px 20px',
                borderRadius: 8,
                border: '1px solid #DCDCD4',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Go Back
            </motion.button>
          )}
        </motion.div>

        {/* ── Bottom status hint ── */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: 'auto',
            paddingTop: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#E85D2F',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '0.75rem',
              color: '#9A9A8E',
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
          >
            {is5xx
              ? 'The service encountered an internal error.'
              : 'All systems are professional.'}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
