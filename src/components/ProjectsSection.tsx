import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';
import { Language, TranslationSet, GithubRepo } from '../types';

interface ProjectsSectionProps {
  theme: 'dark' | 'light';
  language: Language;
  currentTranslation: TranslationSet;
}

export default function ProjectsSection({
  theme,
  language,
  currentTranslation
}: ProjectsSectionProps) {
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
              let repoLanguage = item.language || '';
              let stars = item.stars !== undefined ? item.stars.toString() : '0';
              let forks = item.forks !== undefined ? item.forks.toString() : '0';

              if (name.startsWith('MelvinCr1/')) {
                name = name.replace('MelvinCr1/', '');
              }

              if (name.toLowerCase() === 'remotehire') {
                name = '3LPIC_Coursero';
                link = 'https://github.com/MelvinCr1/3LPIC_Coursero';
                description = "Plateforme e-learning moderne dédiée aux cours en ligne et quiz interactifs avec suivi de progression.";
                repoLanguage = 'TypeScript';
              } else if (name.toLowerCase() === 'melvincr1') {
                name = '3PROJ_Supchat';
                link = 'https://github.com/MelvinCr1/3PROJ_Supchat';
                description = "Application et serveur de messagerie instantanée en temps réel et espaces collaboratifs d'équipe.";
                repoLanguage = 'TypeScript';
              }

              return { repo: name, link, description, language: repoLanguage, stars, forks };
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
              let repoLanguage = repo.language || "TypeScript";

              if (name.startsWith('MelvinCr1/')) {
                name = name.replace('MelvinCr1/', '');
              }

              if (name.toLowerCase() === 'remotehire') {
                name = '3LPIC_Coursero';
                link = 'https://github.com/MelvinCr1/3LPIC_Coursero';
                description = "Plateforme e-learning moderne dédiée aux cours en ligne et quiz interactifs avec suivi de progression.";
                repoLanguage = 'TypeScript';
              } else if (name.toLowerCase() === 'melvincr1') {
                name = '3PROJ_Supchat';
                link = 'https://github.com/MelvinCr1/3PROJ_Supchat';
                description = "Application et serveur de messagerie instantanée en temps réel et espaces collaboratifs d'équipe.";
                repoLanguage = 'TypeScript';
              }

              return {
                repo: name,
                link,
                description,
                language: repoLanguage,
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
          stars: "2",
          forks: "0"
        },
        {
          repo: "3PROJ_Supchat",
          link: "https://github.com/MelvinCr1/3PROJ_Supchat",
          description: "Application de messagerie collaborative hautement performante et sécurisée en temps réel (Supchat).",
          language: "TypeScript",
          stars: "3",
          forks: "1"
        },
        {
          repo: "4PROJ_Supfile",
          link: "https://github.com/MelvinCr1/4PROJ_Supfile",
          description: "Système académique robuste d'échange de fichiers sécurisés, intégrant des mécanismes d'authentification, de contrôle d'accès RBAC et une UI soignée.",
          language: "HTML",
          stars: "1",
          forks: "0"
        },
        {
          repo: "sysops-automation-toolkit",
          link: "https://github.com/MelvinCr1/sysops-automation-toolkit",
          description: "Toolbox de scripts d'automatisation (PowerShell pour environnement VMware vSphere, Bash pour systèmes GNU/Linux) d'industrialisation du MCO.",
          language: "PowerShell",
          stars: "2",
          forks: "1"
        }
      ];
      setGithubRepos(defaultPinned);
      setReposLoading(false);
    }

    fetchRepos();
  }, []);

  return (
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
        </div>

        {/* Dynamic Grid of GitHub Pinned Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 auto-rows-fr">
          {reposLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className={`border p-6 rounded-2xl space-y-4 animate-pulse ${
                theme === 'dark' ? 'border-white/[0.03] bg-slate-900/10' : 'border-slate-200 bg-white'
              }`}>
                <div className="flex justify-between items-center">
                  <div className={`h-4 rounded w-1/2 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`} />
                  <div className={`h-3 rounded w-1/6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`} />
                </div>
                <div className="space-y-2">
                  <div className={`h-3 rounded w-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`} />
                  <div className={`h-3 rounded w-5/6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`} />
                </div>
                <div className="flex gap-4 pt-2">
                  <div className={`h-3 rounded w-1/4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`} />
                  <div className={`h-3 rounded w-1/4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`} />
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
                'YAML': 'bg-pink-55 border-pink-200 text-pink-850 font-semibold'
              };
              const badgeStyle = langColors[repo.language] || (theme === 'dark' ? 'bg-slate-500/15 text-slate-400 border-slate-500/30' : 'bg-slate-100 text-slate-700 border-slate-200 font-semibold');

              return (
                <motion.div
                  key={`${repo.repo || 'repo'}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden border p-6 rounded-xl flex flex-col justify-between transition-all duration-200 ${
                    theme === 'dark'
                      ? 'border-slate-900/60 bg-slate-900/20 hover:border-slate-800 hover:bg-slate-900/40 shadow-none'
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
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
  );
}
