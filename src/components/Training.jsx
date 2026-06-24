import { motion } from 'framer-motion';
import { Briefcase, Award, CheckCircle, ExternalLink, Code2, Calendar } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const techStack = ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Git', 'GitHub'];

const keyLearnings = [
  'Full Stack Web Development',
  'Django Application Development',
  'Responsive UI Development',
  'Version Control Using Git',
  'GitHub Collaboration',
  'Modern Development Workflow',
  'Backend Integration',
  'Project Structure & Best Practices',
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const badgeStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};
const badgePop = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Training() {
  const [ref, isVisible] = useScrollReveal(0.06);

  return (
    <section className="training" id="experience">
      <div className="container" ref={ref}>
        {/* ── Section Header ── */}
        <motion.div
          className="training-header-area"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Experience</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Industry Training Experience
          </h2>
          <p className="section-subtitle" style={{ fontSize: '15px' }}>
            Practical exposure to professional development workflows, modern technologies, and real-world software development practices.
          </p>
        </motion.div>

        {/* ── Main Showcase Card ── */}
        <motion.div
          className="exp-showcase"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {/* Gradient Top Accent */}
          <div className="exp-showcase-accent" />

          {/* ── Company Header ── */}
          <div className="exp-company-header">
            <div className="exp-company-icon">
              <Briefcase size={24} />
            </div>
            <div className="exp-company-info">
              <h3 className="exp-company-name">Passion Software Solutions Pvt. Ltd.</h3>
              <p className="exp-company-role">
                <Code2 size={14} />
                Full Stack Python Trainee
              </p>
            </div>
            <div className="exp-duration-badge">
              <Calendar size={14} />
              <span>7 Weeks</span>
            </div>
          </div>

          <div className="exp-showcase-divider" />

          {/* ── Technology Stack ── */}
          <div className="exp-block">
            <h4 className="exp-block-title">Technology Stack</h4>
            <motion.div
              className="exp-tech-badges"
              variants={badgeStagger}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
            >
              {techStack.map((tech) => (
                <motion.span key={tech} className="exp-tech-badge" variants={badgePop}>
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="exp-showcase-divider" />

          {/* ── Key Learnings ── */}
          <div className="exp-block">
            <h4 className="exp-block-title">Key Learnings</h4>
            <motion.div
              className="exp-learnings-grid"
              variants={stagger}
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
            >
              {keyLearnings.map((item) => (
                <motion.div key={item} className="exp-learning-item" variants={fadeUp}>
                  <div className="exp-check-icon">
                    <CheckCircle size={16} />
                  </div>
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="exp-showcase-divider" />

          {/* ── Training Outcome ── */}
          <div className="exp-outcome-card">
            <div className="exp-outcome-header">
              <Award size={20} />
              <span>Training Outcome</span>
            </div>
            <p className="exp-outcome-text">
              Successfully completed intensive industry-oriented training focused on full-stack Python development,
              web application architecture, and collaborative development practices.
            </p>
          </div>

          <div className="exp-showcase-divider" />

          {/* ── Certificate Area ── */}
          <div className="exp-certificate">
            <div className="exp-cert-visual">
              <div className="exp-cert-icon-wrap">
                <Award size={40} />
              </div>
              <div className="exp-cert-text">
                <span className="exp-cert-title">Training Certificate</span>
                <span className="exp-cert-subtitle">Passion Software Solutions Pvt. Ltd.</span>
              </div>
            </div>
            <a href="#" className="btn btn-secondary exp-cert-btn">
              <ExternalLink size={14} /> View Certificate
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
