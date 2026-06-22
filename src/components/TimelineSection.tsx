import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, Award, Cpu, Globe } from 'lucide-react';
import { Language, TranslationSet } from '../types';

interface TimelineSectionProps {
  theme: 'dark' | 'light';
  language: Language;
  currentTranslation: TranslationSet;
}

export default function TimelineSection({
  theme,
  language,
  currentTranslation
}: TimelineSectionProps) {
  const [cvTab, setCvTab] = useState<'all' | 'work' | 'education'>('all');
  const [isCvExpanded, setIsCvExpanded] = useState(false);

  return (
    <section id="cv-section" className="relative py-20 px-6 max-w-5xl mx-auto scroll-mt-12">
      
      {/* Title Block with Editorial Architecture style (Section Number + Title) */}
      <div className="flex items-baseline gap-4 mb-16 border-b pb-4 transition-colors duration-300 border-neutral-200/50 dark:border-neutral-800/40">
        <span className="font-mono text-xs text-[#cb9b51] font-bold">01 /</span>
        <h2 className={`text-xl sm:text-2xl font-semibold tracking-tight uppercase transition-colors ${
          theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'
        }`}>{currentTranslation.titleCV}</h2>
      </div>

      {/* Tab selector buttons - styled as minimalist block-segmented tabs */}
      <div className={`flex p-1 rounded-lg max-w-md mx-auto mb-16 relative overflow-hidden border transition-all ${
        theme === 'dark' 
          ? 'bg-[#121214] border-neutral-800/70' 
          : 'bg-neutral-100/80 border-neutral-200'
      }`}>
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
              className="relative flex-1 py-2 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all duration-300 text-center select-none"
            >
              {isActive && (
                <motion.span
                  layoutId="activeCVSwitch"
                  className={`absolute inset-0 rounded-md shadow-sm border ${
                    theme === 'dark' 
                      ? 'bg-[#1c1d22] border-neutral-800' 
                      : 'bg-white border-neutral-200/80'
                  }`}
                  transition={{ type: "spring", stiffness: 150, damping: 22 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-250 ${
                isActive 
                  ? 'text-[#cb9b51] font-bold' 
                  : theme === 'dark' 
                    ? 'text-neutral-500 hover:text-neutral-300' 
                    : 'text-neutral-500 hover:text-neutral-800'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main modern asymmetric grid wrapper: 2/3 Experiences, 1/3 Skills & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <div className="md:col-span-2 space-y-12 relative">
          <AnimatePresence mode="popLayout">
            
            {/* Experiences block */}
            {(cvTab === 'all' || cvTab === 'work') && (
              <motion.div
                key="work-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <h3 className={`text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 transition-colors border-b pb-2 ${
                  theme === 'dark' ? 'text-neutral-300 border-neutral-800/40' : 'text-neutral-600 border-neutral-200/50'
                }`}>
                  <Briefcase className="h-3.5 w-3.5 text-[#cb9b51] shrink-0" />
                  <span>{currentTranslation.tabWork}</span>
                </h3>

                <div className="divide-y divide-neutral-200/40 dark:divide-neutral-800/40">
                  {currentTranslation.experiences.map((exp, index) => (
                    <motion.div 
                      key={index}
                      className={`${!isCvExpanded && index >= 2 ? 'hidden' : 'block'} py-8 first:pt-0 last:pb-0 group transition-all duration-300`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#cb9b51] uppercase tracking-widest block font-semibold">{exp.period}</span>
                          <h4 className={`text-base font-medium tracking-tight transition-colors ${
                            theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'
                          }`}>{exp.role}</h4>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-1 shrink-0">
                          <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded border self-start sm:self-auto transition-colors ${
                            theme === 'dark'
                              ? 'bg-neutral-900/60 border-neutral-850 text-neutral-300'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                          }`}>
                            {exp.company}
                          </span>
                          <p className="text-[10px] font-mono text-neutral-500 flex items-center gap-1.5 justify-start sm:justify-end">
                            <Globe className="h-3 w-3 text-neutral-600" />
                            {exp.location}
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-2.5 mt-5">
                        {exp.details.map((detail, dIdx) => (
                          <li key={dIdx} className={`text-xs leading-relaxed flex items-start gap-2.5 transition-colors ${
                            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600 font-light'
                          }`}>
                            <span className="text-[#cb9b51] mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-[#cb9b51]/80" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-4.5">
                        {exp.tags.map((tag, tIdx) => (
                          <span key={tIdx} className={`text-[10px] font-mono px-2 py-0.5 border rounded transition-colors ${
                            theme === 'dark'
                              ? 'border-neutral-850 bg-neutral-950/40 text-neutral-400'
                              : 'border-neutral-200 bg-neutral-50 text-neutral-500'
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

            {/* Education block */}
            {(cvTab === 'all' || cvTab === 'education') && (
              <motion.div
                key="edu-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-8 pt-4"
              >
                <h3 className={`text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 transition-colors border-b pb-2 ${
                  theme === 'dark' ? 'text-neutral-300 border-neutral-800/40' : 'text-neutral-600 border-neutral-200/50'
                }`}>
                  <GraduationCap className="h-4 w-4 text-[#cb9b51] shrink-0" />
                  <span>{currentTranslation.tabEdu}</span>
                </h3>

                <div className="divide-y divide-neutral-200/40 dark:divide-neutral-800/40">
                  {currentTranslation.educations.map((edu, index) => (
                    <motion.div 
                      key={index}
                      className={`${!isCvExpanded && index >= 1 && cvTab === 'all' ? 'hidden' : 'block'} py-8 first:pt-0 last:pb-0 transition-all duration-300`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-[#cb9b51] uppercase tracking-widest block font-semibold">{edu.period}</span>
                          <h4 className={`text-base font-medium tracking-tight transition-colors ${
                            theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'
                          }`}>{edu.degree}</h4>
                          <p className="text-xs text-[#cb9b51]/80 font-mono font-medium">{edu.specialty}</p>
                        </div>
                        
                        <span className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded border self-start sm:self-auto shrink-0 transition-colors ${
                          theme === 'dark'
                            ? 'bg-neutral-900/60 border-neutral-850 text-neutral-300'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                        }`}>
                          {edu.school}
                        </span>
                      </div>

                      <p className={`text-xs mt-3.5 leading-relaxed font-light transition-colors ${
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>{edu.details}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Expander Button for "Voir Plus" - minimalist design */}
          <div className="flex justify-start pt-6 border-t border-neutral-200/30 dark:border-neutral-800/30">
            <button
              onClick={() => setIsCvExpanded(!isCvExpanded)}
              className={`group flex items-center gap-2.5 px-4 py-2 border text-xs font-mono font-bold tracking-widest uppercase rounded-lg cursor-pointer active:scale-98 select-none transition-all ${
                theme === 'dark'
                  ? 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50'
              }`}
            >
              <span>{isCvExpanded ? currentTranslation.btnShowLess : currentTranslation.btnShowMore}</span>
              <span className={`text-[8px] transition-transform duration-300 inline-block ${isCvExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>
                ▼
              </span>
            </button>
          </div>
        </div>

        {/* Right sidebar: Skills & Certifications organized cleanly */}
        <div className="space-y-10">
          
          {/* Certifications panel */}
          <div className="space-y-4">
            <h3 className={`text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 border-b pb-2 ${
              theme === 'dark' ? 'text-neutral-300 border-neutral-800/40' : 'text-neutral-600 border-neutral-200/50'
            }`}>
              <Award className="h-4.5 w-4.5 text-[#cb9b51] shrink-0" />
              <span>{currentTranslation.certifications}</span>
            </h3>

            <div className="space-y-3">
              <div className={`border p-4 rounded-lg transition-all ${
                theme === 'dark' ? 'bg-[#0f1012] border-neutral-850 hover:border-neutral-700' : 'bg-[#FAF9F5] border-neutral-200 hover:border-neutral-300'
              }`}>
                <div className="flex justify-between items-start gap-1">
                  <span className={`text-xs font-bold font-mono tracking-tight ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`}>Microsoft Azure (AZ-900)</span>
                  <span className="text-[8px] font-mono bg-[#cb9b51]/10 text-[#cb9b51] border border-[#cb9b51]/15 px-1.5 py-0.5 uppercase rounded shrink-0">
                    {language === 'FR' ? 'En cours' : language === 'EN' ? 'In progress' : 'En curso'}
                  </span>
                </div>
                <span className="text-neutral-500 text-[10px] block mt-1.5 leading-relaxed">
                  {language === 'FR' ? "Azure Fundamentals en cours d'acquisition" : language === 'EN' ? 'Azure Fundamentals certification in progress' : 'Certificación Azure Fundamentals en curso'}
                </span>
              </div>
            </div>
          </div>

          {/* Categorized Skills spectrum */}
          <div className="space-y-6">
            <h3 className={`text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-2 border-b pb-2 ${
              theme === 'dark' ? 'text-neutral-300 border-neutral-800/40' : 'text-neutral-600 border-neutral-200/50'
            }`}>
              <Cpu className="h-4.5 w-4.5 text-[#cb9b51] shrink-0" />
              <span>{language === 'FR' ? 'Compétences' : language === 'EN' ? 'Skills' : 'Competencias'}</span>
            </h3>
            
            <div className="space-y-5">
              {[
                {
                  title: "DevOps & Automation",
                  items: ["Ansible", "Terraform", "Docker", "Gitlab / Github", "AWS CloudFormation"]
                },
                {
                  title: "Cloud & Virtualisation",
                  items: ["Cloud Architecture", "VMware", "Clouds privés", "Virtualisation", "Microsoft Azure", "AWS"]
                },
                {
                  title: "Admin Système & Réseau",
                  items: ["Linux", "Windows Server", "Firewall Fortigate", "Networking Basics"]
                },
                {
                  title: "Observabilité & Scripting",
                  items: ["Monitoring & Observability", "PowerShell", "Python", "SQL", "Algorithmes"]
                },
                {
                  title: language === 'FR' ? 'Savoir-être & Méthodes' : language === 'EN' ? 'Soft-Skills & Methods' : 'Habilidades y Métodos',
                  items: ["Résolution de problèmes", "Gestion de projet", "Documentation technique"]
                }
              ].map((category, cIdx) => (
                <div key={cIdx} className="space-y-2">
                  <span className="text-[9px] text-[#cb9b51] uppercase font-mono block font-bold tracking-widest">{category.title}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.items.map((s) => (
                      <span key={s} className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all duration-200 ${
                        theme === 'dark'
                          ? 'bg-neutral-950/40 border-neutral-850 text-neutral-400 hover:border-[#cb9b51]/30 hover:text-neutral-200'
                          : 'bg-neutral-50/50 border-neutral-200/80 text-neutral-500 hover:border-[#cb9b51]/40 hover:text-neutral-850'
                      }`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
