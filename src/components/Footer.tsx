import { Linkedin, Github } from 'lucide-react';

interface FooterProps {
  theme: 'dark' | 'light';
}

export default function Footer({ theme }: FooterProps) {
  return (
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
            <Linkedin className="h-3.5 w-3.5 shrink-0" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-teal-400 hover:translate-y-[-1px] transition-all flex items-center gap-1.5"
          >
            <Github className="h-3.5 w-3.5 shrink-0" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
