import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Layers } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const projects = [
  {
    title: 'AI Smart Traffic Management',
    summary: 'Intelligent traffic control using YOLOv8 computer vision for detecting emergency vehicles with 92% accuracy and dynamic signal management.',
    image: '/project1.png',
    tech: ['YOLOv8', 'Python', 'Flask', 'React', 'CV'],
    github: 'https://github.com/Yogeshwari7887',
    fullDescription: 'Built an intelligent traffic control system using YOLOv8 computer vision capable of detecting emergency vehicles from CCTV footage with 92% accuracy.',
    problem: 'Emergency vehicles often lose valuable time due to conventional traffic systems that cannot dynamically adapt to urgent situations.',
    solution: 'Implemented emergency vehicle detection and dynamic signal synchronization to automatically create green corridors for faster emergency response.',
    features: ['Emergency Vehicle Detection', 'YOLOv8 Integration', 'Real-Time Monitoring', 'Signal Synchronization', 'Green Corridor Generation', 'Dashboard Visualization'],
    impact: [
      { value: '92%', label: 'Detection Accuracy' },
      { value: '40%', label: 'Faster Response' },
    ],
  },
  {
    title: 'GrowPure — Organic E-Commerce',
    summary: 'Full-stack organic e-commerce platform with authentication, cart management, coupons, admin dashboard, and order tracking.',
    image: '/project2.png',
    tech: ['Django', 'Python', 'JavaScript', 'Bootstrap', 'MySQL'],
    github: 'https://github.com/Yogeshwari7887',
    fullDescription: 'Developed a full-stack organic e-commerce platform focused on user experience, scalability, and real-world business workflows.',
    features: ['Authentication', 'Shopping Cart', 'Coupons & Discounts', 'Wishlist', 'User Dashboard', 'Admin Dashboard', 'Order Tracking', 'Responsive Design'],
    highlight: 'Demonstrates full-stack development skills, database integration, user management, and business workflow implementation.',
  },
  {
    title: 'YourHearingEar — Counseling Platform',
    summary: 'A platform focused on empathetic communication and supportive user interaction with structured guidance.',
    image: '/project3.png',
    tech: ['Django', 'Python', 'JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Yogeshwari7887',
    fullDescription: 'Designed and developed a platform focused on empathetic communication and supportive user interaction.',
    features: ['Structured Guidance', 'Ethical Interaction Design', 'User-Centric Experience', 'Conversational Support'],
    highlight: 'Creating meaningful and responsible digital interactions focused on empathy and user well-being.',
  },
  {
    title: '2048 Puzzle Game',
    summary: 'Fully functional 2048 puzzle game for Android with swipe controls, score tracking, and smooth gameplay experience.',
    image: '/project4.png',
    tech: ['Java', 'Android Studio', 'XML'],
    github: 'https://github.com/Yogeshwari7887',
    fullDescription: 'Developed a fully functional 2048 puzzle game for Android using Java and Android Studio. Implemented tile merging mechanics, score tracking, responsive game logic, and smooth gameplay experience.',
    features: ['Swipe Controls', 'Dynamic Tile Generation', 'Score Tracking', 'Win/Loss Detection', 'Smooth Animations', 'Mobile Optimized UI'],
    highlight: 'Strengthened understanding of Android development, event handling, UI design, and game logic implementation.',
  },
];

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <div className="modal-header">
          <h3 className="modal-title">{project.title}</h3>
          <div className="modal-tech">
            {project.tech.map((t) => (<span key={t} className="modal-tech-badge">{t}</span>))}
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <h4 className="modal-label">Overview</h4>
            <p className="modal-text">{project.fullDescription}</p>
          </div>
          {project.problem && (
            <div className="modal-grid">
              <div className="modal-section">
                <h4 className="modal-label">Problem</h4>
                <p className="modal-text">{project.problem}</p>
              </div>
              <div className="modal-section">
                <h4 className="modal-label">Solution</h4>
                <p className="modal-text">{project.solution}</p>
              </div>
            </div>
          )}
          <div className="modal-section">
            <h4 className="modal-label">Key Features</h4>
            <div className="modal-features">
              {project.features.map((f) => (<span key={f} className="modal-feature">{f}</span>))}
            </div>
          </div>
          {project.impact && (
            <div className="modal-section">
              <h4 className="modal-label">Impact</h4>
              <div className="modal-impact">
                {project.impact.map((imp, i) => (
                  <div key={i} className="modal-impact-card">
                    <span className="modal-impact-value">{imp.value}</span>
                    <span className="modal-impact-label">{imp.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {project.highlight && (
            <div className="modal-highlight"><p>{project.highlight}</p></div>
          )}
        </div>
        <div className="modal-footer">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <Github size={15} /> GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="pcard">
        <div className="pcard-image">
          {!imgError ? (
            <img src={project.image} alt={project.title} onError={() => setImgError(true)} loading="lazy" />
          ) : (
            <div className="pcard-image-placeholder"><Layers size={32} /></div>
          )}
          <div className="pcard-image-overlay" />
        </div>
        <div className="pcard-content">
          <h3 className="pcard-title">{project.title}</h3>
          <p className="pcard-summary">{project.summary}</p>
          <div className="pcard-tech">
            {project.tech.map((t) => (<span key={t} className="pcard-badge">{t}</span>))}
          </div>
          <div className="pcard-actions">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary pcard-btn">
              <Github size={14} /> GitHub
            </a>
            <button className="btn btn-primary pcard-btn" onClick={() => setModalOpen(true)}>Details</button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {modalOpen && <ProjectModal project={project} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function Projects() {
  const [ref, isVisible] = useScrollReveal(0.05);

  return (
    <section className="projects" id="projects">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Projects</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>Selected Work</h2>
          <p className="section-subtitle" style={{ fontSize: '15px' }}>
            A selection of projects showcasing my experience in full-stack development, AI, and problem-solving.
          </p>
        </motion.div>
        <motion.div
          className="projects-grid"
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
