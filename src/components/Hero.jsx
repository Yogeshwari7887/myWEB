import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowDown, Github, Linkedin } from 'lucide-react';

/* ── Data ── */
const roles = ['Full Stack Developer', 'Python Developer', 'Software Developer', 'Problem Solver'];

const metrics = [
  { value: '9.4', label: 'CGPA' },
  { value: '91.49%', label: 'Diploma' },
  { value: '3+', label: 'Projects' },
  { value: '7 Wks', label: 'Training' },
];

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const techIcons = [
  { name: 'Python', icon: `${DEVICON}/python/python-original.svg`, angle: -55, dist: 230 },
  { name: 'Django', icon: `${DEVICON}/django/django-plain.svg`, angle: -20, dist: 250, invert: true },
  { name: 'MySQL', icon: `${DEVICON}/mysql/mysql-original.svg`, angle: 15, dist: 240 },
  { name: 'Git', icon: `${DEVICON}/git/git-original.svg`, angle: 50, dist: 235 },
  { name: 'GitHub', icon: `${DEVICON}/github/github-original.svg`, angle: 85, dist: 250, invert: true },
  { name: 'HTML5', icon: `${DEVICON}/html5/html5-original.svg`, angle: 120, dist: 240 },
  { name: 'CSS3', icon: `${DEVICON}/css3/css3-original.svg`, angle: 155, dist: 235 },
  { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg`, angle: 190, dist: 245 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

/* ── Particles Canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const rafRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth <= 640 ? 25 : 50;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        /* mouse parallax */
        const dx = (mouseRef.current.x - canvas.width / 2) * 0.02;
        const dy = (mouseRef.current.y - canvas.height / 2) * 0.02;

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x + dx, p.y + dy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(95,168,168,0.18)';
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />;
}

/* ── Floating Tech Icon ── */
function FloatingIcon({ icon, angle, dist, invert, name }) {
  const [hovered, setHovered] = useState(false);
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * dist;
  const y = Math.sin(rad) * dist;
  const floatDuration = 3 + Math.random() * 2;
  const floatDelay = Math.random() * -5;

  return (
    <div
      className={`hero-float-icon ${hovered ? 'hovered' : ''}`}
      style={{
        '--fx': `${x}px`,
        '--fy': `${y}px`,
        '--float-dur': `${floatDuration}s`,
        '--float-delay': `${floatDelay}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={icon}
        alt={name}
        className={invert ? 'invert-icon' : ''}
        loading="lazy"
        width="32"
        height="32"
      />
      {hovered && <span className="hero-float-tooltip">{name}</span>}
    </div>
  );
}

/* ── Main Hero ── */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrollOp, setScrollOp] = useState(1);
  const imageWrapRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* Scroll-fade for indicator */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollOp(y < 60 ? 1 : y < 140 ? 1 - (y - 60) / 80 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Image parallax */
  const handleMouse = useCallback((e) => {
    if (!imageWrapRef.current) return;
    const rect = imageWrapRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) * 0.015;
    const y = (e.clientY - cy) * 0.015;
    imageWrapRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [handleMouse]);

  return (
    <section className="hero" id="home">
      {/* Z-layer backgrounds */}
      <div className="hero-glow hero-glow-left" aria-hidden="true" />
      <div className="hero-glow hero-glow-right" aria-hidden="true" />
      <ParticleCanvas />

      <div className="container">
        <div className="hero-grid">
          {/* ── Left Column ── */}
          <motion.div className="hero-left" initial="hidden" animate="visible">
            {/* Eyebrow */}
            <motion.div className="hero-eyebrow" custom={0} variants={fadeUp}>
              <span className="hero-eyebrow-line" />
              HELLO, I'M
            </motion.div>

            {/* Name */}
            <motion.h1 className="hero-name" custom={1} variants={fadeUp}>
              Yogeshwari
              <span className="hero-name-last">Kalaskar</span>
            </motion.h1>

            {/* Role */}
            <motion.div className="hero-role-line" custom={2} variants={fadeUp}>
              <span className="hero-role-pipe">|</span>
              <div className="hero-role-slot">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    className="hero-role-text"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p className="hero-tagline" custom={3} variants={fadeUp}>
              Building scalable web applications and intelligent software solutions
              through clean architecture, modern technologies, and continuous learning.
            </motion.p>

            {/* Buttons */}
            <motion.div className="hero-buttons" custom={4} variants={fadeUp}>
              <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                View Projects
              </a>
              <a href="/resume.pdf" download="Yogeshwari_Kalaskar_Resume.pdf" className="btn btn-secondary" aria-label="Download Resume">
                <Download size={15} /> Download Resume
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div className="hero-socials" custom={5} variants={fadeUp}>
              <a href="https://github.com/Yogeshwari7887" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </motion.div>

            {/* Metric Cards */}
            <motion.div className="hero-metrics" custom={6} variants={fadeUp}>
              {metrics.map((m, i) => (
                <div key={i} className="hero-metric-card">
                  <span className="hero-metric-value">{m.value}</span>
                  <span className="hero-metric-label">{m.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right Column ── */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="hero-image-orbit">
              {/* Floating Icons */}
              {techIcons.map((t) => (
                <FloatingIcon key={t.name} {...t} />
              ))}

              {/* Image Frame */}
              <div className="hero-image-outer" ref={imageWrapRef}>
                <div className="hero-image-frame">
                  <img
                    src="/me.jpeg"
                    alt="Yogeshwari Kalaskar"
                    loading="eager"
                    fetchpriority="high"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://ui-avatars.com/api/?name=Yogeshwari+Kalaskar&background=162325&color=5FA8A8&size=512';
                    }}
                  />
                  <div className="hero-image-overlay" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator" style={{ opacity: scrollOp }} aria-hidden="true">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-dot" />
        </div>
        <span className="hero-scroll-label">Explore Portfolio</span>
      </div>
    </section>
  );
}
