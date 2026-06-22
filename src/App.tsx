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
import ContactSection from './components/ContactSection';
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
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased overflow-x-hidden selection:bg-teal-500/30 selection:text-white relative ${
      theme === 'dark' 
        ? 'bg-[#090a0f] text-slate-300' 
        : 'bg-[#fafbfe] text-slate-700'
    }`}>
      
      {/* Designer background: Clean, fine architectural grid lines and organic feel */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        {/* Crisp designer hairline grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808004_1px,transparent_1px),linear-gradient(to_bottom,#80808004_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Subtle, natural, ultra-faint warm ambient shadow center (gives depth but no tech-neon look) */}
        <div className={`absolute top-[-300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[140px] opacity-40 transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-indigo-950/15' 
            : 'bg-amber-100/25'
        }`} />
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

      {/* CONTACT SECTION Component */}
      <ContactSection 
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
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            id="back-to-top-floating"
            className={`fixed bottom-6 right-6 p-3 rounded-full shadow-2xl border transition-all cursor-pointer z-50 focus:outline-none ${
              theme === 'dark'
                ? 'bg-slate-900/90 backdrop-blur-md border-white/10 text-teal-400 hover:text-teal-300 hover:border-teal-500/30'
                : 'bg-white/90 backdrop-blur-md border-slate-200 text-teal-500 hover:text-teal-600 hover:border-teal-400'
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
