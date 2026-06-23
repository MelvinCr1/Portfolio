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
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased overflow-x-hidden selection:bg-[#00bd95]/15 selection:text-[#00bd95] relative ${
      theme === 'dark' 
        ? 'bg-[#090a0c] text-neutral-400' 
        : 'bg-[#FAF9F5] text-neutral-800'
    }`}>
      
      {/* Minimal clean background layout - Custom meteorological-isobar airflow outlines representing high-altitude clouds */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto h-full px-6 relative">
          {/* Subtle vertical structural boundaries */}
          <div className={`absolute top-0 bottom-0 left-6 w-[1px] transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-900/40' : 'bg-neutral-200/40'}`} />
          <div className={`absolute top-0 bottom-0 right-6 w-[1px] transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-900/40' : 'bg-neutral-200/40'}`} />
        </div>

        {/* Abstract highly professional technical "Cloud Airflow / Isobar" lines */}
        <svg className="absolute right-0 top-12 w-[600px] h-[500px] opacity-25 dark:opacity-[0.12] transition-opacity pointer-events-none" viewBox="0 0 400 400" fill="none">
          <path d="M50 150 C 120 110, 220 220, 350 130" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="0.5" strokeDasharray="4 4" />
          <path d="M80 180 C 140 130, 240 250, 380 160" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1" />
          <path d="M110 210 C 160 160, 260 280, 410 190" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="0.5" />
          {/* Faint cloud shape circles */}
          <circle cx="280" cy="180" r="110" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="0.5" strokeDasharray="8 8" opacity="0.5" />
          <circle cx="340" cy="140" r="70" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="0.5" opacity="0.3" />
        </svg>

        <svg className="absolute left-[-100px] top-[45%] w-[500px] h-[500px] opacity-[0.18] dark:opacity-[0.08] transition-opacity pointer-events-none" viewBox="0 0 400 400" fill="none">
          <path d="M0 220 C 100 180, 180 320, 300 240" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1" />
          <path d="M10 250 C 110 210, 190 350, 310 270" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="100" cy="260" r="90" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="0.5" opacity="0.4" />
        </svg>
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
                ? 'bg-[#0f1115] border-neutral-800 text-[#00bd95] hover:text-[#2ae3c0] hover:border-neutral-700'
                : 'bg-white border-neutral-200 text-[#008f70] hover:text-[#00aa85] hover:border-neutral-300 shadow-xs'
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
