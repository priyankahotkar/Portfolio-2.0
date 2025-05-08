import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Education from './components/sections/Education';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Accomplishments from './components/sections/Accomplishments';
import Contact from './components/sections/Contact';
import Certifications from './components/sections/Certifications';

function App() {
  useEffect(() => {
    // Update page title
    document.title = "Priyanka Hotkar | CSE Student & Full Stack Developer";
  }, []);

  return (
    <ThemeProvider>
      <Layout>
        <Hero />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Accomplishments />
        <Certifications />
        <Contact />
      </Layout>
    </ThemeProvider>
  );
}

export default App;