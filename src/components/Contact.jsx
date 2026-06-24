import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ━━━ EmailJS Configuration ━━━
// Read credentials from environment variables (import.meta.env for Vite)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const contactInfo = [
  { icon: <Mail size={18} />, label: 'Email', value: 'yogeshwari7887@gmail.com', href: 'mailto:yogeshwari7887@gmail.com' },
  { icon: <Github size={18} />, label: 'GitHub', value: 'github.com/Yogeshwari7887', href: 'https://github.com/Yogeshwari7887' },
  { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'LinkedIn Profile', href: 'https://linkedin.com' },
  { icon: <MapPin size={18} />, label: 'Location', value: 'Pune, Maharashtra', href: null },
];

const openTo = ['Internships', 'Learning Opportunities', 'Collaborations', 'Software Development Projects'];

export default function Contact() {
  const [ref, isVisible] = useScrollReveal(0.1);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ from_name: '', from_email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.from_name.trim()) errs.from_name = 'Name is required';
    if (!formData.from_email.trim()) errs.from_email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) errs.from_email = 'Invalid email format';
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
    const toastId = toast.loading('Sending...');
    
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      toast.success('Message sent successfully.', { id: toastId });
      setFormData({ from_name: '', from_email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      toast.error('Failed to send message. Please try again later.', { id: toastId });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Contact</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>Let's Connect</h2>
          <p className="section-subtitle" style={{ fontSize: '15px' }}>
            Open to opportunities, collaborations, and meaningful conversations.
          </p>
        </motion.div>

        <motion.div
          className="contact-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Left — Info Card */}
          <div className="contact-info-card">
            <h3 className="contact-info-heading">Let's Connect</h3>
            <p className="contact-info-message">
              I am always open to discussing internships, software development opportunities,
              collaborations, and innovative ideas.
            </p>

            <div className="contact-links">
              {contactInfo.map((item) => (
                <div key={item.label} className="contact-link-row">
                  <span className="contact-link-icon">{item.icon}</span>
                  <div className="contact-link-info">
                    <span className="contact-link-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="contact-link-value">
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-link-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-open-to">
              <span className="contact-open-to-label">Currently Open To</span>
              <div className="contact-open-to-tags">
                {openTo.map((tag) => (<span key={tag} className="open-to-tag">{tag}</span>))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-form-card">
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <div className="floating-field">
                    <input className={`form-input ${errors.from_name ? 'form-error' : ''}`} type="text" id="from_name" name="from_name" placeholder=" " value={formData.from_name} onChange={handleChange} />
                    <label className="floating-label" htmlFor="from_name">Name</label>
                  </div>
                  {errors.from_name && <span className="field-error">{errors.from_name}</span>}
                </div>
                <div className="form-group">
                  <div className="floating-field">
                    <input className={`form-input ${errors.from_email ? 'form-error' : ''}`} type="email" id="from_email" name="from_email" placeholder=" " value={formData.from_email} onChange={handleChange} />
                    <label className="floating-label" htmlFor="from_email">Email</label>
                  </div>
                  {errors.from_email && <span className="field-error">{errors.from_email}</span>}
                </div>
              </div>

              <div className="form-group">
                <div className="floating-field">
                  <input className={`form-input ${errors.subject ? 'form-error' : ''}`} type="text" id="subject" name="subject" placeholder=" " value={formData.subject} onChange={handleChange} />
                  <label className="floating-label" htmlFor="subject">Subject</label>
                </div>
                {errors.subject && <span className="field-error">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <div className="floating-field">
                  <textarea className={`form-textarea ${errors.message ? 'form-error' : ''}`} id="message" name="message" placeholder=" " value={formData.message} onChange={handleChange} />
                  <label className="floating-label" htmlFor="message">Message</label>
                </div>
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'loading'}>
                {status === 'loading' ? (<><Loader2 size={16} className="spin-icon" /> Sending...</>) :
                 status === 'success' ? (<><CheckCircle size={16} /> Sent Successfully!</>) :
                 status === 'error' ? (<><AlertCircle size={16} /> Failed, Try Again</>) :
                 (<><Send size={16} /> Send Message</>)}
              </button>

              {status === 'success' && (
                <p className="form-status success">Thank you for reaching out. Your message has been sent successfully.</p>
              )}
              {status === 'error' && (
                <p className="form-status error">Something went wrong. Please try again or email directly.</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
