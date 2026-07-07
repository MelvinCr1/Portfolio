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
      
      {/* Minimal clean background layout - Beautiful minimalist cloud outline sketches */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto h-full px-6 relative">
          {/* Subtle vertical structural boundaries */}
          <div className={`absolute top-0 bottom-0 left-6 w-[1px] transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-900/40' : 'bg-neutral-200/40'}`} />
          <div className={`absolute top-0 bottom-0 right-6 w-[1px] transition-colors duration-300 ${theme === 'dark' ? 'bg-neutral-900/40' : 'bg-neutral-200/40'}`} />
        </div>

        {/* Elegant organic minimalist cloud drawings - Animate floating slowly and softly */}
        <motion.div
          className="absolute right-[-100px] top-12 pointer-events-none"
          animate={{
            x: [0, 15, -15, 0],
            y: [0, -10, 8, 0],
            rotate: [0, 0.8, -0.8, 0]
          }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-[650px] h-[450px] opacity-[0.15] dark:opacity-[0.05] transition-opacity" viewBox="0 0 500 350" fill="none">
            <path d="M150 240 C150 210, 180 180, 220 180 C230 180, 240 183, 250 188 C265 165, 295 150, 330 150 C380 150, 420 190, 420 240 C420 242, 420 245, 419 247 C435 255, 445 272, 445 290 C445 318, 422 340, 395 340 L175 340 C145 340, 120 315, 120 285 C120 263, 133 245, 150 240 Z" 
              stroke={theme === 'dark' ? '#00bd95' : '#008f70'} 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path d="M280 130 C280 110, 300 90, 325 90 C331 90, 337 92, 343 95 C352 80, 372 70, 395 70 C428 70, 455 97, 455 130 C455 131, 455 133, 455 134 C465 140, 472 151, 472 163 C472 182, 456 197, 438 197 L296 197 C276 197, 260 181, 260 161 C260 146, 269 134, 280 130 Z" 
              stroke={theme === 'dark' ? '#00bd95' : '#008f70'} 
              strokeWidth="0.8" 
              opacity="0.5"
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute left-[-150px] top-[40%] pointer-events-none"
          animate={{
            x: [0, -18, 12, 0],
            y: [0, 8, -12, 0],
            rotate: [0, -1, 1, 0]
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg className="w-[550px] h-[400px] opacity-[0.12] dark:opacity-[0.04] transition-opacity" viewBox="0 0 500 350" fill="none">
            <path d="M100 210 C100 185, 122 160, 155 160 C163 160, 171 162, 179 166 C190 145, 215 130, 245 130 C285 130, 320 165, 320 210 C320 212, 320 214, 320 216 C333 223, 342 238, 342 254 C342 279, 322 300, 297 300 L120 300 C95 300, 75 278, 75 250 C75 230, 85 214, 100 210 Z" 
              stroke={theme === 'dark' ? '#00bd95' : '#008f70'} 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </motion.div>
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
      <Footer theme={theme} currentTranslation={currentTranslation} />

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
