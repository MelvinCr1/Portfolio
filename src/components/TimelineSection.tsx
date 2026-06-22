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
          const isActive = cvTab === tab.id;
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
                  {currentTranslation.experiences.map((exp, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -3 }}
                      className={`${!isCvExpanded && index >= 2 ? 'hidden' : 'block'} relative group p-5 rounded-xl border transition-all duration-200 ${
                        theme === 'dark' 
                          ? 'bg-slate-900/20 border-slate-900/60 hover:border-slate-800 hover:bg-slate-900/40 shadow-none' 
                          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm'
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

                      <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 mt-1">
                        <Globe className="h-3 w-3 text-slate-600" />
                        {exp.location}
                      </p>

                      <ul className="space-y-2 mt-4">
                        {exp.details.map((detail, dIdx) => (
                          <li key={dIdx} className={`text-xs leading-relaxed flex items-start gap-2 transition-colors ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-800'
                          }`}>
                            <span className="text-teal-400 mt-1.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-teal-400" />
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
                  {currentTranslation.educations.map((edu, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -3 }}
                      className={`${!isCvExpanded && index >= 1 && cvTab === 'all' ? 'hidden' : 'block'} relative group p-5 rounded-xl border transition-all duration-200 ${
                        theme === 'dark'
                          ? 'bg-slate-900/20 border-slate-900/60 hover:border-slate-800 hover:bg-slate-900/40 shadow-none'
                          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 shadow-sm'
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
          
          {/* Certifications panel */}
          <div className={`border p-6 rounded-2xl shadow-xl transition-all duration-300 space-y-4 ${
            theme === 'dark'
              ? 'border-white/[0.04] bg-slate-900/30 hover:shadow-[0_20px_50px_rgba(20,184,166,0.05)]'
              : 'border-slate-200 bg-white shadow-sm'
          }`}>
            <h3 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-800'
            }`}>
              <Award className="h-4.5 w-4.5 text-teal-400" />
              {currentTranslation.certifications}
            </h3>

            <div className="space-y-3">
              <div className={`border px-4 py-3 rounded-xl transition-colors ${
                theme === 'dark' ? 'bg-slate-950 border-white/5 hover:border-blue-500/30' : 'bg-slate-50 border-slate-200 hover:border-blue-500'
              }`}>
                <div className="flex justify-between items-start">
                  <span className={`text-xs font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Microsoft Azure (AZ-900)</span>
                  <span className="text-[9px] font-mono bg-blue-500/15 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 uppercase rounded-md shrink-0 ml-1">
                    {language === 'FR' ? 'En cours' : language === 'EN' ? 'In progress' : 'En curso'}
                  </span>
                </div>
                <span className="text-slate-500 text-[10px] block mt-1">
                  {language === 'FR' ? "Azure Fundamentals en cours d'acquisition" : language === 'EN' ? 'Azure Fundamentals certification in progress' : 'Certificación Azure Fundamentals en curso'}
                </span>
              </div>
            </div>
          </div>

          {/* Categorized Skills badges */}
          <div className={`border p-6 rounded-2xl shadow-xl space-y-6 ${
            theme === 'dark'
              ? 'border-white/[0.04] bg-slate-900/30'
              : 'border-slate-200 bg-white shadow-sm'
          }`}>
            <h3 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-2 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-800'
            }`}>
              <Cpu className="h-4.5 w-4.5 text-indigo-400" />
              <span>{language === 'FR' ? 'Compétences' : language === 'EN' ? 'Skills' : 'Competencias'}</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">DevOps & Automation</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Ansible", "Terraform", "Docker", "Gitlab / Github", "AWS CloudFormation"].map((s) => (
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
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">Cloud & Virtualisation</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Cloud Architecture", "VMware", "Clouds privés", "Virtualisation", "Microsoft Azure", "AWS"].map((s) => (
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
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">Admin Système & Réseau</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Linux", "Windows Server", "Firewall Fortigate", "Networking Basics"].map((s) => (
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

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">Observabilité & Scripting</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Monitoring & Observability", "PowerShell", "Python", "SQL", "Algorithmes"].map((s) => (
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

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">{language === 'FR' ? 'Savoir-être & Méthodes' : language === 'EN' ? 'Soft-Skills & Methods' : 'Habilidades y Métodos'}</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Résolution de problèmes", "Gestion de projet", "Documentation technique"].map((s) => (
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
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
