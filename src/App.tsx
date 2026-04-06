import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Header from './components/Header';
import Hero from './sections/Hero';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import TechStack from './sections/TechStack';
import Achievements from './sections/Achievements';
import InternationalExperience from './sections/InternationalExperience';
import Footer from './components/Footer';
import SnowBackground from './components/SnowBackground';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: false,
      normalizeScroll: false,
    });

    (window as any).__smoother = smoother;

    return () => {
      smoother.kill();
      delete (window as any).__smoother;
    };
  }, []);

  return (
    <>
      {/* position: fixed elements go outside the wrapper */}
      <SnowBackground />
      <Header />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="w-full flex flex-col items-center relative" style={{ zIndex: 1 }}>
            <Hero />

            {/* Espaçador entre Hero e Experience */}
            <div className="h-20 md:h-32" />

            <Experience />

            {/* Espaçador entre Experience e InternationalExperience */}
            <div className="h-20 md:h-32" />

            <InternationalExperience />

            {/* Espaçador entre InternationalExperience e TechStack */}
            <div className="h-20 md:h-32" />

            <TechStack />

            {/* Espaçador entre TechStack e Projects */}
            <div className="h-20 md:h-32" />

            <Projects />

            {/* Espaçador entre Projects e Achievements */}
            <div className="h-20 md:h-32" />

            <Achievements />

            {/* Espaçador entre Achievements e Contact */}
            <div className="h-20 md:h-32" />

            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
