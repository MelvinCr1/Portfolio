import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TranslationSet } from '../types';

interface TimelineSectionProps {
  theme: 'dark' | 'light';
  language: Language;
  currentTranslation: TranslationSet;
}

// 1. Sleek corporate design emblem for "Cloud Temple"
const CloudTempleLogo = ({ theme }: { theme: 'dark' | 'light' }) => (
  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 border-emerald-500/10 dark:border-emerald-400/10 bg-emerald-500/5 dark:bg-emerald-400/5 group-hover:scale-105">
    <svg viewBox="0 0 40 40" className="w-6 h-6 select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 25C11 21.5 13.8 18.5 17.2 18.5C17.9 18.5 18.5 18.6 19.1 18.8C20.4 16.8 22.6 15.5 25.1 15.5C28.9 15.5 32 18.6 32 22.4C32 22.5 32 22.6 32 22.7C32 25.4 29.8 27.5 27.1 27.5H17C13.7 27.5 11 24.8 11 25Z" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="21.5" x2="20" y2="25.5" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="24" y1="21.5" x2="24" y2="25.5" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16.5" y1="23.5" x2="16.5" y2="25.5" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

// 2. Structural/Blueprint-styled modular isometric emblem for "Polyexpert Construction"
const PolyexpertLogo = ({ theme }: { theme: 'dark' | 'light' }) => (
  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 border-sky-500/10 dark:border-sky-400/10 bg-sky-500/5 dark:bg-sky-400/5 group-hover:scale-105">
    <svg viewBox="0 0 40 40" className="w-6 h-6 select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 17.5L20 12.5L29 17.5V26.5L20 31.5L11 26.5V17.5Z" stroke={theme === 'dark' ? '#0ea5e9' : '#0284c7'} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 17.5L20 22.5L29 17.5" stroke={theme === 'dark' ? '#0ea5e9' : '#0284c7'} strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="20" y1="22.5" x2="20" y2="31.5" stroke={theme === 'dark' ? '#0ea5e9' : '#0284c7'} strokeWidth="1.2" />
    </svg>
  </div>
);

// 3. Technical academic shield emblem featuring stylized technological globe grid for "SUPINFO"
const SupinfoLogo = ({ theme }: { theme: 'dark' | 'light' }) => (
  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 border-emerald-500/10 dark:border-emerald-400/10 bg-emerald-500/5 dark:bg-emerald-400/5 group-hover:scale-105">
    <svg viewBox="0 0 40 40" className="w-6 h-6 select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 12.5H27C27 22.5 20 28.5 20 28.5C20 28.5 13 22.5 13 12.5Z" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 16.5H27" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1" />
      <path d="M20 12.5V28.5" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1" />
      <path d="M16.5 19C16.5 18 17.5 17.5 18.5 17.5H21.5C22.5 17.5 23.5 18 23.5 19V20C23.5 21 22.5 21.5 21.5 21.5H18.5C17.5 21.5 16.5 22 16.5 23V24C16.5 25 17.5 25.5 18.5 25.5H21.5" stroke={theme === 'dark' ? '#00bd95' : '#008f70'} strokeWidth="1" strokeLinecap="round" />
    </svg>
  </div>
);

// 4. Elegant monograph open-book seal for "Lycée Balzac de Tours"
const BalzacLogo = ({ theme }: { theme: 'dark' | 'light' }) => (
  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 border-neutral-500/10 dark:border-neutral-400/10 bg-neutral-500/5 dark:bg-neutral-400/5 group-hover:scale-105">
    <svg viewBox="0 0 40 40" className="w-6 h-6 select-none pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 27V14C13 12.9 13.9 12 15 12H20V25H15C13.9 25 13 25.9 13 27Z" stroke={theme === 'dark' ? '#a3a3a3' : '#525252'} strokeWidth="1.5" />
      <path d="M27 27V14C27 12.9 26.1 12 25 12H20V25H25C26.1 25 27 25.9 27 27Z" stroke={theme === 'dark' ? '#a3a3a3' : '#525252'} strokeWidth="1.5" />
      <path d="M13 27C13 28.1 13.9 29 15 29H25C26.1 29 27 28.1 27 27" stroke={theme === 'dark' ? '#a3a3a3' : '#525252'} strokeWidth="1.5" />
    </svg>
  </div>
);

export default function TimelineSection({
  theme,
  language,
  currentTranslation
}: TimelineSectionProps) {
  const [cvTab, setCvTab] = useState<'all' | 'work' | 'education'>('all');
  const [isCvExpanded, setIsCvExpanded] = useState(false);

  // Helper function to resolve logo based on company/school name
  const resolveLogo = (name: string) => {
    const term = name.toLowerCase();
    if (term.includes('temple')) {
      return <CloudTempleLogo theme={theme} />;
    }
    if (term.includes('polyexpert')) {
      return <PolyexpertLogo theme={theme} />;
    }
    if (term.includes('supinfo')) {
      return <SupinfoLogo theme={theme} />;
    }
    return <BalzacLogo theme={theme} />;
  };

  // Stagger configurations
  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
  };

  return (
    <section id="cv-section" className="relative py-24 px-6 max-w-5xl mx-auto scroll-mt-12">
      
      {/* Title Block with Editorial Architecture style (Section Number + Title) */}
      <div className="flex items-baseline gap-4 mb-16 border-b pb-4 transition-colors duration-300 border-neutral-200/50 dark:border-neutral-800/40">
        <span className={`font-mono text-xs font-bold transition-colors ${
          theme === 'dark' ? 'text-[#00bd95]' : 'text-[#008f70]'
        }`}>01 /</span>
        <h2 className={`text-xl sm:text-2xl font-semibold tracking-tight uppercase transition-colors ${
          theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'
        }`}>{currentTranslation.titleCV}</h2>
      </div>

      {/* Tab selector buttons - styled as minimalist text-only sublinks */}
      <div className="flex gap-8 justify-start mb-16 border-b border-neutral-200/30 dark:border-neutral-850/30 pb-px text-xs font-mono uppercase tracking-wider">
        {[
          { id: 'all', label: currentTranslation.viewAll },
          { id: 'work', label: currentTranslation.tabWork },
          { id: 'education', label: currentTranslation.tabEdu }
        ].map((tab) => {
          const isActive = cvTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCvTab(tab.id as any)}
              className={`pb-4 relative cursor-pointer select-none font-semibold transition-colors duration-250 ${
                isActive
                  ? theme === 'dark' ? 'text-[#00bd95]' : 'text-[#008f70]'
                  : theme === 'dark'
                    ? 'text-neutral-500 hover:text-neutral-300'
                    : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                    theme === 'dark' ? 'bg-[#00bd95]' : 'bg-[#008f70]'
                  }`}
                  transition={{ type: "spring", stiffness: 355, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main modern asymmetric grid wrapper: 2/3 Experiences, 1/3 Skills & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        
        <div className="md:col-span-2 space-y-16 relative">
          <AnimatePresence mode="popLayout">
            
            {/* Experiences block */}
            {(cvTab === 'all' || cvTab === 'work') && (
              <motion.div
                key="work-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-10"
              >
                <h3 className={`text-xs font-mono uppercase tracking-[0.25em] font-semibold pb-3 border-b border-neutral-200/30 dark:border-neutral-800/40 transition-colors ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                  {currentTranslation.tabWork}
                </h3>

                <motion.div 
                  variants={listContainer} 
                  initial="hidden" 
                  animate="show" 
                  className="space-y-4"
                >
                  {currentTranslation.experiences.map((exp, index) => {
                    const isVisible = isCvExpanded || index < 2;
                    if (!isVisible) return null;

                    return (
                      <motion.div 
                        variants={listItem}
                        key={`exp-${index}`}
                        className={`group border rounded-xl p-6 transition-all duration-300 relative flex flex-col md:flex-row gap-5 ${
                          theme === 'dark'
                            ? 'border-neutral-900/40 bg-neutral-950/20 hover:border-neutral-800/80 hover:bg-neutral-950/40'
                            : 'border-neutral-200/50 bg-white/40 hover:border-neutral-250 hover:bg-white/90 shadow-2xs hover:shadow-xs'
                        }`}
                      >
                        {/* Dynamic custom vector logo on left */}
                        <div className="shrink-0 flex items-start">
                          {resolveLogo(exp.company)}
                        </div>

                        {/* Text and body details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                            <div className="space-y-1">
                              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold block ${
                                theme === 'dark' ? 'text-[#00bd95]' : 'text-[#008f70]'
                              }`}>{exp.period}</span>
                              
                              <h4 className={`text-base font-medium tracking-tight transition-colors ${
                                theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'
                              }`}>{exp.role}</h4>
                            </div>
                            
                            <div className="flex flex-col sm:items-end shrink-0">
                              <span className={`text-xs font-mono transition-colors ${
                                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                              }`}>
                                {exp.company} <span className="opacity-40">·</span> {exp.location}
                              </span>
                            </div>
                          </div>

                          <ul className="space-y-2.5">
                            {exp.details.map((detail, dIdx) => (
                              <li key={dIdx} className={`text-xs leading-relaxed flex items-start gap-3 transition-colors ${
                                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600 font-light'
                              }`}>
                                <span className={`font-mono select-none mt-0.5 shrink-0 ${
                                  theme === 'dark' ? 'text-[#00bd95]/40' : 'text-[#008f70]/40'
                                }`}>—</span>
                                <span className="flex-1">{detail}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.tags.map((tag, tIdx) => (
                              <span key={tIdx} className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border font-semibold transition-colors duration-250 ${
                                theme === 'dark' 
                                  ? 'bg-neutral-900/40 border-neutral-800/40 text-[#00bd95]/80 hover:text-[#00bd95] hover:border-[#00bd95]/30' 
                                  : 'bg-neutral-100/60 border-neutral-200 text-[#008f70]/95 hover:text-[#008f70] hover:border-[#008f70]/30'
                              }`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {/* Education block */}
            {(cvTab === 'all' || cvTab === 'education') && (
              <motion.div
                key="edu-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-10 pt-4"
              >
                <h3 className={`text-xs font-mono uppercase tracking-[0.25em] font-semibold pb-3 border-b border-neutral-200/30 dark:border-neutral-800/40 transition-colors ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                  {currentTranslation.tabEdu}
                </h3>

                <motion.div 
                  variants={listContainer} 
                  initial="hidden" 
                  animate="show" 
                  className="space-y-4"
                >
                  {currentTranslation.educations.map((edu, index) => {
                    const isVisible = isCvExpanded || index < 1 || cvTab === 'education';
                    if (!isVisible) return null;

                    return (
                      <motion.div 
                        variants={listItem}
                        key={`edu-${index}`}
                        className={`group border rounded-xl p-6 transition-all duration-300 relative flex flex-col md:flex-row gap-5 ${
                          theme === 'dark'
                            ? 'border-neutral-900/40 bg-neutral-950/20 hover:border-neutral-800/80 hover:bg-neutral-950/40'
                            : 'border-neutral-200/50 bg-white/40 hover:border-neutral-250 hover:bg-white/90 shadow-2xs hover:shadow-xs'
                        }`}
                      >
                        {/* Dynamic custom vector logo on left */}
                        <div className="shrink-0 flex items-start">
                          {resolveLogo(edu.school)}
                        </div>

                        {/* Text details */}
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2">
                            <div className="space-y-1">
                              <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold block ${
                                theme === 'dark' ? 'text-[#00bd95]' : 'text-[#008f70]'
                              }`}>{edu.period}</span>
                              
                              <h4 className={`text-base font-medium tracking-tight transition-colors ${
                                theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'
                              }`}>{edu.degree}</h4>
                              
                              <p className={`text-xs font-mono font-medium ${
                                theme === 'dark' ? 'text-[#00bd95]/85' : 'text-[#008f70]'
                              }`}>{edu.specialty}</p>
                            </div>
                            
                            <span className={`text-xs font-mono transition-colors ${
                              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                            }`}>
                              {edu.school}
                            </span>
                          </div>

                          <p className={`text-xs leading-relaxed font-light transition-colors ${
                            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                          }`}>{edu.details}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Expander Button for "Voir Plus" - minimalist inline text arrow link styling */}
          <div className="flex justify-start pt-6 border-t border-neutral-200/25 dark:border-neutral-800/25">
            <button
              onClick={() => setIsCvExpanded(!isCvExpanded)}
              className={`group flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase cursor-pointer select-none transition-colors duration-250 ${
                theme === 'dark'
                  ? 'text-[#00bd95] hover:text-[#2ae3c0]'
                  : 'text-[#008f70] hover:text-[#00aa85]'
              }`}
            >
              <span>{isCvExpanded ? currentTranslation.btnShowLess : currentTranslation.btnShowMore}</span>
              <span className="text-[10px] transform group-hover:translate-x-1 duration-200 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Right sidebar: Skills & Certifications organized elegantly with pure typography */}
        <div className="space-y-12">
          
          {/* Certifications panel */}
          <div className="space-y-4">
            <h3 className={`text-xs font-mono uppercase tracking-[0.25em] font-semibold pb-3 border-b border-neutral-200/30 dark:border-neutral-800/40 transition-colors ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {currentTranslation.certifications}
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline gap-2">
                  <span className={`text-xs font-semibold font-mono tracking-tight ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-850'}`}>
                    Microsoft Azure (AZ-900)
                  </span>
                  <span className={`text-[10px] font-mono lowercase italic ${
                    theme === 'dark' ? 'text-[#00bd95]' : 'text-[#008f70]'
                  }`}>
                    {language === 'FR' ? '(en cours)' : language === 'EN' ? '(in progress)' : '(en curso)'}
                  </span>
                </div>
                <span className="text-neutral-500 text-xs block font-light leading-relaxed">
                  {language === 'FR' ? "Fundamentals en cours d'acquisition" : language === 'EN' ? 'Fundamentals certification in progress' : 'Certificación Fundamentals en curso'}
                </span>
              </div>
            </div>
          </div>

          {/* Categorized Skills spectrum - elegant clean text-flow list layout */}
          <div className="space-y-8">
            <h3 className={`text-xs font-mono uppercase tracking-[0.25em] font-semibold pb-3 border-b border-neutral-200/30 dark:border-neutral-800/40 transition-colors ${
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              {language === 'FR' ? 'Compétences' : language === 'EN' ? 'Skills' : 'Competencias'}
            </h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "DevOps & Automation",
                  items: ["Ansible", "Terraform", "Docker", "Gitlab / GitHub", "AWS CloudFormation"]
                },
                {
                  title: "Cloud & Virtualisation",
                  items: ["Cloud Architecture", "VMware", "Clouds privés / publics", "Microsoft Azure", "AWS"]
                },
                {
                  title: "Admin Système & Réseau",
                  items: ["Linux", "Windows Server", "Firewall Fortigate", "Networking Basics"]
                },
                {
                  title: "Observabilité & Scripting",
                  items: ["Monitoring", "PowerShell", "Python", "SQL", "Algorithmes"]
                },
                {
                  title: language === 'FR' ? 'Savoir-être & Méthodes' : language === 'EN' ? 'Soft-Skills & Methods' : 'Habilidades y Métodos',
                  items: language === 'FR' 
                    ? ["Résolution de problèmes", "Gestion de projet", "Documentation technique", "Principes ITIL"] 
                    : language === 'EN'
                    ? ["Problem Solving", "Project Management", "Technical Documentation", "ITIL Principles"]
                    : ["Resolución de problemas", "Gestión de proyectos", "Documentación técnica", "Principios de ITIL"]
                }
              ].map((category, cIdx) => (
                <div key={cIdx} className="space-y-2">
                  <span className={`text-[9px] uppercase font-mono block font-bold tracking-widest ${
                    theme === 'dark' ? 'text-[#00bd95]' : 'text-[#008f70]'
                  }`}>{category.title}</span>
                  <p className={`text-xs tracking-wide leading-relaxed font-light transition-colors ${
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {category.items.join('  ·  ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
