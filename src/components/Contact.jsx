import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Github, Linkedin, MapPin, Send, CheckCircle, AlertCircle,
  Loader2, Sparkles, ArrowRight, User, MessageCircle, Phone,
  Globe, Twitter, Instagram, Youtube, Camera, Coffee
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ━━━ EmailJS Configuration ━━━
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactInfo = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'yogeshwari7887@gmail.com',
    href: 'mailto:yogeshwari7887@gmail.com',
    color: '#5fa8a8'
  },
  {
    icon: <Github size={18} />,
    label: 'GitHub',
    value: 'github.com/Yogeshwari7887',
    href: 'https://github.com/Yogeshwari7887',
    color: '#f0c987'
  },
  {
    icon: <Linkedin size={18} />,
    label: 'LinkedIn',
    value: 'Yogeshwari Kalaskar',
    href: 'https://linkedin.com/in/yogeshwari-kalaskar-2724182b2',
    color: '#0a66c2'
  },
  {
    icon: <MapPin size={18} />,
    label: 'Location',
    value: 'Pune, Maharashtra',
    href: null,
    color: '#10b981'
  },
];

const socialLinks = [
  { icon: <Github size={18} />, href: 'https://github.com/Yogeshwari7887', label: 'GitHub' },
  { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/yogeshwari-kalaskar-2724182b2', label: 'LinkedIn' },
  { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
  { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
  { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
];

const openTo = [
  { label: 'Internships', icon: '💼' },
  { label: 'Learning Opportunities', icon: '📚' },
  { label: 'Collaborations', icon: '🤝' },
  { label: 'Software Development', icon: '💻' },
  { label: 'Open Source', icon: '🌟' },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Contact() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.from_name.trim()) errs.from_name = 'Name is required';
    if (!formData.from_email.trim()) errs.from_email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email))
      errs.from_email = 'Invalid email format';
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('loading');
    const toastId = toast.loading('Sending your message...');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      toast.success('Message sent successfully! 🎉', { id: toastId });
      setFormData({ from_name: '', from_email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      toast.error('Failed to send. Please try again.', { id: toastId });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container" ref={ref}>
        {/* ── Section Header ── */}
        <motion.div
          className="contact-header"
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <span className="section-tag">
            <Sparkles size={14} />
            Get in Touch
          </span>
          <h2>Let's Connect</h2>
          <p>
            Open to opportunities, collaborations, and meaningful conversations.
          </p>
        </motion.div>

        {/* ── Contact Grid ── */}
        <motion.div
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {/* Left — Info Card */}
          <motion.div className="contact-info-card" variants={itemVariants}>
            <div className="info-card-glow" />

            <div className="info-card-header">
              <div className="info-card-icon">
                <MessageCircle size={24} />
              </div>
              <h3>Let's Talk</h3>
            </div>

            <p className="contact-info-message">
              I'm always excited to discuss internships, software development opportunities,
              collaborations, and innovative ideas. Let's build something amazing together!
            </p>

            {/* Contact Links */}
            <div className="contact-links">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  className="contact-link-row"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="contact-link-icon" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <div className="contact-link-info">
                    <span className="contact-link-label">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="contact-link-value"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-link-value">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Open To */}
            <div className="contact-open-to">
              <span className="contact-open-to-label">
                <Sparkles size={14} />
                Currently Open To
              </span>
              <div className="contact-open-to-tags">
                {openTo.map((tag) => (
                  <motion.span
                    key={tag.label}
                    className="open-to-tag"
                    whileHover={{
                      y: -2,
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <span className="tag-icon">{tag.icon}</span>
                    {tag.label}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="info-socials">
              <span className="socials-label">Find me on</span>
              <div className="socials-grid">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-social-link"
                    whileHover={{
                      y: -3,
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    aria-label={social.label}
                  >
                    {social.icon}
                    <span className="social-tooltip">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div className="contact-form-card" variants={itemVariants}>
            <div className="form-card-glow" />

            <div className="form-header">
              <h4>Send me a message</h4>
              <p>I'll get back to you within 24 hours</p>
            </div>

            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              {/* Name & Email Row */}
              <div className="form-row">
                <div className="form-group">
                  <div className="floating-field">
                    <input
                      className={`form-input ${errors.from_name ? 'form-error' : ''}`}
                      type="text"
                      id="from_name"
                      name="from_name"
                      placeholder=" "
                      value={formData.from_name}
                      onChange={handleChange}
                    />
                    <label className="floating-label" htmlFor="from_name">
                      <User size={14} />
                      Your Name
                    </label>
                  </div>
                  <AnimatePresence>
                    {errors.from_name && (
                      <motion.span
                        className="field-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        {errors.from_name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="form-group">
                  <div className="floating-field">
                    <input
                      className={`form-input ${errors.from_email ? 'form-error' : ''}`}
                      type="email"
                      id="from_email"
                      name="from_email"
                      placeholder=" "
                      value={formData.from_email}
                      onChange={handleChange}
                    />
                    <label className="floating-label" htmlFor="from_email">
                      <Mail size={14} />
                      Email Address
                    </label>
                  </div>
                  <AnimatePresence>
                    {errors.from_email && (
                      <motion.span
                        className="field-error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        {errors.from_email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <div className="floating-field">
                  <input
                    className={`form-input ${errors.subject ? 'form-error' : ''}`}
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder=" "
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <label className="floating-label" htmlFor="subject">
                    <MessageCircle size={14} />
                    Subject
                  </label>
                </div>
                <AnimatePresence>
                  {errors.subject && (
                    <motion.span
                      className="field-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {errors.subject}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div className="form-group">
                <div className="floating-field">
                  <textarea
                    className={`form-textarea ${errors.message ? 'form-error' : ''}`}
                    id="message"
                    name="message"
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                  />
                  <label className="floating-label" htmlFor="message">
                    <MessageCircle size={14} />
                    Your Message
                  </label>
                </div>
                <AnimatePresence>
                  {errors.message && (
                    <motion.span
                      className="field-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      {errors.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="contact-submit-btn"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="spin-icon" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={18} />
                    Sent Successfully!
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={18} />
                    Failed, Try Again
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                    <ArrowRight size={16} className="btn-arrow" />
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    className="form-status success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <CheckCircle size={14} />
                    Thank you for reaching out. Your message has been sent successfully.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    className="form-status error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <AlertCircle size={14} />
                    Something went wrong. Please try again or email directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}