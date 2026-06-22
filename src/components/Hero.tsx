import { motion } from 'motion/react';
import { Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { TranslationSet } from '../types';

interface HeroProps {
  theme: 'dark' | 'light';
  currentTranslation: TranslationSet;
}

export default function Hero({ theme, currentTranslation }: HeroProps) {
  return (
    <section className="relative py-20 md:py-32" id="hero-section">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`text-5xl sm:text-7xl font-black tracking-tight leading-none ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}
        >
          Melvin Cureau
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`text-lg sm:text-xl font-bold tracking-tight uppercase ${
            theme === 'dark' ? 'text-teal-400' : 'text-teal-600'
          }`}
        >
          {currentTranslation.role}
        </motion.p>

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
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 pt-6 w-full max-w-sm sm:max-w-none mx-auto"
        >
          <a
            href="https://www.linkedin.com/in/melvin-cureau-83a812252/"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto justify-center px-6 py-3 font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 group transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer duration-200 border ${
              theme === 'dark'
                ? 'bg-teal-500 border-teal-400 text-slate-950 hover:bg-teal-400'
                : 'bg-slate-950 border-slate-950 text-white hover:bg-slate-800'
            }`}
          >
            <Linkedin className="h-4 w-4" />
            {currentTranslation.viewLinkedin}
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </a>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto justify-center px-6 py-3 border font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:text-slate-950'
            }`}
          >
            <Github className="h-4 w-4" />
            {currentTranslation.viewGithub}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
