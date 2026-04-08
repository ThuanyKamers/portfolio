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

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <SnowBackground />
      <Header />

      <main className="w-full flex flex-col items-center relative" style={{ zIndex: 1 }}>
        <Hero />
        <div className="h-20 md:h-32" />
        <Experience />
        <div className="h-20 md:h-32" />
        <InternationalExperience />
        <div className="h-20 md:h-32" />
        <TechStack />
        <div className="h-20 md:h-32" />
        <Projects />
        <div className="h-20 md:h-32" />
        <Achievements />
        <div className="h-20 md:h-32" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
