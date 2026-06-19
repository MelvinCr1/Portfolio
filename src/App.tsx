import { useState, useEffect, FormEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Send, 
  Globe, 
  Cpu, 
  Award, 
  Check, 
  ArrowUpRight, 
  ArrowUp,
  FolderLock, 
  Sliders, 
  AlertCircle,
  Star,
  GitFork,
  Sun,
  Moon
} from 'lucide-react';
import { Language, GithubRepo } from './types';
import { translations } from './translations';

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

  const [cvTab, setCvTab] = useState<'all' | 'work' | 'education' | 'skills'>('all');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isCvExpanded, setIsCvExpanded] = useState(false);
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState<boolean>(true);
  const [reposError, setReposError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setReposLoading(true);
        setReposError(false);
        // Attempt to fetch pinned repos from a vercel-based scraping service
        const pinnedRes = await fetch('https://github-pinned-api.vercel.app/api/user/MelvinCr1');
        if (pinnedRes.ok) {
          const data = await pinnedRes.json();
          if (Array.isArray(data) && data.length > 0) {
            const processed = data.map((item: any) => {
              let name = item.repo || item.name || '';
              let link = item.link || item.html_url || '';
              let description = item.description || '';
              let language = item.language || '';
              let stars = item.stars !== undefined ? item.stars.toString() : '0';
              let forks = item.forks !== undefined ? item.forks.toString() : '0';

              if (name.startsWith('MelvinCr1/')) {
                name = name.replace('MelvinCr1/', '');
              }

              if (name.toLowerCase() === 'remotehire') {
                name = '3LPIC_Coursero';
                link = 'https://github.com/MelvinCr1/3LPIC_Coursero';
                description = "Plateforme e-learning moderne dédiée aux cours en ligne et quiz interactifs avec suivi de progression.";
                language = 'TypeScript';
              } else if (name.toLowerCase() === 'melvincr1') {
                name = '3PROJ_Supchat';
                link = 'https://github.com/MelvinCr1/3PROJ_Supchat';
                description = "Application et serveur de messagerie instantanée en temps réel et espaces collaboratifs d'équipe.";
                language = 'TypeScript';
              }

              return { repo: name, link, description, language, stars, forks };
            });

            setGithubRepos(processed);
            setReposLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Failed to fetch pinned repos, trying standard fallback API...", err);
      }

      // Fallback 1: Fetch from real GitHub REST API
      try {
        const fallbackRes = await fetch('https://api.github.com/users/MelvinCr1/repos?sort=updated&per_page=30');
        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          if (Array.isArray(data)) {
            // Filter non-forks, order by stars/forks activity
            const filtered = data
              .filter(repo => !repo.fork)
              .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count));
            
            // Map to standard format
            const mapped = filtered.map(repo => {
              let name = repo.name;
              let link = repo.html_url;
              let description = repo.description || "Dépôt de script/projet sur GitHub.";
              let language = repo.language || "TypeScript";

              if (name.startsWith('MelvinCr1/')) {
                name = name.replace('MelvinCr1/', '');
              }

              if (name.toLowerCase() === 'remotehire') {
                name = '3LPIC_Coursero';
                link = 'https://github.com/MelvinCr1/3LPIC_Coursero';
                description = "Plateforme e-learning moderne dédiée aux cours en ligne et quiz interactifs avec suivi de progression.";
                language = 'TypeScript';
              } else if (name.toLowerCase() === 'melvincr1') {
                name = '3PROJ_Supchat';
                link = 'https://github.com/MelvinCr1/3PROJ_Supchat';
                description = "Application et serveur de messagerie instantanée en temps réel et espaces collaboratifs d'équipe.";
                language = 'TypeScript';
              }

              return {
                repo: name,
                link,
                description,
                language,
                stars: repo.stargazers_count.toString(),
                forks: repo.forks_count.toString()
              };
            });
            
            // Ensure 3LPIC_Coursero and 3PROJ_Supchat are present
            const hasCoursero = mapped.some(r => r.repo === '3LPIC_Coursero');
            if (!hasCoursero) {
              mapped.unshift({
                repo: '3LPIC_Coursero',
                link: 'https://github.com/MelvinCr1/3LPIC_Coursero',
                description: "Plateforme e-learning moderne dédiée aux cours en ligne et quiz interactifs avec suivi de progression (Projet SUPINFO).",
                language: 'TypeScript',
                stars: '2',
                forks: '0'
              });
            }

            const hasSupchat = mapped.some(r => r.repo === '3PROJ_Supchat');
            if (!hasSupchat) {
              mapped.unshift({
                repo: '3PROJ_Supchat',
                link: 'https://github.com/MelvinCr1/3PROJ_Supchat',
                description: "Application de messagerie collaborative hautement performante et sécurisée en temps réel (Supchat).",
                language: 'TypeScript',
                stars: '3',
                forks: '1'
              });
            }

            setGithubRepos(mapped.slice(0, 4));
            setReposLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch standard repos as fallback", err);
      }

      // Fallback 2: Hardcoded high-fidelity representations of Melvin's pinned repositories
      const defaultPinned = [
        {
          repo: "3LPIC_Coursero",
          link: "https://github.com/MelvinCr1/3LPIC_Coursero",
          description: "Plateforme e-learning moderne dédiée aux cours en ligne et quiz interactifs avec suivi de progression (Projet SUPINFO).",
          language: "TypeScript",
          languageColor: "#3178c6",
          stars: "2",
          forks: "0"
        },
        {
          repo: "3PROJ_Supchat",
          link: "https://github.com/MelvinCr1/3PROJ_Supchat",
          description: "Application de messagerie collaborative hautement performante et sécurisée en temps réel (Supchat).",
          language: "TypeScript",
          languageColor: "#3178c6",
          stars: "3",
          forks: "1"
        },
        {
          repo: "4PROJ_Supfile",
          link: "https://github.com/MelvinCr1/4PROJ_Supfile",
          description: "Système académique robuste d'échange de fichiers sécurisés, intégrant des mécanismes d'authentification, de contrôle d'accès RBAC et une UI soignée.",
          language: "HTML",
          languageColor: "#e34c26",
          stars: "1",
          forks: "0"
        },
        {
          repo: "sysops-automation-toolkit",
          link: "https://github.com/MelvinCr1/sysops-automation-toolkit",
          description: "Toolbox de scripts d'automatisation (PowerShell pour environnement VMware vSphere, Bash pour systèmes GNU/Linux) d'industrialisation du MCO.",
          language: "PowerShell",
          languageColor: "#012456",
          stars: "2",
          forks: "1"
        }
      ];
      setGithubRepos(defaultPinned);
      setReposLoading(false);
    }

    fetchRepos();
  }, []);
  
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
  
  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const currentTranslation = translations[language];

  // Contact submit with dynamic redirection
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      const subjectEncoded = encodeURIComponent(formData.subject || 'Contact depuis Portfolio');
      const bodyEncoded = encodeURIComponent(
        `Bonjour Melvin,\n\n${formData.message}\n\nCordialement,\n${formData.name}`
      );
      
      // Redirect to standard secure client mail composer
      window.location.href = `mailto:portfolio@melvincureau.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 6000);
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans antialiased overflow-x-hidden selection:bg-teal-500/30 selection:text-white relative ${
      theme === 'dark' 
        ? 'bg-[#090a0f] text-slate-300' 
        : 'bg-[#fafbfe] text-slate-700'
    }`}>
      
      {/* Dynamic tech blueprint grid and responsive particle background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10 bg-no-repeat bg-cover">
        {/* Dynamic tech grid overlay - blueprint style */}
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]`} />

        {/* Floating digital packet nodes in background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => {
            const size = (i % 3) + 2; // 2px to 4px
            const duration = 18 + (i * 4); // 18s to 78s
            const startX = (i * 7) % 100;
            const startY = (i * 11) % 100;
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  i % 2 === 0 ? 'bg-teal-400' : 'bg-indigo-400'
                }`}
                style={{
                  width: size,
                  height: size,
                  left: `${startX}%`,
                  top: `${startY}%`,
                  opacity: theme === 'dark' ? 0.12 : 0.07,
                }}
                animate={{
                  y: [-60, 60, -60],
                  x: [-35, 35, -35],
                  opacity: theme === 'dark' ? [0.06, 0.28, 0.06] : [0.03, 0.15, 0.03],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Background decoration - soft floating artistic glow blurs & shadows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10">
        <motion.div 
          animate={{
            y: [-12, 12, -12],
            x: [-8, 8, -8],
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-[-250px] left-[12%] w-[550px] h-[550px] rounded-full blur-[120px] transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-teal-500/5 shadow-[0_0_120px_rgba(20,184,166,0.15)]' 
              : 'bg-teal-500/[0.04] shadow-[0_0_120px_rgba(20,184,166,0.06)]'
          }`}
        />
        <motion.div 
          animate={{
            y: [12, -12, 12],
            x: [8, -8, 8],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-[-200px] right-[15%] w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-indigo-500/5 shadow-[0_0_120px_rgba(99,102,241,0.15)]' 
              : 'bg-indigo-500/[0.04] shadow-[0_0_120px_rgba(99,102,241,0.06)]'
          }`}
        />
        {/* Additional organic ambient glow/shadow centers for depth further down */}
        <motion.div 
          animate={{
            y: [-20, 20, -20],
            x: [10, -10, 10],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-[800px] right-[10%] w-[600px] h-[600px] rounded-full blur-[130px] transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-teal-500/[0.03] shadow-[0_0_150px_rgba(20,184,166,0.06)]' 
              : 'bg-teal-500/[0.02] shadow-[0_0_150px_rgba(20,184,166,0.03)]'
          }`}
        />
        <motion.div 
          animate={{
            y: [15, -15, 15],
            x: [-15, 15, -15],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-[1800px] left-[5%] w-[550px] h-[550px] rounded-full blur-[130px] transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-indigo-500/[0.03] shadow-[0_0_150px_rgba(99,102,241,0.06)]' 
              : 'bg-indigo-500/[0.02] shadow-[0_0_150px_rgba(99,102,241,0.03)]'
          }`}
        />
      </div>

      {/* HEADER */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 border-b ${
        theme === 'dark'
          ? 'bg-[#090a0f]/85 border-white/[0.04]'
          : 'bg-[#fafbfe]/85 border-slate-200/80'
      }`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Main Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className={`font-extrabold text-sm tracking-tight block group-hover:text-teal-400 transition-colors uppercase font-mono ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>Melvin Cureau</span>
          </motion.div>

          {/* Nav menu links */}
          <nav className={`hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider transition-colors ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <a href="#cv-section" className={`transition-colors py-1 relative group ${
              theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
            }`}>
              {currentTranslation.navCV}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#projects-section" className={`transition-colors py-1 relative group ${
              theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
            }`}>
              {currentTranslation.navProjects}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#contact-section" className={`transition-colors py-1 relative group ${
              theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-900'
            }`}>
              {currentTranslation.navContact}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Switcher Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer shadow-sm flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-slate-950/60 border-white/10 text-teal-400 hover:text-teal-300 hover:bg-slate-900' 
                  : 'bg-white border-slate-200 text-teal-600 hover:text-teal-500 hover:bg-slate-50'
              }`}
              title={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
              id="theme-toggler"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>

            {/* Premium dropdown language selector */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center gap-2 border px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-sm select-none ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950 hover:bg-slate-50'
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
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute right-0 mt-2 w-36 border rounded-xl shadow-2xl p-1 z-50 overflow-hidden ${
                        theme === 'dark'
                          ? 'bg-slate-900 border-white/10'
                          : 'bg-white border-slate-200 shadow-md'
                      }`}
                    >
                      {(['FR', 'EN', 'ES'] as Language[]).map((lng) => (
                        <button
                          key={lng}
                          onClick={() => {
                            setLanguage(lng);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-mono text-left rounded-lg transition-all cursor-pointer ${
                            language === lng 
                              ? 'bg-teal-500/10 text-teal-400 font-extrabold' 
                              : theme === 'dark'
                                ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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

      {/* HERO SECTION */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-xs font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
            {currentTranslation.status}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-white via-slate-100 to-slate-400'
                : 'from-slate-950 via-slate-800 to-slate-700'
            }`}
          >
            {currentTranslation.role}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-sans font-light transition-colors ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700 font-medium'
            }`}
          >
            {currentTranslation.aboutText}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-6"
          >
            <a
              href="https://www.linkedin.com/in/melvin-cureau-83a812252/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs tracking-wider uppercase rounded-xl shadow-[0_15px_30px_rgba(20,184,166,0.25)] hover:shadow-[0_15px_35px_rgba(20,184,166,0.35)] transition-all flex items-center gap-2 group transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Linkedin className="h-4 w-4" />
              {currentTranslation.viewLinkedin}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 border font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-slate-900 border-white/10 hover:border-white/20 text-slate-200 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 hover:text-slate-950'
              }`}
            >
              <Github className="h-4 w-4" />
              {currentTranslation.viewGithub}
            </a>
          </motion.div>

        </div>
      </section>

      {/* SECTION 1: TIMELINE (CV) */}
      <section id="cv-section" className="relative py-20 px-6 max-w-4xl mx-auto scroll-mt-12">
        
        {/* Title Block */}
        <div className="text-center space-y-3 mb-16">
          <h2 className={`text-3xl font-bold tracking-tight uppercase leading-none transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>{currentTranslation.titleCV}</h2>
          {currentTranslation.subtitleCV && (
            <p className="text-sm text-slate-500 max-w-md mx-auto">{currentTranslation.subtitleCV}</p>
          )}
        </div>

        {/* Tab selector buttons */}
        <div className={`flex p-1 rounded-2xl max-w-md mx-auto mb-12 shadow-2xl relative overflow-hidden border transition-colors ${
          theme === 'dark' 
            ? 'bg-slate-950 border-white/5' 
            : 'bg-slate-100 border-slate-200'
        }`}>
          {[
            { id: 'all', label: currentTranslation.viewAll },
            { id: 'work', label: currentTranslation.tabWork },
            { id: 'education', label: currentTranslation.tabEdu }
          ].map((tab) => {
            const isActive = cvTab === tab.id || (tab.id === 'all' && cvTab === 'all');
            return (
              <button
                key={tab.id}
                onClick={() => setCvTab(tab.id as any)}
                className="relative flex-1 py-2.5 text-xs font-semibold rounded-xl cursor-pointer transition-all uppercase duration-300 text-center select-none"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCVSwitch"
                    className={`absolute inset-0 rounded-xl shadow-lg border ${
                      theme === 'dark' 
                        ? 'bg-slate-900 border-white/10' 
                        : 'bg-white border-slate-200'
                    }`}
                    transition={{ type: "spring", stiffness: 140, damping: 20 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${
                  isActive 
                    ? 'text-teal-400 font-extrabold' 
                    : theme === 'dark' 
                      ? 'text-slate-400 hover:text-slate-300' 
                      : 'text-slate-500 hover:text-slate-800'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main interactive dynamic grid wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-8 relative">
            <AnimatePresence mode="popLayout">
              
              {/* Experiences lists */}
              {(cvTab === 'all' || cvTab === 'work') && (
                <motion.div
                  key="work-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h3 className={`text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <Briefcase className="h-4 w-4 text-teal-400" />
                    {currentTranslation.tabWork}
                  </h3>

                  <div className={`space-y-6 border-l ml-3 pl-6 transition-colors ${
                    theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    {(isCvExpanded ? currentTranslation.experiences : currentTranslation.experiences.slice(0, 2)).map((exp, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ y: -3 }}
                        className={`relative group p-5 rounded-2xl hover:border-teal-500/20 shadow-lg hover:shadow-[0_20px_45px_-12px_rgba(20,184,166,0.12)] border transition-all duration-300 ${
                          theme === 'dark' 
                            ? 'bg-slate-900/40 border-white/[0.04] hover:bg-slate-900/60' 
                            : 'bg-white border-slate-200 hover:bg-slate-50/80 shadow-sm'
                        }`}
                      >
                        {/* Timeline point indicator */}
                        <div className={`absolute -left-[31px] top-7 w-[9px] h-[9px] border-2 border-teal-400 rounded-full group-hover:scale-130 transition-all ${
                          theme === 'dark' ? 'bg-[#090a0f]' : 'bg-slate-50'
                        }`} />
                        
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block mb-1">{exp.period}</span>
                            <h4 className={`text-base font-bold tracking-tight transition-colors ${
                              theme === 'dark' ? 'text-white' : 'text-slate-900'
                            }`}>{exp.role}</h4>
                          </div>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                            theme === 'dark'
                              ? 'bg-slate-950 border-white/5 text-slate-300'
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}>
                            {exp.company}
                          </span>
                        </div>

                        <p className="text-3xs font-mono text-slate-500 flex items-center gap-1.5 mt-1">
                          <Globe className="h-3 w-3 text-slate-600" />
                          {exp.location}
                        </p>

                        <ul className="space-y-2 mt-4">
                          {exp.details.map((detail, dIdx) => (
                            <li key={dIdx} className={`text-xs leading-relaxed flex items-start gap-2 transition-colors ${
                              theme === 'dark' ? 'text-slate-400' : 'text-slate-800'
                            }`}>
                              <span className="text-teal-400 mt-1.5 shrink-0 block w-1 h-1 rounded-full bg-teal-400" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 pt-4">
                          {exp.tags.map((tag, tIdx) => (
                            <span key={tIdx} className={`text-[10px] font-mono px-2 py-0.5 border rounded-md transition-colors ${
                              theme === 'dark'
                                ? 'border-white/5 bg-slate-950 text-slate-400'
                                : 'border-slate-200 bg-slate-50 text-slate-800 font-medium'
                            }`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Education section */}
              {(cvTab === 'all' || cvTab === 'education') && (
                <motion.div
                  key="edu-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 pt-4"
                >
                  <h3 className={`text-xs font-mono uppercase tracking-widest flex items-center gap-2 transition-colors ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <GraduationCap className="h-4 w-4 text-indigo-400" />
                    {currentTranslation.tabEdu}
                  </h3>

                  <div className={`space-y-5 border-l ml-3 pl-6 transition-colors ${
                    theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                  }`}>
                    {(isCvExpanded ? currentTranslation.educations : currentTranslation.educations.slice(0, 1)).map((edu, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ y: -3 }}
                        className={`relative group p-5 rounded-2xl hover:border-indigo-500/20 shadow-lg hover:shadow-[0_20px_45px_-12px_rgba(99,102,241,0.12)] border transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-slate-900/40 border-white/[0.04] hover:bg-slate-900/60'
                            : 'bg-white border-slate-200 hover:bg-slate-50/80 shadow-sm'
                        }`}
                      >
                        {/* Bullet point */}
                        <div className={`absolute -left-[31px] top-7 w-[9px] h-[9px] border-2 border-indigo-500 rounded-full group-hover:scale-130 transition-all ${
                          theme === 'dark' ? 'bg-[#090a0f]' : 'bg-slate-50'
                        }`} />
                        
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">{edu.period}</span>
                            <h4 className={`text-base font-bold tracking-tight transition-colors ${
                              theme === 'dark' ? 'text-white' : 'text-slate-900'
                            }`}>{edu.degree}</h4>
                          </div>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                            theme === 'dark'
                              ? 'bg-slate-950 border-white/5 text-slate-300'
                              : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}>
                            {edu.school}
                          </span>
                        </div>

                        <p className="text-xs text-indigo-300 font-mono mt-1 font-semibold">{edu.specialty}</p>
                        <p className={`text-xs mt-3 leading-relaxed font-light transition-colors ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-800'
                        }`}>{edu.details}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Expander Button for "Voir Plus" */}
            <div className="flex justify-center pt-6">
              <button
                onClick={() => setIsCvExpanded(!isCvExpanded)}
                className={`group flex items-center gap-2 px-5 py-2.5 border text-xs font-mono font-bold transition-all rounded-xl cursor-pointer active:scale-95 select-none ${
                  theme === 'dark'
                    ? 'bg-slate-950 hover:bg-slate-900 border-white/10 hover:border-teal-500/30 text-slate-300 hover:text-teal-400 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)]'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-teal-500 text-slate-700 hover:text-teal-600 shadow-sm'
                }`}
              >
                <span>{isCvExpanded ? currentTranslation.btnShowLess : currentTranslation.btnShowMore}</span>
                <span className={`text-[10px] transition-transform duration-300 inline-block ${isCvExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>
                  ▼
                </span>
              </button>
            </div>
          </div>

          {/* Right sidebar: Skills spectrum */}
          <div className="space-y-6.5">
            
            {/* Certifications and Key assets */}
            <div className={`border p-6 rounded-2xl shadow-xl transition-all duration-300 space-y-4 ${
              theme === 'dark'
                ? 'border-white/[0.04] bg-slate-900/30 hover:shadow-[0_20px_50px_rgba(20,184,166,0.05)]'
                : 'border-slate-200 bg-white shadow-sm'
            }`}>
              <h3 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-800'
              }`}>
                <Award className="h-4.5 w-4.5 text-teal-400 animate-pulse" />
                {currentTranslation.certifications}
              </h3>

              <div className="space-y-3">
                {/* AZ-900 Certification */}
                <div className={`border px-4 py-3 rounded-xl transition-colors ${
                  theme === 'dark' ? 'bg-slate-950 border-white/5 hover:border-blue-500/30' : 'bg-slate-50 border-slate-200 hover:border-blue-500'
                }`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Microsoft Azure (AZ-900)</span>
                    <span className="text-[9px] font-mono bg-blue-500/15 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 uppercase rounded-md">
                      {language === 'FR' ? 'En cours' : language === 'EN' ? 'In progress' : 'En curso'}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[10px] block mt-1">
                    {language === 'FR' ? 'Azure Fundamentals en cours d\'acquisition' : language === 'EN' ? 'Azure Fundamentals certification in progress' : 'Certificación Azure Fundamentals en curso'}
                  </span>
                </div>
              </div>
            </div>

            {/* Categorized Skills badges (Sleek minimalist panel) */}
            <div className={`border p-6 rounded-2xl shadow-xl space-y-6 ${
              theme === 'dark'
                ? 'border-white/[0.04] bg-slate-900/30'
                : 'border-slate-200 bg-white shadow-sm'
            }`}>
              <h3 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-800'
              }`}>
                <Cpu className="h-4.5 w-4.5 text-indigo-400" />
                <span>Habilités techniques</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">DevOps & Automation</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Docker", "Kubernetes", "Terraform", "Ansible", "GitLab CI", "PowerShell", "Bash"].map((s) => (
                      <span key={s} className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-white/5 text-slate-300 hover:border-teal-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600'
                      }`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">Cloud & Virtualization</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Azure", "Google Cloud", "AWS", "VMware", "Linux Server", "Windows Server"].map((s) => (
                      <span key={s} className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-white/5 text-slate-300 hover:border-indigo-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600'
                      }`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">Monitoring & Ops</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Grafana", "Prometheus", "DAT/DEX Blueprints", "Jira & Confluence"].map((s) => (
                      <span key={s} className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-white/5 text-slate-300 hover:border-teal-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-teal-400 hover:text-teal-600'
                      }`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* SECTION 2: PROJECTS */}
      <section id="projects-section" className={`relative py-20 border-t scroll-mt-12 transition-all duration-300 ${
        theme === 'dark' 
          ? 'border-white/[0.04] bg-slate-950/20' 
          : 'border-slate-200 bg-slate-50/50'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-10">
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight uppercase leading-none transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>{currentTranslation.projectsTitle}</h2>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              {language === 'FR' ? 'Dépôts publics épinglés' : language === 'EN' ? 'Public pinned repositories' : 'Repositorios públicos destacados'}
            </p>
          </div>

          {/* Dynamic Grid of GitHub Pinned Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 auto-rows-fr">
            {reposLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className={`border p-6 rounded-2xl space-y-4 animate-pulse ${
                  theme === 'dark' ? 'border-white/[0.03] bg-slate-900/10' : 'border-slate-200 bg-white'
                }`}>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-slate-800 rounded w-1/2" />
                    <div className="h-3 bg-slate-800 rounded w-1/6" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-800 rounded w-full" />
                    <div className="h-3 bg-slate-800 rounded w-5/6" />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <div className="h-3 bg-slate-800 rounded w-1/4" />
                    <div className="h-3 bg-slate-800 rounded w-1/4" />
                  </div>
                </div>
              ))
            ) : (
              githubRepos.map((repo, idx) => {
                const langColors: Record<string, string> = theme === 'dark' ? {
                  'HTML': 'bg-orange-500/15 text-orange-400 border-orange-500/20',
                  'CSS': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
                  'JavaScript': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
                  'TypeScript': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
                  'PowerShell': 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
                  'Python': 'bg-sky-500/15 text-sky-400 border-sky-500/20',
                  'Shell': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
                  'Go': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
                  'C#': 'bg-purple-500/15 text-purple-400 border-purple-500/20',
                  'Vue': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
                  'YAML': 'bg-pink-500/15 text-pink-400 border-pink-500/20'
                } : {
                  'HTML': 'bg-orange-50 border-orange-200 text-orange-800 font-semibold',
                  'CSS': 'bg-blue-50 border-blue-200 text-blue-800 font-semibold',
                  'JavaScript': 'bg-yellow-50 border-yellow-200 text-amber-900 font-semibold',
                  'TypeScript': 'bg-blue-50 border-blue-250 text-blue-800 font-semibold',
                  'PowerShell': 'bg-indigo-50 border-indigo-200 text-indigo-800 font-semibold',
                  'Python': 'bg-sky-50 border-sky-200 text-sky-800 font-semibold',
                  'Shell': 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold',
                  'Go': 'bg-cyan-50 border-cyan-200 text-cyan-800 font-semibold',
                  'C#': 'bg-purple-50 border-purple-200 text-purple-850 font-semibold',
                  'Vue': 'bg-emerald-50 border-emerald-250 text-emerald-800 font-semibold',
                  'YAML': 'bg-pink-50 border-pink-200 text-pink-850 font-semibold'
                };
                const badgeStyle = langColors[repo.language] || (theme === 'dark' ? 'bg-slate-500/15 text-slate-400 border-slate-500/30' : 'bg-slate-100 text-slate-700 border-slate-200 font-semibold');

                return (
                  <motion.div
                    key={repo.repo || idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className={`group relative overflow-hidden border p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                      theme === 'dark'
                        ? 'border-white/[0.04] bg-slate-900/10 hover:border-teal-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_30px_rgba(20,184,166,0.06)]'
                        : 'border-slate-200 bg-white hover:border-teal-400/80 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/[0.01] group-hover:bg-teal-500/[0.03] blur-2xl rounded-full transition-colors pointer-events-none" />

                    <div className="space-y-3.5">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className={`text-xs sm:text-sm font-bold font-mono tracking-tight group-hover:text-teal-400 transition-colors ${
                            theme === 'dark' ? 'text-white' : 'text-slate-900'
                          }`}>
                            {repo.repo}
                          </h3>
                        </div>
                        <span className={`text-[9px] font-mono border px-2 py-0.5 rounded-full uppercase ${badgeStyle}`}>
                          {repo.language}
                        </span>
                      </div>

                      <p className={`text-xs leading-relaxed font-light min-h-[48px] transition-colors ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-800'
                      }`}>
                        {repo.description}
                      </p>
                    </div>

                    <div className={`flex justify-between items-center pt-4 border-t mt-4 transition-colors ${
                      theme === 'dark' ? 'border-white/[0.03]' : 'border-slate-100'
                    }`}>
                      <div className="flex gap-4 font-mono text-[10px] text-slate-500">
                        {repo.stars !== undefined && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-500" />
                            <span>{repo.stars} {language === 'FR' ? 'étoile' : language === 'EN' ? 'star' : 'estrellas'}</span>
                          </span>
                        )}
                        {repo.forks !== undefined && (
                          <span className="flex items-center gap-1">
                            <GitFork className="h-3 w-3 text-slate-500" />
                            <span>{repo.forks} {language === 'FR' ? 'clones' : language === 'EN' ? 'clones' : 'clones'}</span>
                          </span>
                        )}
                      </div>

                      <a
                        href={repo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-mono font-bold uppercase tracking-wide transition-colors"
                      >
                        <span>{language === 'FR' ? 'Accéder' : language === 'EN' ? 'Visit' : 'Visitar'}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

        </div>
      </section>

      {/* SECTION 3: CONTACT FORM */}
      <section id="contact-section" className={`relative py-20 px-6 border-t scroll-mt-12 transition-all duration-300 ${
        theme === 'dark' ? 'border-white/[0.04]' : 'border-slate-200 bg-slate-50/[0.15]'
      }`}>
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-3 mb-16">
            <h2 className={`text-3xl font-bold tracking-tight uppercase leading-none transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>{currentTranslation.contactTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Info Column */}
            <div className="md:col-span-5 space-y-6">
              <p className={`text-sm leading-relaxed font-light transition-colors ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {currentTranslation.contactSub}
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className={`p-4 border rounded-2xl flex items-center gap-3 transition-all ${
                  theme === 'dark' 
                    ? 'bg-slate-900/30 border-white/[0.04] text-slate-300' 
                    : 'bg-white border-slate-200 text-slate-755 shadow-sm'
                }`}>
                  <Mail className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                  <span className="truncate font-light select-all">portfolio@melvincureau.com</span>
                </div>
                <div className={`p-4 border rounded-2xl flex items-center gap-3 transition-all ${
                  theme === 'dark' 
                    ? 'bg-slate-900/30 border-white/[0.04] text-slate-300' 
                    : 'bg-white border-slate-200 text-slate-755 shadow-sm'
                }`}>
                  <Globe className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                  <span className="font-light">Tours, France</span>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/in/melvin-cureau-83a812252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-3 border rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-900/60 hover:bg-slate-900 border-white/[0.06] text-slate-400 hover:text-white'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                  }`}
                >
                  <Linkedin className="h-4 w-4 text-teal-400" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 py-3 border rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-900/60 hover:bg-slate-900 border-white/[0.06] text-slate-400 hover:text-white'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                  }`}
                >
                  <Github className="h-4 w-4 text-slate-500" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="md:col-span-7">
              <form onSubmit={handleContactSubmit} className={`border p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 transition-all ${
                theme === 'dark' 
                  ? 'border-white/[0.04] bg-slate-900/20' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldName}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 border rounded-xl text-xs font-sans focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all font-light ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-white/5 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldEmail}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 border rounded-xl text-xs font-sans focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all font-light ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-white/5 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldSubject}</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs font-sans focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all font-light ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-white/5 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldMessage}</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs font-sans focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all resize-none font-light ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-white/5 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 font-mono text-xs flex items-center gap-2 shadow-md"
                    >
                      <Check className="h-4 w-4 shrink-0" />
                      <span>{currentTranslation.formSuccess}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_12px_30px_rgba(20,184,166,0.2)] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-950/30 border-t-slate-950 animate-spin" />
                      <span>{currentTranslation.btnSending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>{currentTranslation.btnSend}</span>
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className={`relative py-12 overflow-hidden border-t transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#06070a] border-white/[0.04] shadow-[0_-15px_40px_rgba(0,0,0,0.4)]'
          : 'bg-white border-slate-200/80 shadow-sm'
      }`}>
        {/* Design Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand & Signature info */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className={`font-extrabold uppercase tracking-widest text-[11px] font-mono transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>Melvin Cureau</span>
              <span className="text-slate-600 font-mono text-[10px]">-</span>
              <span className="text-slate-500 text-[10px] font-mono">2026</span>
            </div>
          </div>

          {/* Socials & Interaction info */}
          <div className="flex flex-wrap justify-center items-center gap-6 font-mono text-[10px]">
            <a 
              href="https://www.linkedin.com/in/melvin-cureau-83a812252/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-teal-400 hover:translate-y-[-1px] transition-all flex items-center gap-1.5"
            >
              <Linkedin className="h-3 w-3 shrink-0" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-teal-400 hover:translate-y-[-1px] transition-all flex items-center gap-1.5"
            >
              <Github className="h-3 w-3 shrink-0" />
              <span>GitHub</span>
            </a>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className={`transition-colors flex items-center gap-1 border-l pl-6 cursor-pointer ${
                theme === 'dark' 
                  ? 'text-slate-500 hover:text-white border-white/10' 
                  : 'text-slate-500 hover:text-slate-900 border-slate-200'
              }`}
            >
              <span>{language === 'FR' ? 'Retour en haut' : language === 'EN' ? 'Back to top' : 'Volver arriba'}</span>
              <span className="font-sans text-[11px] leading-none shrink-0 inline-block hover:translate-y-[-2px] transition-transform">↑</span>
            </button>
          </div>
        </div>
      </footer>

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
