import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const roles = ['Full Stack Developer', 'Python Developer'];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const metrics = [
  { value: '9.4', label: 'CGPA' },
  { value: '91.49%', label: 'Diploma Score' },
  { value: '3+', label: 'Major Projects' },
  { value: '7 Weeks', label: 'Training' },
];

const socials = [
  { icon: <Github size={18} />, href: 'https://github.com/Yogeshwari7887', label: 'GitHub', tooltip: 'GitHub' },
  { icon: <Linkedin size={18} />, href: 'https://linkedin.com', label: 'LinkedIn', tooltip: 'LinkedIn' },
  { icon: <Mail size={18} />, href: 'mailto:yogeshwari7887@gmail.com', label: 'Email', tooltip: 'yogeshwari7887@gmail.com' },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMagnetic = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMagneticLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  const scrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <motion.div className="hero-left" initial="hidden" animate="visible">
            <motion.div className="hero-tag" custom={0} variants={fadeUp}>
              <span className="dot" />
              Full Stack Developer
            </motion.div>

            <motion.h1 className="hero-name" custom={1} variants={fadeUp}>
              Yogeshwari<br />
              <span className="accent">Kalaskar</span>
            </motion.h1>

            <motion.div className="hero-roles" custom={2} variants={fadeUp}>
              <span className="separator" />
              <motion.span
                className="role-text"
                key={roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                {roles[roleIndex]}
              </motion.span>
            </motion.div>

            <motion.p className="hero-statement" custom={3} variants={fadeUp}>
              Building scalable web applications and intelligent software solutions
              through clean architecture, modern technologies, and continuous learning.
            </motion.p>

            <motion.div className="hero-buttons" custom={4} variants={fadeUp}>
              <a
                href="/resume.pdf"
                className="btn btn-primary"
                download="Yogeshwari_Kalaskar_Resume.pdf"
                onMouseMove={handleMagnetic}
                onMouseLeave={handleMagneticLeave}
              >
                <Download size={16} /> Download Resume
              </a>
              <a
                href="#projects"
                className="btn btn-secondary"
                onClick={scrollToProjects}
                onMouseMove={handleMagnetic}
                onMouseLeave={handleMagneticLeave}
              >
                View Projects <ArrowRight size={16} />
              </a>
            </motion.div>

            <motion.div className="hero-socials" custom={5} variants={fadeUp}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="social-icon"
                  aria-label={s.label}
                  data-tooltip={s.tooltip}
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="hero-image-wrapper">
              <div className="hero-image-frame">
                <img 
                  src="/me.jpeg" 
                  alt="Yogeshwari Kalaskar" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://ui-avatars.com/api/?name=Yogeshwari+Kalaskar&background=162325&color=5FA8A8&size=512';
                  }}
                />
                <div className="hero-image-glow" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-metrics"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
        >
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              className="metric-card"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
