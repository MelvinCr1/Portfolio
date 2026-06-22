import { motion } from 'motion/react';
import { Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { TranslationSet } from '../types';

interface HeroProps {
  theme: 'dark' | 'light';
  currentTranslation: TranslationSet;
}

export default function Hero({ theme, currentTranslation }: HeroProps) {
  return (
    <section className="relative py-24 md:py-36 max-w-4xl mx-auto px-6" id="hero-section">
      <div className="space-y-10 text-left">
        
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`font-mono text-[10px] uppercase tracking-[0.3em] font-semibold ${
              theme === 'dark' ? 'text-[#cb9b51]' : 'text-[#af8b61]'
            }`}
          >
            {currentTranslation.status || "Alternant @ Cloud Temple"}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-5xl sm:text-7xl font-light tracking-tighter leading-none ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Melvin <span className="font-semibold text-stroke">Cureau</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`text-sm sm:text-base font-mono uppercase tracking-[0.18em] font-bold ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            }`}
          >
            — {currentTranslation.role}
          </motion.p>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`max-w-2xl text-sm sm:text-base leading-relaxed font-sans font-light transition-colors ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600 font-normal'
          }`}
        >
          {currentTranslation.aboutText}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 auto-cols-max"
        >
          <a
            href="https://www.linkedin.com/in/melvin-cureau-83a812252/"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 font-mono font-bold text-xs tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 group cursor-pointer duration-250 border ${
              theme === 'dark'
                ? 'bg-[#cb9b51] border-[#af8b61] text-slate-950 hover:bg-[#e5bf7e] hover:border-[#cb9b51]'
                : 'bg-[#1a1a1a] border-[#1a1a1a] text-white hover:bg-neutral-800'
            }`}
          >
            <Linkedin className="h-3.5 w-3.5" />
            {currentTranslation.viewLinkedin}
            <ArrowUpRight className="h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          
          <a
            href="https://github.com/MelvinCr1"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 border font-mono font-bold text-xs tracking-widest uppercase rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
              theme === 'dark'
                ? 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white'
                : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950'
            }`}
          >
            <Github className="h-3.5 w-3.5" />
            {currentTranslation.viewGithub}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
