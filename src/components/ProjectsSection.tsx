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

  useEffect(() => {
    async function fetchRepos() {
      try {
        setReposLoading(true);
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
        ? 'border-neutral-900/50 bg-[#090a0c]/10' 
        : 'border-neutral-200/50 bg-neutral-100/10'
    }`}>
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Editorial Header (Section Number + Title) */}
        <div className="flex items-baseline gap-4 mb-14 border-b pb-4 transition-colors duration-300 border-neutral-200/50 dark:border-neutral-800/40">
          <span className={`font-mono text-xs font-bold ${
            theme === 'dark' ? 'text-[#00bd95]' : 'text-[#008f70]'
          }`}>02 /</span>
          <h2 className={`text-xl sm:text-2xl font-semibold tracking-tight uppercase transition-colors ${
            theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'
          }`}>{currentTranslation.projectsTitle}</h2>
        </div>

        {/* Dynamic Grid of GitHub Pinned Projects - Clean Technical panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          {reposLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className={`border p-6 rounded-lg space-y-4 animate-pulse ${
                theme === 'dark' ? 'border-neutral-900/40 bg-neutral-900/5' : 'border-neutral-200 bg-neutral-50/50'
              }`}>
                <div className="flex justify-between items-center">
                  <div className={`h-4 rounded w-1/2 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
                  <div className={`h-3 rounded w-1/6 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
                </div>
                <div className="space-y-2">
                  <div className={`h-3 rounded w-full ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
                  <div className={`h-3 rounded w-5/6 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-200'}`} />
                </div>
              </div>
            ))
          ) : (
            githubRepos.map((repo, idx) => {
              return (
                <motion.div
                  key={`${repo.repo || 'repo'}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className={`group relative border p-6.5 rounded-lg flex flex-col justify-between transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-neutral-850 bg-neutral-950/40 hover:border-neutral-700'
                      : 'border-neutral-200 bg-white hover:border-neutral-350 shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className={`text-base font-medium font-mono tracking-tight transition-colors ${
                        theme === 'dark' ? 'text-neutral-100 group-hover:text-[#00bd95]' : 'text-neutral-900 group-hover:text-[#008f70]'
                      }`}>
                        {repo.repo}
                      </h3>
                      
                      <span className={`text-[9px] font-mono border px-2 py-0.5 rounded uppercase font-semibold tracking-wider ${
                        theme === 'dark'
                          ? 'border-neutral-800 bg-[#00bd95]/10 text-[#00bd95]'
                          : 'border-neutral-200 bg-[#008f70]/5 text-[#008f70]'
                      }`}>
                        {repo.language}
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed font-light min-h-[44px] transition-colors ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {repo.description}
                    </p>
                  </div>

                  <div className={`flex justify-between items-center pt-4 border-t mt-6 transition-colors ${
                    theme === 'dark' ? 'border-neutral-900/60' : 'border-neutral-105'
                  }`}>
                    <div className="flex gap-4 font-mono text-[10px] text-neutral-500">
                      {repo.stars !== undefined && (
                        <span className="flex items-center gap-1">
                          <Star className={`h-3 w-3 ${
                            theme === 'dark' ? 'text-[#00bd95]' : 'text-[#008f70]'
                          }`} />
                          <span>{repo.stars}</span>
                        </span>
                      )}
                      {repo.forks !== undefined && (
                        <span className="flex items-center gap-1 animate-none">
                          <GitFork className="h-3 w-3 text-neutral-500" />
                          <span>{repo.forks}</span>
                        </span>
                      )}
                    </div>

                    <a
                      href={repo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                        theme === 'dark'
                          ? 'text-[#00bd95] hover:text-[#2ae3c0]'
                          : 'text-[#008f70] hover:text-[#00aa85]'
                      }`}
                    >
                      <span>{language === 'FR' ? 'Accéder' : language === 'EN' ? 'Visit' : 'Visitar'}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
