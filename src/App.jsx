import { useEffect } from 'react';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';
import './styles/sections.css';
import './styles/components.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Training from './components/Training';
import Certifications from './components/Certifications';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#162325',
            color: '#F5F7F7',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px',
            fontSize: '14px',
            fontFamily: 'Inter, system-ui, sans-serif',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#5FA8A8',
              secondary: '#162325',
            },
          },
          error: {
            iconTheme: {
              primary: '#e05555',
              secondary: '#162325',
            },
          },
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <hr className="section-divider" />
        <Education />
        <hr className="section-divider" />
        <Skills />
        <hr className="section-divider" />
        <Projects />
        <hr className="section-divider" />
        <Training />
        <hr className="section-divider" />
        <Certifications />
        <hr className="section-divider" />
        <Resume />
        <hr className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
