import { Linkedin, Github, ShieldAlert } from 'lucide-react';
import { TranslationSet } from '../types';

interface FooterProps {
  theme: 'dark' | 'light';
  currentTranslation: TranslationSet;
}

export default function Footer({ theme, currentTranslation }: FooterProps) {
  return (
    <footer className={`relative py-14 overflow-hidden border-t transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-[#090a0c] border-neutral-900/60'
        : 'bg-[#FAF9F5] border-neutral-200/50'
    }`}>
      
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand & Signature info */}
        <div className="text-center md:text-left space-y-2 max-w-md">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
            <span className={`font-bold uppercase tracking-[0.2em] text-[10px] font-mono transition-colors ${
              theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
            }`}>Melvin Cureau</span>
            <span className="text-neutral-500 font-mono text-[10px]">—</span>
            <span className="text-neutral-500 text-[10px] font-mono">2026</span>
          </div>
          {currentTranslation.copyright && (
            <p className="text-[10px] leading-relaxed text-neutral-500 font-mono flex items-start gap-1.5 justify-center md:justify-start">
              <ShieldAlert className={`h-3 w-3 shrink-0 mt-0.5 ${
                theme === 'dark' ? 'text-[#00bd95]' : 'text-[#008f70]'
              }`} />
              <span>{currentTranslation.copyright}</span>
            </p>
          )}
        </div>

        {/* Socials & Interaction info */}
        <div className="flex flex-wrap justify-center items-center gap-6 font-mono text-[10px]">
          <a 
            href="https://www.linkedin.com/in/melvin-cureau-83a812252/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`hover:-translate-y-[1px] transition-all flex items-center gap-1.5 ${
              theme === 'dark' ? 'text-neutral-500 hover:text-[#00bd95]' : 'text-neutral-500 hover:text-[#008f70]'
            }`}
          >
            <Linkedin className="h-3.5 w-3.5 shrink-0" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://github.com/MelvinCr1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`hover:-translate-y-[1px] transition-all flex items-center gap-1.5 ${
              theme === 'dark' ? 'text-neutral-500 hover:text-[#00bd95]' : 'text-neutral-500 hover:text-[#008f70]'
            }`}
          >
            <Github className="h-3.5 w-3.5 shrink-0" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
