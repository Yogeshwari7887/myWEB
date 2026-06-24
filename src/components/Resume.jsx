import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Download, Eye, Sparkles } from 'lucide-react';

const highlights = [
  { value: '9.4', label: 'CGPA' },
  { value: '91.49%', label: 'Diploma Score' },
  { value: '3+', label: 'Major Projects' },
  { value: '7 Weeks', label: 'Industry Training' },
  { value: 'Full Stack', label: 'Python & Django' },
];

const paragraphs = [
  'I am a B.Tech Information Technology student at Vishwakarma Institute of Technology, Pune, with a strong academic background and practical experience in full-stack development and software engineering.',
  'After securing 91.49% in Diploma Computer Engineering, I continued my academic journey while actively building real-world projects, completing industry training, and strengthening my expertise in modern web technologies.',
  'My interests include full-stack development, backend engineering, database systems, and AI-powered applications that solve meaningful real-world problems.',
  'I continuously focus on improving my technical skills through hands-on development, project-based learning, and exploring modern software engineering practices.',
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Resume() {
  const [ref, isVisible] = useScrollReveal(0.06);

  return (
    <section className="profile-section" id="resume">
      <div className="container" ref={ref}>
        {/* ── Section Header ── */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Profile Overview</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            About Me
          </h2>
          <p className="section-subtitle" style={{ fontSize: '15px' }}>
            A snapshot of my academic journey, technical expertise, and passion for building impactful software solutions.
          </p>
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <div className="profile-grid">
          {/* Left Column — Statement + Resume Actions */}
          <motion.div
            className="profile-statement-col"
            variants={fadeLeft}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <div className="profile-statement-card">
              <div className="profile-statement-accent" />
              <Sparkles size={20} className="profile-statement-icon" />
              <blockquote className="profile-statement">
                Building modern software solutions through full-stack development, problem&nbsp;solving, and continuous learning.
              </blockquote>
            </div>

            <div className="profile-resume-actions">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary" aria-label="View Resume in new tab">
                <Eye size={16} /> View Resume
              </a>
              <a href="/resume.pdf" download="Yogeshwari_Kalaskar_Resume.pdf" className="btn btn-secondary" aria-label="Download Resume">
                <Download size={16} /> Download
              </a>
            </div>
          </motion.div>

          {/* Right Column — Bio */}
          <motion.div
            className="profile-bio-col"
            variants={fadeRight}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="profile-paragraph">{p}</p>
            ))}
          </motion.div>
        </div>

        {/* ── Highlight Cards ── */}
        <motion.div
          className="profile-highlights"
          variants={stagger}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {highlights.map((h, i) => (
            <motion.div key={i} className="profile-hl-card" variants={fadeUp}>
              <span className="profile-hl-value">{h.value}</span>
              <span className="profile-hl-label">{h.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
