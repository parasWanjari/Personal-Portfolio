import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SplashScreen } from './components/SplashScreen';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { SkillsAndEducation } from './components/SkillsAndEducation';
import { Footer } from './components/Footer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white/20 selection:text-white font-sans">
      <AnimatedBackground />
      
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <div key="content">
            <Navigation />
            <main>
              <Hero />
              <Experience />
              <Projects />
              <Achievements />
              <SkillsAndEducation />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
