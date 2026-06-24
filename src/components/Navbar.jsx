import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home', icon: '🏠' },
  { name: 'About', href: '#about', icon: '👤' },
  { name: 'Education', href: '#education', icon: '🎓' },
  { name: 'Projects', href: '#projects', icon: '💻' },
  { name: 'Contact', href: '#contact', icon: '✉️' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active link based on scroll position
      const sections = navLinks.map(link => ({
        id: link.href.replace('#', ''),
        element: document.getElementById(link.href.replace('#', ''))
      }));

      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        if (section.element) {
          const { offsetTop, offsetHeight } = section.element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section.id.charAt(0).toUpperCase() + section.id.slice(1));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Logo */}
          <a href="#home" className="nav-logo">
            <div className="logo-icon">YK</div>
            <span className="logo-text">
              Yogeshwari<span>.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={activeLink === link.name ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
                <span className="link-counter">
                  {link.name === 'Home' ? '01' :
                    link.name === 'About' ? '02' :
                      link.name === 'Education' ? '03' :
                        link.name === 'Projects' ? '04' : '05'}
                </span>
              </a>
            ))}
            <a href="#contact" className="nav-cta">
              <span>Let's Connect</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div
            className={`nav-toggle ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu open"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mobile-header">
              <span className="mobile-logo">YK</span>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }}
              >
                <span className="mobile-link-icon">
                  <span style={{ fontSize: '14px' }}>{link.icon}</span>
                </span>
                {link.name}
                <span className="mobile-link-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            ))}

            <div className="mobile-divider" />

            <a href="#contact" className="mobile-cta" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              setIsOpen(false);
            }}>
              Let's Connect <ArrowRight size={16} style={{ display: 'inline', marginLeft: '8px' }} />
            </a>

            <div className="mobile-socials">
              <a href="https://github.com/Yogeshwari7887" target="_blank" rel="noopener noreferrer">
                <Github size={16} />
              </a>
              <a href="www.linkedin.com/in/yogeshwari-kalaskar-2724182b2" target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} />
              </a>
              <a href="mailto:yogeshwari@email.com">
                <Mail size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}