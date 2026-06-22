import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Language } from './types';
import { translations } from './translations';

// Import modular sub-components
import Header from './components/Header';
import Hero from './components/Hero';
import TimelineSection from './components/TimelineSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('FR');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      // Automatical matching of the visitor's preferred system colorscheme
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return systemPrefersDark ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const currentTranslation = translations[language];

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased overflow-x-hidden selection:bg-neutral-500/20 selection:text-[#cb9b51] relative ${
      theme === 'dark' 
        ? 'bg-[#090a0c] text-neutral-400' 
        : 'bg-[#FAF9F5] text-neutral-800'
    }`}>
      
      {/* Minimal clean background layout, completely free of generic AI-style glowing gradient blobs and gridded meshes */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Delicate artistic touch: very fine custom decorative vertical margins */}
        <div className="max-w-5xl mx-auto h-full px-6 relative">
          <div className={`absolute top-0 bottom-0 left-0 w-[1px] transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-900/40' : 'bg-neutral-200/40'}`} />
          <div className={`absolute top-0 bottom-0 right-0 w-[1px] transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-900/40' : 'bg-neutral-200/40'}`} />
        </div>
      </div>

      {/* HEADER Component */}
      <Header 
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        currentTranslation={currentTranslation}
      />

      {/* HERO SECTION Component */}
      <Hero 
        theme={theme}
        currentTranslation={currentTranslation}
      />

      {/* TIMELINE SECTION Component */}
      <TimelineSection 
        theme={theme}
        language={language}
        currentTranslation={currentTranslation}
      />

      {/* PROJECTS SECTION Component */}
      <ProjectsSection 
        theme={theme}
        language={language}
        currentTranslation={currentTranslation}
      />

      {/* FOOTER Component */}
      <Footer theme={theme} />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            id="back-to-top-floating"
            className={`fixed bottom-8 right-8 p-3.5 rounded-lg border transition-all cursor-pointer z-50 focus:outline-none ${
              theme === 'dark'
                ? 'bg-neutral-900 border-neutral-800 text-[#cb9b51] hover:text-[#e5bf7e] hover:border-neutral-700'
                : 'bg-white border-neutral-200 text-[#cb9b51] hover:text-[#af8b61] hover:border-neutral-300 shadow-sm'
            }`}
            aria-label="Retour en haut"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
