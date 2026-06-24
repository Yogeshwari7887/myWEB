import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowDown, Github, Linkedin, Sparkles, Code, Server, Database, Layers } from 'lucide-react';

/* ── Data ── */
const roles = ['Full Stack Developer', 'Python Developer', 'Software Developer', 'Problem Solver'];

const metrics = [
  { value: '9.4', label: 'CGPA', icon: <Sparkles size={14} /> },
  { value: '91.49%', label: 'Diploma', icon: <Code size={14} /> },
  { value: '8+', label: 'Projects', icon: <Layers size={14} /> },
  { value: '7 Wks', label: 'Training', icon: <Server size={14} /> },
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

    const count = window.innerWidth <= 640 ? 30 : 60;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: 0.1 + Math.random() * 0.2,
    }));

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(95,168,168,${0.06 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
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
        ctx.fillStyle = `rgba(95,168,168,${p.opacity})`;
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
  const rotation = Math.random() * 360;

  return (
    <div
      className={`hero-float-icon ${hovered ? 'hovered' : ''}`}
      style={{
        '--fx': `${x}px`,
        '--fy': `${y}px`,
        '--float-dur': `${floatDuration}s`,
        '--float-delay': `${floatDelay}s`,
        '--rotation': `${rotation}deg`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="float-icon-wrapper">
        <img
          src={icon}
          alt={name}
          className={invert ? 'invert-icon' : ''}
          loading="lazy"
          width="34"
          height="34"
        />
        <div className="float-icon-glow" />
      </div>
      {hovered && <span className="hero-float-tooltip">{name}</span>}
    </div>
  );
}

/* ── Main Hero ── */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrollOp, setScrollOp] = useState(1);
  const imageWrapRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollOp(y < 60 ? 1 : y < 140 ? 1 - (y - 60) / 80 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouse = useCallback((e) => {
    if (!imageWrapRef.current) return;
    const rect = imageWrapRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) * 0.02;
    const y = (e.clientY - cy) * 0.02;
    imageWrapRef.current.style.transform = `translate(${x}px, ${y}px)`;
    setMousePosition({ x: e.clientX, y: e.clientY });
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
      <div className="hero-glow hero-glow-center" aria-hidden="true" />
      <ParticleCanvas />

      <div className="container">
        <div className="hero-grid">
          {/* ── Left Column ── */}
          <motion.div className="hero-left" initial="hidden" animate="visible">
            {/* Eyebrow */}
            <motion.div className="hero-eyebrow" custom={0} variants={fadeUp}>
              <span className="hero-eyebrow-line" />
              <span className="hero-eyebrow-text">Welcome to my portfolio</span>
              <span className="hero-eyebrow-dot" />
            </motion.div>

            {/* Name */}
            <motion.h1 className="hero-name" custom={1} variants={fadeUp}>
              <span className="hero-name-first">Yogeshwari</span>
              <span className="hero-name-last">Kalaskar</span>
            </motion.h1>

            {/* Role */}
            <motion.div className="hero-role-line" custom={2} variants={fadeUp}>
              <span className="hero-role-pipe">✦</span>
              <div className="hero-role-slot">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    className="hero-role-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="hero-role-cursor">|</span>
            </motion.div>

            {/* Tagline */}
            <motion.p className="hero-tagline" custom={3} variants={fadeUp}>
              Building scalable web applications and intelligent software solutions
              through clean architecture, modern technologies, and continuous learning.
            </motion.p>

            {/* Buttons */}
            <motion.div className="hero-buttons" custom={4} variants={fadeUp}>
              <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <Sparkles size={15} /> Explore My Work
              </a>
              <a href="/resume.pdf" download="Yogeshwari_Kalaskar_Resume.pdf" className="btn btn-secondary" aria-label="Download Resume">
                <Download size={15} /> Resume
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div className="hero-socials" custom={5} variants={fadeUp}>
              <a href="https://github.com/Yogeshwari7887" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="www.linkedin.com/in/yogeshwari-kalaskar-2724182b2" target="_blank" rel="noopener noreferrer" className="hero-social-icon" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:yogeshwari@email.com" className="hero-social-icon" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </a>
            </motion.div>


          </motion.div>

          {/* ── Right Column ── */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.9 }}
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
                  <div className="hero-image-glow-ring" />
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
                  <div className="hero-image-border" />
                </div>
              </div>

              {/* Decorative rings */}
              <div className="orbit-ring ring-1" />
              <div className="orbit-ring ring-2" />
              <div className="orbit-ring ring-3" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator" style={{ opacity: scrollOp }} aria-hidden="true">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-dot" />
        </div>
        <span className="hero-scroll-label">Scroll to explore</span>
        <ArrowDown size={14} className="scroll-arrow" />
      </div>
    </section>
  );
}