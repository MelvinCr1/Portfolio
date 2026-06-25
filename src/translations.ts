import { Language, TranslationSet } from './types';

export const translations: Record<Language, TranslationSet> = {
  FR: {
    role: "Ingénieur SysOps & Cloud",
    status: "Alternant chez Cloud Temple",
    aboutText: "Étudiant de Master à SUPINFO Tours, je suis passionné par l'automatisation, la fiabilité et la sécurité des environnements Cloud. Je me spécialise dans la conception d'architectures à haute disponibilité (VMware, Azure, AWS, Private Cloud) et le maintien en conditions opérationnelles de systèmes critiques, tout en garantissant les bonnes pratiques réglementaires SecNumCloud.",
    navCV: "Parcours",
    navProjects: "Projets",
    navContact: "Contact",
    downloadLabel: "Télécharger mon CV (PDF)",
    viewGithub: "Mon GitHub",
    viewLinkedin: "Mon LinkedIn",
    
    // CV Section
    titleCV: "Expériences & Formations",
    subtitleCV: "",
    viewAll: "Tout le parcours",
    tabWork: "Expériences Pro",
    tabEdu: "Formations",
    tabSkills: "Habilités",
    certifications: "Certifications",
    presentLabel: "Aujourd'hui",
    gradLabel: "Baccalauréat",

    // Projects Section
    projectsTitle: "Projets & Réalisations",
    projectsSubtitle: "Dépôts publics épinglés",
    projectsText: "Accès direct à mes dépôts GitHub d'automatisation, d'IaC et de projets d'école ou d'ingénierie.",
    projectsCTA: "Suivre mes contributions sur GitHub",

    // Contact Section
    contactTitle: "Entrons en contact",
    contactSub: "Une opportunité professionnelle, un retour technique, ou besoin d'en savoir plus ?",
    fieldName: "Nom",
    fieldEmail: "Adresse e-mail",
    fieldSubject: "Sujet",
    fieldMessage: "Votre message",
    btnSend: "Envoyer le message",
    btnSending: "Chargement...",
    btnShowMore: "Voir plus",
    btnShowLess: "Voir moins",
    formSuccess: "Envoyé...",
    errName: "Le nom doit comporter entre 2 et 50 caractères.",
    errEmail: "Veuillez entrer une adresse e-mail valide et sécurisée.",
    errSubject: "Le sujet doit comporter entre 3 et 100 caractères.",
    errMessage: "Le message doit comporter entre 10 et 2000 caractères.",
    iframeNoticeTitle: "Impression dans l'aperçu",
    iframeNoticeText: "Pour imprimer ou enregistrer en PDF depuis l'aperçu de l'éditeur, veuillez ouvrir l'application dans un nouvel onglet en cliquant sur le bouton en haut à droite de l'aperçu (icône d'ouverture externe), puis cliquez à nouveau sur le bouton Télécharger.",
    iframeNoticeClose: "Compris",
    copyright: "© 2026 Melvin Cureau. Tous droits réservés. Protection de la propriété intellectuelle & lutte contre le plagiat.",

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
    navCV: "Background",
    navProjects: "Projects",
    navContact: "Contact",
    downloadLabel: "Download Resume (PDF)",
    viewGithub: "My GitHub",
    viewLinkedin: "My LinkedIn",
    
    // CV Section
    titleCV: "Experience & Education",
    subtitleCV: "",
    viewAll: "All Background",
    tabWork: "Experience",
    tabEdu: "Education",
    tabSkills: "Skills Spectrum",
    certifications: "Certifications",
    presentLabel: "Present",
    gradLabel: "High School Degree",

    // Projects Section
    projectsTitle: "Projects & Showcases",
    projectsSubtitle: "Public pinned repositories",
    projectsText: "Direct access to some of my automation repos, Terraform files, or school projects.",
    projectsCTA: "Follow my general updates on GitHub",

    // Contact Section
    contactTitle: "Get in touch",
    contactSub: "Have a career opportunity, a technical proposal, or want to discuss a project?",
    fieldName: "Name",
    fieldEmail: "Email address",
    fieldSubject: "Subject",
    fieldMessage: "Your message",
    btnSend: "Send Message",
    btnSending: "Loading...",
    btnShowMore: "Show more",
    btnShowLess: "Show less",
    formSuccess: "Sent...",
    errName: "Name must be between 2 and 50 characters.",
    errEmail: "Please enter a valid, safe email address.",
    errSubject: "Subject must be between 3 and 100 characters.",
    errMessage: "Message must be between 10 and 2000 characters.",
    iframeNoticeTitle: "Printing from Preview",
    iframeNoticeText: "To print or save as PDF from the editor's live preview, please open the application in a new tab by clicking the icon at the top right of the preview frame, then click the Download button again.",
    iframeNoticeClose: "Got it",
    copyright: "© 2026 Melvin Cureau. All rights reserved. Intellectual property protection & anti-plagiarism guard.",

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
    navCV: "Trayectoria",
    navProjects: "Proyectos",
    navContact: "Contacto",
    downloadLabel: "Descargar mi CV (PDF)",
    viewGithub: "Mi GitHub",
    viewLinkedin: "Mi LinkedIn",
    
    // CV Section
    titleCV: "Experiencias y Formación",
    subtitleCV: "",
    viewAll: "Toda la trayectoria",
    tabWork: "Experience Pro",
    tabEdu: "Estudios",
    tabSkills: "Habilidades",
    certifications: "Certificaciones",
    presentLabel: "Actualidad",
    gradLabel: "Bachillerato",

    // Projects Section
    projectsTitle: "Proyectos e Ingeniería",
    projectsSubtitle: "Repositorios públicos destacados",
    projectsText: "Acceso directo a mis repositorios públicos de automatizaciones, código Ansible/Terraform y proyectos.",
    projectsCTA: "Ver actualizaciones generales en GitHub",

    // Contact Section
    contactTitle: "Contáctame",
    contactSub: "¿Tienes una oferta laboral, propuesta tecnológica o quieres conversar sobre un proyecto?",
    fieldName: "Nombre",
    fieldEmail: "Correo electrónico",
    fieldSubject: "Asunto",
    fieldMessage: "Tu mensaje",
    btnSend: "Enviar Mensaje",
    btnSending: "Cargando...",
    btnShowMore: "Ver más",
    btnShowLess: "Ver menos",
    formSuccess: "¡Enviado!",
    errName: "El nombre debe tener entre 2 y 50 caracteres.",
    errEmail: "Por favor, introduce una dirección de correo válida y segura.",
    errSubject: "El asunto debe tener entre 3 y 100 caracteres.",
    errMessage: "El mensaje debe tener entre 10 y 2000 caracteres.",
    iframeNoticeTitle: "Impresión en la Vista Previa",
    iframeNoticeText: "Para imprimir o guardar como PDF desde la vista previa del editor, por favor abre la aplicación en una pestaña nueva haciendo clic en el icono superior derecho de la vista previa, luego haz clic de nuevo en Descargar.",
    iframeNoticeClose: "Entendido",
    copyright: "© 2026 Melvin Cureau. Todos los derechos reservados. Protección de propiedad intelectual y prevención del plagio.",

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
        role: "Ingeniero de Production (Aprendizaje)",
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
        role: "Ingeniero de Production (Prácticas)",
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
