import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const coreStack = [
  { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'] },
  { label: 'Backend', items: ['Python', 'Django', 'PHP'] },
  { label: 'Database', items: ['MySQL', 'MongoDB'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'VS Code'] },
];

const categories = [
  {
    id: 'languages',
    name: 'Programming Languages',
    skills: [
      { name: 'Python', icon: `${DEVICON}/python/python-original.svg`, desc: 'Backend development, automation, AI, and problem-solving.', featured: true },
      { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg`, desc: 'Dynamic web interfaces and interactive frontend logic.' },
      { name: 'PHP', icon: `${DEVICON}/php/php-original.svg`, desc: 'Server-side scripting for web applications.', featured: true },
      { name: 'Java', icon: `${DEVICON}/java/java-original.svg`, desc: 'Object-oriented programming and enterprise applications.' },
      { name: 'C', icon: `${DEVICON}/c/c-original.svg`, desc: 'Systems programming and low-level development.' },
      { name: 'C++', icon: `${DEVICON}/cplusplus/cplusplus-original.svg`, desc: 'Advanced programming with OOP fundamentals.' },
      { name: 'SQL', icon: `${DEVICON}/azuresqldatabase/azuresqldatabase-original.svg`, desc: 'Database querying and data manipulation.' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    skills: [
      { name: 'HTML5', icon: `${DEVICON}/html5/html5-original.svg`, desc: 'Semantic markup and accessible web structure.', featured: true },
      { name: 'CSS3', icon: `${DEVICON}/css3/css3-original.svg`, desc: 'Styling, layouts, animations, and responsive design.', featured: true },
      { name: 'Bootstrap', icon: `${DEVICON}/bootstrap/bootstrap-original.svg`, desc: 'Responsive UI framework for rapid prototyping.' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    skills: [
      { name: 'Django', icon: `${DEVICON}/django/django-plain.svg`, desc: 'Full-featured Python web framework for scalable apps.', featured: true },
    ],
  },
  {
    id: 'databases',
    name: 'Databases',
    skills: [
      { name: 'MySQL', icon: `${DEVICON}/mysql/mysql-original.svg`, desc: 'Relational database for full-stack applications.', featured: true },
      { name: 'MongoDB', icon: `${DEVICON}/mongodb/mongodb-original.svg`, desc: 'NoSQL document database for flexible data models.' },
    ],
  },
  {
    id: 'tools',
    name: 'Tools & Platforms',
    skills: [
      { name: 'Git', icon: `${DEVICON}/git/git-original.svg`, desc: 'Version control and collaborative development.' },
      { name: 'GitHub', icon: `${DEVICON}/github/github-original.svg`, desc: 'Code hosting, collaboration, and CI/CD.', invert: true },
      { name: 'VS Code', icon: `${DEVICON}/vscode/vscode-original.svg`, desc: 'Primary code editor with extensions ecosystem.' },
      { name: 'Android Studio', icon: `${DEVICON}/androidstudio/androidstudio-original.svg`, desc: 'Mobile application development environment.' },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Skills() {
  const [ref, isVisible] = useScrollReveal(0.05);
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section className="skills" id="skills">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Technical Skills</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Tools & Technologies
          </h2>
          <p className="section-subtitle" style={{ fontSize: '15px' }}>
            Technologies and tools I use to design, build, and deploy modern software solutions.
          </p>
        </motion.div>

        {/* Core Stack Summary */}
        <motion.div
          className="stack-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="stack-summary-title">Core Stack</div>
          <div className="stack-summary-grid">
            {coreStack.map((group) => (
              <div key={group.label} className="stack-group">
                <span className="stack-group-label">{group.label}</span>
                <span className="stack-group-items">
                  {group.items.join(' • ')}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skill Categories */}
        <div className="skills-categories">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.id}
              className={`skill-cat ${activeCategory && activeCategory !== cat.id ? 'dimmed' : ''}`}
              onMouseEnter={() => setActiveCategory(cat.id)}
              onMouseLeave={() => setActiveCategory(null)}
              initial={{ opacity: 0, y: 25 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + catIdx * 0.08 }}
            >
              <h3 className="skill-cat-name">{cat.name}</h3>
              <div className="skill-cat-grid">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className={`scard ${skill.featured ? 'scard-featured' : ''}`}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                  >
                    <div className="scard-icon">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className={skill.invert ? 'invert-icon' : ''}
                        loading="lazy"
                      />
                    </div>
                    <div className="scard-info">
                      <h4 className="scard-name">{skill.name}</h4>
                      <p className="scard-desc">{skill.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
