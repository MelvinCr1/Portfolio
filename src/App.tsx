import { useState, FormEvent, ReactNode } from 'react';
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
  FolderLock, 
  Cloud, 
  Sliders, 
  AlertCircle
} from 'lucide-react';

type Language = 'FR' | 'EN' | 'ES';

export default function App() {
  const [language, setLanguage] = useState<Language>('FR');
  const [cvTab, setCvTab] = useState<'all' | 'work' | 'education' | 'skills'>('all');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isCvExpanded, setIsCvExpanded] = useState(false);
  
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

  // Translations
  const t = {
    FR: {
      role: "Ingénieur SysOps & Cloud",
      status: "Alternant chez Cloud Temple",
      aboutText: "Étudiant de Master à SUPINFO Tours, je suis passionné par l'automatisation, la fiabilité et la sécurité des environnements Cloud. Je me spécialise dans la conception d'architectures à haute disponibilité (VMware, Azure, AWS, Private Cloud) et le maintien en conditions opérationnelles de systèmes critiques, tout en garantissant les bonnes pratiques réglementaires SecNumCloud.",
      navCV: "Parcours (CV)",
      navProjects: "Projets",
      navContact: "Contact",
      downloadLabel: "Télécharger mon CV (PDF)",
      viewGithub: "Mon GitHub",
      viewLinkedin: "Mon LinkedIn",
      
      // CV Section
      titleCV: "Expériences & Formations",
      subtitleCV: "Une trajectoire centrée sur la performance et la fiabilité des SI",
      viewAll: "Tout le parcours",
      tabWork: "Expériences Pro",
      tabEdu: "Formations",
      tabSkills: "Habilités",
      certifications: "Certifications",
      presentLabel: "Aujourd'hui",
      gradLabel: "Baccalauréat",

      // Projects Section
      projectsTitle: "Projets & Réalisations",
      projectsSubtitle: "Aucun projet public pour le moment...",
      projectsText: "Mes travaux et fichiers d'infrastructures les plus récents (playbooks Ansible complexes, modules Terraform d'entreprise, plans d'architecture de production) sont exécutés au sein de la squad d'ingénierie chez Cloud Temple, sous accord de non-divulgation (NDA) pour le respect de la confidentialité de nos clients.",
      projectsCTA: "Suivre mes contributions sur GitHub",

      // Contact Section
      contactTitle: "Entrons en contact",
      contactSub: "Une opportunité professionnelle, un retour technique, ou besoin d'en savoir plus ?",
      fieldName: "Nom",
      fieldEmail: "Adresse e-mail",
      fieldSubject: "Sujet",
      fieldMessage: "Votre message",
      btnSend: "Envoyer le message",
      btnSending: "Acheminement en cours...",
      btnShowMore: "Voir plus",
      btnShowLess: "Voir moins",
      formSuccess: "Message transmis avec succès ! Je reviens vers vous rapidement.",

      // Experiences Data
      experiences: [
        {
          period: "Septembre 2025 - Présent",
          company: "Cloud Temple",
          role: "Ingénieur SysOps (Alternance)",
          location: "Tours, France · Sur site",
          details: [
            "Maintien en conditions opérationnelles (MCO) d'environnements virtualisés VMware complexes et infrastructures Cloud.",
            "Industrialisation des processus répétitifs via des scripts d'automatisation (Systems Management & Infrastructure-as-Code).",
            "Suivi rigoureux et optimisation des performances réseau sous fortes contraintes de gouvernance.",
            "Application continue des normes strictes de cybersécurité SecNumCloud et PAMS."
          ],
          tags: ["PowerShell", "VMware", "Azure", "Automation", "SecNumCloud"]
        },
        {
          period: "Octobre 2024 - Septembre 2025",
          company: "Cloud Temple",
          role: "Ingénieur de Production (Alternance)",
          location: "Tours, France · Sur site",
          details: [
            "Gestion proactive des incidents complexes de production système de Niveaux 2 et 3 selon les SLAs définis (GTI/GTR).",
            "Participation active aux projets transversaux de migration de SI clients et élaboration de documents d'architecture (DAT, DEX).",
            "Aide au conseil en intégration d’éléments d'architecture complexe pour quantifier la charge projet du SI client."
          ],
          tags: ["Linux", "Windows Server", "SLA Enforcement", "Architecture DAT/DEX"]
        },
        {
          period: "Juillet 2024 - Septembre 2024",
          company: "Cloud Temple",
          role: "Ingénieur de Production (Stage)",
          location: "Tours, France · Sur site",
          details: [
            "Immersion technique centrée sur l'analyse, l'alerte d'incidents, et le maintien de la disponibilité client.",
            "Développement de scripts d'exploitation d'infrastructure rapides en Bash et Python.",
            "Résolution active de tickets de gestion d'incidents serveurs Nivesu 2 (systèmes virtualisés)."
          ],
          tags: ["Python", "Bash Scripting", "Proactive Alerting", "Incident Management"]
        },
        {
          period: "Juillet 2023 - Août 2023",
          company: "Polyexpert Construction",
          role: "Stage Gestion des Systèmes d'information",
          location: "Tours, France · Sur site",
          details: [
            "Mise à jour essentielle, nettoyage, et restructuration complète de la base de données métier.",
            "Mise en place d'outils d'analyse des bases de données et élaboration de rapports statistiques.",
            "Accompagnement du RSI dans le déploiement et l'administration de passerelles collaboratives SharePoint."
          ],
          tags: ["SQL", "SharePoint", "Data Analysis", "IT Administration"]
        }
      ],

      // Educations Data
      educations: [
        {
          period: "2022 - 2027",
          school: "SUPINFO (Campus de Tours)",
          degree: "Master Expert en informatique & Système d'information",
          specialty: "Ingénierie informatique · Spécialité Architecture Cloud, Systèmes et Réseaux",
          details: "Formation d'excellence axée sur l'ingénierie système, l'orchestration de conteneurs, la supervision d'infrastructures virtualisées complexes d'entreprise et la conformité SecOps."
        },
        {
          period: "2019 - 2022",
          school: "Lycée Balzac Tours",
          degree: "Baccalauréat général",
          specialty: "Spécialités Mathématiques & SES",
          details: "Obtenu avec mention Assez Bien. Renforcement des logiques scientifiques."
        }
      ]
    },
    EN: {
      role: "SysOps & Cloud Engineer",
      status: "Apprentice at Cloud Temple",
      aboutText: "Master's student at SUPINFO Tours, I am driven by the automation, reliability, and security of modern Cloud Environments. I specialize in designing high-availability server topologies (VMware, Azure, AWS, Private Cloud) and executing the continuous maintenance (MCO) of highly critical systems while fully respecting regulatory standards like ANSSI SecNumCloud.",
      navCV: "Background (CV)",
      navProjects: "Projects",
      navContact: "Contact",
      downloadLabel: "Download Resume (PDF)",
      viewGithub: "My GitHub",
      viewLinkedin: "My LinkedIn",
      
      // CV Section
      titleCV: "Experience & Education",
      subtitleCV: "An engineering trajectory focused on performance and reliability",
      viewAll: "All Background",
      tabWork: "Experience",
      tabEdu: "Education",
      tabSkills: "Skills Spectrum",
      certifications: "Certifications",
      presentLabel: "Present",
      gradLabel: "High School Degree",

      // Projects Section
      projectsTitle: "Projects & Showcases",
      projectsSubtitle: "No public projects at the moment...",
      projectsText: "Most of my recent orchestration playbooks (complex Ansible roles, advanced corporate Terraform directories, HA topology drawings) are hosted privately inside Cloud Temple's enterprise engineering team under strict NDAs, ensuring the maximum security of our clients' architectures.",
      projectsCTA: "Follow my general updates on GitHub",

      // Contact Section
      contactTitle: "Get in touch",
      contactSub: "Have a career opportunity, a technical proposal, or want to discuss a project?",
      fieldName: "Name",
      fieldEmail: "Email address",
      fieldSubject: "Subject",
      fieldMessage: "Your message",
      btnSend: "Send Message",
      btnSending: "Sending securely...",
      btnShowMore: "Show more",
      btnShowLess: "Show less",
      formSuccess: "Your message has been successfully sent. I will return to you shortly.",

      // Experiences Data
      experiences: [
        {
          period: "September 2025 - Present",
          company: "Cloud Temple",
          role: "SysOps Engineer (Apprenticeship)",
          location: "Tours, France · On-site",
          details: [
            "Coordinated maintenance (MCO) for highly dense corporate VMware clusters and cloud hypervisors.",
            "Industrialized repetitive infrastructure workloads through automation (Systems Management & Infrastructure-as-code).",
            "Supervised performance stats and system health diagnostics under intense availability constraints.",
            "Aligned operations with strict SecNumCloud guidelines and privileged access management (PAMS)."
          ],
          tags: ["PowerShell", "VMware", "Azure", "Automation", "SecNumCloud"]
        },
        {
          period: "October 2024 - September 2025",
          company: "Cloud Temple",
          role: "Production Engineer (Apprenticeship)",
          location: "Tours, France · On-site",
          details: [
            "Investigated and resolved complex system production alerts across L2 and L3 based on SLAs (GTI/GTR requirements).",
            "Assisted clients during full migrations and compiled architectural documents (DAT, DEX blueprints).",
            "Helped evaluate client project scopes and map precise resource demands across diverse SI."
          ],
          tags: ["Linux", "Windows Server", "SLA Enforcement", "Architecture DAT/DEX"]
        },
        {
          period: "July 2024 - September 2024",
          company: "Cloud Temple",
          role: "Production Engineer (Internship)",
          location: "Tours, France · On-site",
          details: [
            "Dived deep into technical incident diagnostics, live system recovery, and hypervisor uptime analysis.",
            "Wrote localized administrative tools and pipeline helpers utilizing Bash and Python.",
            "Handled system incident queues (L2 tasks) to stabilize multi-tenant architectures."
          ],
          tags: ["Python", "Bash Scripting", "Proactive Alerting", "Incident Management"]
        },
        {
          period: "July 2023 - August 2023",
          company: "Polyexpert Construction",
          role: "Information Systems Management Intern",
          location: "Tours, France · On-site",
          details: [
            "Refactored key corporate databases to improve query performance and schema cleanliness.",
            "Built data analysis views and constructed reliable statistical overviews for executives.",
            "Helped introduce and customize internal collaborative SharePoint modern interfaces."
          ],
          tags: ["SQL", "SharePoint", "Data Analysis", "IT Administration"]
        }
      ],

      // Educations Data
      educations: [
        {
          period: "2022 - 2027",
          school: "SUPINFO (Campus de Tours)",
          degree: "Master's Degree in Software Engineering",
          specialty: "Cloud Architecture, Network Systems, and Security Engineering Stream",
          details: "Rigorous curriculum centering enterprise network virtualization, containers orchestration, high-availability setups, and proactive SecOps compliance."
        },
        {
          period: "2019 - 2022",
          school: "Lycée Balzac Tours",
          degree: "Baccalauréat (General Scientific Focus)",
          specialty: "Advanced Mathematics & Social Sciences (SES)",
          details: "Obtained with Honors ( assez bien ). Strengthened analytics and model building logic."
        }
      ]
    },
    ES: {
      role: "Ingeniero SysOps y Cloud",
      status: "Aprendiz en Cloud Temple",
      aboutText: "Estudiante de Máster en SUPINFO Tours, me apasiona la automatización, seguridad y fiabilidad en infraestructuras Cloud. Me especializo en el diseño de arquitecturas robustas de alta disponibilidad (VMware, Azure, AWS, Private Cloud) y en el mantenimiento en condiciones operativas de sistemas altamente críticos aplicando rigurosos estándares regulados como SecNumCloud.",
      navCV: "Trayectoria (CV)",
      navProjects: "Proyectos",
      navContact: "Contacto",
      downloadLabel: "Descargar mi CV (PDF)",
      viewGithub: "Mi GitHub",
      viewLinkedin: "Mi LinkedIn",
      
      // CV Section
      titleCV: "Experiencias y Formación",
      subtitleCV: "Una trayectoria de ingeniería enfocada en el rendimiento y disponibilidad del SI",
      viewAll: "Toda la trayectoria",
      tabWork: "Experience Pro",
      tabEdu: "Estudios",
      tabSkills: "Habilidades",
      certifications: "Certificaciones",
      presentLabel: "Actualidad",
      gradLabel: "Bachillerato",

      // Projects Section
      projectsTitle: "Proyectos e Ingeniería",
      projectsSubtitle: "Ningún proyecto público por el momento...",
      projectsText: "La gran mayoría de mis desarrollos recientes (playbooks complejos de Ansible, repositorios corporativos de Terraform y diagramas de topología de producción) se ejecutan de manera privada dentro del equipo de ingeniería de Cloud Temple bajo contratos de confidencialidad estricta (NDA) para resguardar la seguridad de nuestros clientes de nivel institucional.",
      projectsCTA: "Ver actualizaciones generales en GitHub",

      // Contact Section
      contactTitle: "Contáctame",
      contactSub: "¿Tienes una oferta laboral, propuesta tecnológica o quieres conversar sobre un proyecto?",
      fieldName: "Nombre",
      fieldEmail: "Correo electrónico",
      fieldSubject: "Asunto",
      fieldMessage: "Tu mensaje",
      btnSend: "Enviar Mensaje",
      btnSending: "Enviando de forma segura...",
      btnShowMore: "Ver más",
      btnShowLess: "Ver menos",
      formSuccess: "¡Mensaje enviado con éxito! Me pondré en contacto contigo a la brevedad.",

      // Experiences Data
      experiences: [
        {
          period: "Septiembre de 2025 - Presente",
          company: "Cloud Temple",
          role: "Ingeniero SysOps (Aprendizaje)",
          location: "Tours, Francia · Presencial",
          details: [
            "Mantenimiento en condiciones operativas (MCO) de clústeres complejos de VMware e infraestructuras del cloud privado.",
            "Industrialización de cargas de trabajo habituales mediante el uso de automatizaciones de Infraestructura como Código (IaC).",
            "Supervisión continua del estado de red bajo demandas críticas de rendimiento y disponibilidad.",
            "Cumplimiento sistemático de las normativasSecNumCloud y de control de accesos directos PAMS."
          ],
          tags: ["PowerShell", "VMware", "Azure", "Automation", "SecNumCloud"]
        },
        {
          period: "Octubre de 2024 - Septiembre de 2025",
          company: "Cloud Temple",
          role: "Ingeniero de Producción (Aprendizaje)",
          location: "Tours, Francia · Presencial",
          details: [
            "Análisis y solución de alertas críticas de producción correspondientes a niveles 2 y 3 basándose en SLAs (tiempos GTI/GTR).",
            "Participación estrecha en proyectos de migración completa e integración para grandes clientes e informes de arquitectura (DAT, DEX).",
            "Soporte en preventa técnica para la cuantificación y planificación de proyectos de TI para grandes organizaciones."
          ],
          tags: ["Linux", "Windows Server", "SLA Enforcement", "Architecture DAT/DEX"]
        },
        {
          period: "Julio de 2024 - Septiembre de 2024",
          company: "Cloud Temple",
          role: "Ingeniero de Producción (Prácticas)",
          location: "Tours, Francia · Presencial",
          details: [
            "Inmersión técnica orientada a la rápida resolución de incidentes, análisis operativo y alta disponibilidad.",
            "Construcción y empaquetado de herramientas internas utilizando Bash y Python.",
            "Resolución directa de colas de incidencias operando sobre sistemas de producción virtualizados."
          ],
          tags: ["Python", "Bash Scripting", "Proactive Alerting", "Incident Management"]
        },
        {
          period: "Julio de 2023 - Agosto de 2023",
          company: "Polyexpert Construction",
          role: "Prácticas de Gestión de Sistemas de Información",
          location: "Tours, Francia · Presencial",
          details: [
            "Actualización, limpieza de redundancia y rediseño completo de la base de datos central de negocios.",
            "Diseño de modelos analíticos sencillos del rendimiento empresarial para informes gráficos.",
            "Soporte al RSI en la implementación, parametrización y despliegue del portal moderno SharePoint."
          ],
          tags: ["SQL", "SharePoint", "Data Analysis", "IT Administration"]
        }
      ],

      // Educations Data
      educations: [
        {
          period: "2022 - 2027",
          school: "SUPINFO (Campus de Tours)",
          degree: "Máster Experto en Informática y Sistemas de Información",
          specialty: "Ingeniería Informática · Especialidad Arquitectura Cloud, Redes y Sistemas",
          details: "Formación de primer nivel centrada en gestión de virtualización empresarial extendida, orquestación, redes de alta resiliencia y SecOps."
        },
        {
          period: "2019 - 2022",
          school: "Lycée Balzac Tours",
          degree: "Bachillerato General",
          specialty: "Área de Matemáticas Avanzadas y Economía (SES)",
          details: "Culminado con honores ( bastante bien ). Sólida base analítica."
        }
      ]
    }
  };

  const currentTranslation = t[language];

  // Contact simulated submit
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-300 font-sans antialiased overflow-x-hidden selection:bg-teal-500/30 selection:text-white">
      
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
          className="absolute top-[-250px] left-[12%] w-[550px] h-[550px] rounded-full bg-teal-500/5 shadow-[0_0_120px_rgba(20,184,166,0.15)] blur-[120px]" 
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
          className="absolute top-[-200px] right-[15%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 shadow-[0_0_120px_rgba(99,102,241,0.15)] blur-[120px]" 
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
          className="absolute top-[800px] right-[10%] w-[600px] h-[600px] rounded-full bg-teal-500/[0.03] shadow-[0_0_150px_rgba(20,184,166,0.06)] blur-[130px]" 
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
          className="absolute top-[1800px] left-[5%] w-[550px] h-[550px] rounded-full bg-indigo-500/[0.03] shadow-[0_0_150px_rgba(99,102,241,0.06)] blur-[130px]" 
        />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-[#090a0f]/85 backdrop-blur-md border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Main Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex flex-col">
              <span className="text-white font-bold leading-none tracking-tight text-base block group-hover:text-teal-400 transition-colors">Melvin Cureau</span>
            </div>
          </motion.div>

          {/* Nav menu links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-slate-400">
            <a href="#cv-section" className="hover:text-white transition-colors py-1 relative group">
              {currentTranslation.navCV}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#projects-section" className="hover:text-white transition-colors py-1 relative group">
              {currentTranslation.navProjects}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#contact-section" className="hover:text-white transition-colors py-1 relative group">
              {currentTranslation.navContact}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300" />
            </a>
          </nav>

          {/* Premium dropdown language selector */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 bg-slate-950 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer shadow-md select-none"
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
                    className="absolute right-0 mt-2 w-36 bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-1 z-50 overflow-hidden"
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
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
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
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400"
          >
            {currentTranslation.role}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-light"
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
              className="px-6 py-3 bg-slate-900 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg hover:shadow-xl"
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
          <h2 className="text-3xl font-bold text-white tracking-tight uppercase leading-none">{currentTranslation.titleCV}</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">{currentTranslation.subtitleCV}</p>
        </div>

        {/* Tab selector buttons */}
        <div className="flex bg-slate-950 border border-white/5 p-1 rounded-2xl max-w-md mx-auto mb-12 shadow-2xl relative overflow-hidden">
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
                    className="absolute inset-0 bg-slate-900 border border-white/10 rounded-xl shadow-lg"
                    transition={{ type: "spring", stiffness: 140, damping: 20 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-teal-400 font-extrabold' : 'text-slate-400 hover:text-slate-300'}`}>
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
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-teal-400" />
                    {currentTranslation.tabWork}
                  </h3>

                  <div className="space-y-6 border-l border-slate-800 ml-3 pl-6">
                    {(isCvExpanded ? currentTranslation.experiences : currentTranslation.experiences.slice(0, 2)).map((exp, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ y: -3 }}
                        className="relative group bg-slate-900/40 border border-white/[0.04] p-5 rounded-2xl hover:border-teal-500/20 hover:bg-slate-900/60 shadow-lg hover:shadow-[0_20px_45px_-12px_rgba(20,184,166,0.12)] transition-all duration-300"
                      >
                        {/* Timeline point indicator */}
                        <div className="absolute -left-[31px] top-7 w-[9px] h-[9px] border-2 border-teal-400 bg-[#090a0f] rounded-full group-hover:scale-130 transition-transform" />
                        
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block mb-1">{exp.period}</span>
                            <h4 className="text-white text-base font-bold tracking-tight">{exp.role}</h4>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-950 border border-white/5 rounded-lg text-slate-300">
                            {exp.company}
                          </span>
                        </div>

                        <p className="text-3xs font-mono text-slate-500 flex items-center gap-1.5 mt-1">
                          <Globe className="h-3 w-3 text-slate-600" />
                          {exp.location}
                        </p>

                        <ul className="space-y-2 mt-4">
                          {exp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="text-slate-400 text-xs leading-relaxed flex items-start gap-2">
                              <span className="text-teal-400 mt-1.5 shrink-0 block w-1 h-1 rounded-full bg-teal-400" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 pt-4">
                          {exp.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 border border-white/5 bg-slate-950 text-slate-400 rounded-md">
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
                  <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-indigo-400" />
                    {currentTranslation.tabEdu}
                  </h3>

                  <div className="space-y-5 border-l border-slate-800 ml-3 pl-6">
                    {(isCvExpanded ? currentTranslation.educations : currentTranslation.educations.slice(0, 1)).map((edu, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ y: -3 }}
                        className="relative group bg-slate-900/40 border border-white/[0.04] p-5 rounded-2xl hover:border-indigo-500/20 hover:bg-slate-900/60 shadow-lg hover:shadow-[0_20px_45px_-12px_rgba(99,102,241,0.12)] transition-all duration-300"
                      >
                        {/* Bullet point */}
                        <div className="absolute -left-[31px] top-7 w-[9px] h-[9px] border-2 border-indigo-500 bg-[#090a0f] rounded-full group-hover:scale-130 transition-transform" />
                        
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block mb-1">{edu.period}</span>
                            <h4 className="text-white text-base font-bold tracking-tight">{edu.degree}</h4>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-950 border border-white/5 rounded-lg text-slate-300">
                            {edu.school}
                          </span>
                        </div>

                        <p className="text-xs text-indigo-300 font-mono mt-1 font-semibold">{edu.specialty}</p>
                        <p className="text-slate-400 text-xs mt-3 leading-relaxed font-light">{edu.details}</p>
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
                className="group flex items-center gap-2 px-5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-white/10 hover:border-teal-500/30 text-xs font-mono font-bold text-slate-300 hover:text-teal-400 transition-all rounded-xl cursor-pointer shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_-2px_rgba(20,184,166,0.1)] active:scale-95 select-none"
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
            <div className="border border-white/[0.04] bg-slate-900/30 p-6 rounded-2xl shadow-xl hover:shadow-[0_20px_50px_rgba(20,184,166,0.05)] transition-all duration-300 space-y-4">
              <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Award className="h-4.5 w-4.5 text-teal-400 animate-pulse" />
                {currentTranslation.certifications}
              </h3>

              <div className="space-y-3">
                {/* AZ-900 Certification */}
                <div className="bg-slate-950 border border-white/5 px-4 py-3 rounded-xl hover:border-blue-500/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="text-white text-xs font-bold font-mono">Microsoft Azure (AZ-900)</span>
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
            <div className="border border-white/[0.04] bg-slate-900/30 p-6 rounded-2xl shadow-xl space-y-6">
              <h3 className="text-xs font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="h-4.5 w-4.5 text-indigo-400" />
                <span>Habilités techniques</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">DevOps & Automation</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Docker", "Kubernetes", "Terraform", "Ansible", "GitLab CI", "PowerShell", "Bash"].map((s) => (
                      <span key={s} className="text-[10px] font-mono px-2.5 py-1 bg-slate-950 border border-white/5 rounded-lg text-slate-300 hover:border-teal-500/20 transition-colors">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">Cloud & Virtualization</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Azure", "Google Cloud", "AWS", "VMware", "Linux Server", "Windows Server"].map((s) => (
                      <span key={s} className="text-[10px] font-mono px-2.5 py-1 bg-slate-950 border border-white/5 rounded-lg text-slate-300 hover:border-indigo-500/20 transition-colors">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2 font-bold tracking-wider">Monitoring & Ops</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Grafana", "Prometheus", "DAT/DEX Blueprints", "Jira & Confluence"].map((s) => (
                      <span key={s} className="text-[10px] font-mono px-2.5 py-1 bg-slate-950 border border-white/5 rounded-lg text-slate-300 hover:border-teal-500/20 transition-colors">
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
      <section id="projects-section" className="relative py-20 border-t border-white/[0.04] bg-slate-950/20 scroll-mt-12">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl font-bold text-white tracking-tight uppercase leading-none">{currentTranslation.projectsTitle}</h2>
          </div>

          {/* Minimalist "No projects for now" notification block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden border border-white/[0.04] bg-gradient-to-br from-slate-900/60 to-slate-950/60 p-8 md:p-12 rounded-3xl shadow-[2px_15px_60px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center gap-8"
          >
            {/* Ambient background glow inside cards */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full" />
            
            {/* Graphic Icon */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center shrink-0 shadow-lg relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-500 blur opacity-15" />
              <FolderLock className="h-10 w-10 text-teal-400 relative z-10" />
            </div>

            {/* Description details */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h3 className="text-white text-lg font-bold font-sans uppercase tracking-tight">{currentTranslation.projectsSubtitle}</h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl font-light">
                {currentTranslation.projectsText}
              </p>
              
              <div className="pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-xs font-mono font-bold tracking-wide uppercase transition-colors"
                >
                  {currentTranslation.projectsCTA}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* SECTION 3: CONTACT FORM */}
      <section id="contact-section" className="relative py-20 px-6 border-t border-white/[0.04] scroll-mt-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight uppercase leading-none">{currentTranslation.contactTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Info Column */}
            <div className="md:col-span-5 space-y-6">
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {currentTranslation.contactSub}
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-slate-900/30 border border-white/[0.04] rounded-2xl flex items-center gap-3">
                  <Mail className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                  <span className="text-slate-300 truncate font-light select-all">melvin.cureau2004@gmail.com</span>
                </div>
                <div className="p-4 bg-slate-900/30 border border-white/[0.04] rounded-2xl flex items-center gap-3">
                  <Globe className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                  <span className="text-slate-300 font-light">Tours, France</span>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/in/melvin-cureau-83a812252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Linkedin className="h-4 w-4 text-teal-400" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Github className="h-4 w-4 text-slate-300" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="md:col-span-7">
              <form onSubmit={handleContactSubmit} className="border border-white/[0.04] bg-slate-900/20 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldName}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white text-xs font-sans focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all font-light"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldEmail}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white text-xs font-sans focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all font-light"
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
                    className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white text-xs font-sans focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all font-light"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldMessage}</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-white text-xs font-sans focus:outline-none focus:border-teal-500/40 focus:ring-1 focus:ring-teal-500/40 transition-all resize-none font-light"
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
      <footer className="relative bg-[#06070a] border-t border-white/[0.04] py-12 overflow-hidden shadow-[0_-15px_40px_rgba(0,0,0,0.4)]">
        {/* Design Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand & Signature info */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-white font-extrabold uppercase tracking-widest text-[11px] font-mono">Melvin Cureau</span>
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
              className="text-slate-500 hover:text-white transition-colors flex items-center gap-1 border-l border-white/10 pl-6 cursor-pointer"
            >
              <span>{language === 'FR' ? 'Retour en haut' : language === 'EN' ? 'Back to top' : 'Volver arriba'}</span>
              <span className="font-sans text-[11px] leading-none shrink-0 inline-block hover:translate-y-[-2px] transition-transform">↑</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
