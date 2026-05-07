import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { translations } from '../i18n/translations.js';

const RESET_DELAY = 8000; // 8 seconds

const ContactCTA = () => {
  const { language, data } = useLanguage();
  const t = translations[language].contact;
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus]   = useState('idle'); // 'idle' | 'success'
  const [countdown, setCountdown] = useState(8);
  const timerRef  = useRef(null);
  const countRef  = useRef(null);

  /* ── Cleanup on unmount */
  useEffect(() => () => {
    clearTimeout(timerRef.current);
    clearInterval(countRef.current);
  }, []);

  /* ── Validate a single field */
  const validateField = (name, value) => {
    if (!value.trim()) return t.validation.required;
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return t.validation.email;
    return '';
  };

  /* ── Validate all fields and return errors object */
  const validateAll = () => {
    const next = {};
    Object.keys(form).forEach((k) => {
      const err = validateField(k, form[k]);
      if (err) next[k] = err;
    });
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (touched[name]) {
      setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    setErrors((p) => ({ ...p, [name]: validateField(name, value) }));
    setFocused(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    const errs = validateAll();
    setErrors(errs);
    if (Object.keys(errs).some((k) => errs[k])) return; // block submit

    /* Fire mailto */
    const subject = encodeURIComponent(`${t.emailSubject} ${form.name}`);
    const body    = encodeURIComponent(
      `${t.nameLabel}: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;

    /* Show success + countdown */
    setStatus('success');
    setCountdown(8);

    countRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countRef.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    timerRef.current = setTimeout(() => {
      setForm({ name: '', email: '', message: '' });
      setErrors({});
      setTouched({});
      setStatus('idle');
      setCountdown(8);
    }, RESET_DELAY);
  };

  const fieldState = (name) => {
    const hasError  = touched[name] && errors[name];
    const isFocused = focused === name;
    const isFilled  = Boolean(form[name]);
    let cls = 'cta-field';
    if (isFocused) cls += ' cta-field--focused';
    if (isFilled)  cls += ' cta-field--filled';
    if (hasError)  cls += ' cta-field--error';
    return cls;
  };

  return (
    <section id="contact" className="cta-section">
      <div className="page-container-wide">
        <div className="cta-card">

          {/* ── Top row */}
          <div className="cta-top-row">
            <div className="cta-text-block">
              <h2 className="cta-title">
                {t.title}<span className="accent-dot" />
              </h2>
              <p className="cta-body">
                {t.body}
              </p>
              <div className="cta-socials">
                <a href="tel:077130601" className="cta-social-link">
                  {/* Phone SVG */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  {t.phone}
                </a>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="cta-social-link">
                  {/* LinkedIn SVG */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="cta-social-link">
                  {/* GitHub SVG */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="cta-divider" />

          {/* ── Success state */}
          {status === 'success' ? (
            <div className="cta-success">
              <div className="cta-success-icon-wrap">
                <CheckCircle size={26} strokeWidth={1.5} />
              </div>
              <p className="cta-success-title">{t.successTitle}</p>
              <p className="cta-success-body">
                {t.successBody}
              </p>
              <div className="cta-countdown-bar-wrap">
                <div
                  className="cta-countdown-bar"
                  style={{ animationDuration: `${RESET_DELAY}ms` }}
                />
              </div>
              <p className="cta-countdown-label">
                {t.formResets.replace('{n}', countdown)}
              </p>
            </div>
          ) : (

            /* ── Form */
            <form className="cta-form" onSubmit={handleSubmit} noValidate>
              <div className="cta-form-row">

                {/* Name */}
                <div className={fieldState('name')}>
                  <label className="cta-label" htmlFor="cf-name">{t.nameLabel}</label>
                  <input
                    id="cf-name" name="name" type="text" autoComplete="name"
                    className="cta-input"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={handleBlur}
                    placeholder={t.namePlaceholder}
                  />
                  {touched.name && errors.name && (
                    <span className="cta-error-msg">
                      <AlertCircle size={11} strokeWidth={2} /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className={fieldState('email')}>
                  <label className="cta-label" htmlFor="cf-email">{t.emailLabel}</label>
                  <input
                    id="cf-email" name="email" type="email" autoComplete="email"
                    className="cta-input"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={handleBlur}
                    placeholder={t.emailPlaceholder}
                  />
                  {touched.email && errors.email && (
                    <span className="cta-error-msg">
                      <AlertCircle size={11} strokeWidth={2} /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className={`${fieldState('message')} cta-field--full`}>
                <label className="cta-label" htmlFor="cf-message">{t.messageLabel}</label>
                <textarea
                  id="cf-message" name="message"
                  rows={5}
                  className="cta-input cta-textarea"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={handleBlur}
                  placeholder={t.messagePlaceholder}
                />
                {touched.message && errors.message && (
                  <span className="cta-error-msg">
                    <AlertCircle size={11} strokeWidth={2} /> {errors.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <div className="cta-form-footer">
                <button type="submit" className="cta-send-btn">
                  <span>{t.sendButton}</span>
                  <Send size={14} strokeWidth={2} />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
