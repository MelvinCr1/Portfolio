import { useState, useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { Language, TranslationSet } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  currentTranslation: TranslationSet;
}

export default function Header({
  language,
  setLanguage,
  theme,
  setTheme,
  currentTranslation
}: HeaderProps) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen]);

  const flags: Record<Language, { flag: ReactNode; label: string }> = {
    FR: {
      flag: (
        <svg className="w-5 h-3.5 rounded shadow-sm border border-white/10 shrink-0 inline-block align-middle" viewBox="0 0 3 2">
          <rect width="1" height="2" fill="#002395" />
          <rect x="1" width="1" height="2" fill="#FFFFFF" />
          <rect x="2" width="1" height="2" fill="#ED2939" />
        </svg>
      ),
      label: 'Français'
    },
    EN: {
      flag: (
        <svg className="w-5 h-3.5 rounded shadow-sm border border-white/10 shrink-0 inline-block align-middle" viewBox="0 0 500 300">
          <rect width="500" height="300" fill="#012169" />
          <path d="M0,0 L500,300 M500,0 L0,300" stroke="#FFFFFF" strokeWidth="60" />
          <path d="M0,0 L500,300 M500,0 L0,300" stroke="#C8102E" strokeWidth="40" />
          <path d="M250,0 L250,300 M0,150 L500,150" stroke="#FFFFFF" strokeWidth="100" />
          <path d="M250,0 L250,300 M0,150 L500,150" stroke="#C8102E" strokeWidth="60" />
        </svg>
      ),
      label: 'English'
    },
    ES: {
      flag: (
        <svg className="w-5 h-3.5 rounded shadow-sm border border-white/10 shrink-0 inline-block align-middle" viewBox="0 0 3 2">
          <rect width="3" height="2" fill="#C60B1E" />
          <rect y="0.5" width="3" height="1" fill="#F1BF00" />
          <path d="M0.75,0.7 L0.75,1.3 M0.95,0.7 L0.95,1.3 M0.75,0.9 L0.95,0.9" stroke="#C60B1E" strokeWidth="0.08" />
        </svg>
      ),
      label: 'Español'
    }
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 border-b ${
      theme === 'dark'
        ? 'bg-[#090a0c]/85 border-neutral-900/60'
        : 'bg-[#FAF9F5]/85 border-neutral-200/50'
    }`}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
        


        {/* Nav menu links */}
        <nav className={`hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider transition-colors ${
          theme === 'dark' ? 'text-neutral-500' : 'text-neutral-600'
        }`}>
          <a href="#cv-section" className={`transition-colors py-1 relative group ${
            theme === 'dark' ? 'hover:text-neutral-200' : 'hover:text-neutral-950'
          }`}>
            {currentTranslation.navCV}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cb9b51] group-hover:w-full transition-all duration-350" />
          </a>
          <a href="#projects-section" className={`transition-colors py-1 relative group ${
            theme === 'dark' ? 'hover:text-neutral-200' : 'hover:text-neutral-950'
          }`}>
            {currentTranslation.navProjects}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#cb9b51] group-hover:w-full transition-all duration-350" />
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme Switcher Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer flex items-center justify-center ${
              theme === 'dark' 
                ? 'bg-neutral-950/60 border-neutral-900 text-[#cb9b51] hover:text-[#e5bf7e] hover:bg-neutral-900/40' 
                : 'bg-white border-neutral-200 text-[#cb9b51] hover:text-[#af8b61] hover:bg-neutral-100/30'
            }`}
            title={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            id="theme-toggler"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </motion.button>

          {/* Premium dropdown language selector */}
          <motion.div 
            ref={langMenuRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative font-mono"
            id="language-selector"
          >
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className={`flex items-center gap-2 border px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer select-none ${
                theme === 'dark'
                  ? 'bg-neutral-950 border-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-800'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50'
              }`}
            >
              <span className="text-sm leading-none">{flags[language].flag}</span>
              <span>{language}</span>
              <span className={`text-[8px] opacity-60 transition-transform duration-200 inline-block ${langMenuOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangMenuOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-36 border rounded-lg shadow-lg p-1 z-50 overflow-hidden ${
                      theme === 'dark'
                        ? 'bg-neutral-900 border-neutral-800'
                        : 'bg-white border-neutral-200'
                    }`}
                  >
                    {(['FR', 'EN', 'ES'] as Language[]).map((lng) => (
                      <button
                        key={lng}
                        onClick={() => {
                          setLanguage(lng);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono text-left rounded-md transition-all cursor-pointer ${
                          language === lng 
                            ? 'bg-neutral-500/10 text-[#cb9b51] font-bold' 
                            : theme === 'dark'
                              ? 'text-neutral-400 hover:text-white hover:bg-neutral-950/40'
                              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="text-sm leading-none">{flags[lng].flag}</span>
                        <span>{flags[lng].label}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </header>
  );
}
