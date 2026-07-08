import { Language, TranslationSet } from './types';

export const translations: Record<Language, TranslationSet> = {
  FR: {
    role: "Ingénieur SysOps & Cloud",
    status: "Alternant chez Cloud Temple",
    aboutText: "Étudiant de Master à SUPINFO Tours, je suis passionné par l'automatisation, la fiabilité et la sécurité des environnements Cloud. Je me spécialise dans la conception d'architectures à haute disponibilité (VMware, Azure, AWS, Private Cloud) et le maintien en conditions opérationnelles de systèmes critiques, tout en garantissant les bonnes pratiques réglementaires SecNumCloud et l'application rigoureuse des principes ITIL.",
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
    copyright: "© 2026 Melvin Cureau. Tous droits réservés.",

    // Experiences Data
    experiences: [
      {
        period: "Septembre 2025 - Présent",
        company: "Cloud Temple",
        role: "Ingénieur SysOps (Alternance)",
        location: "Tours, France · Sur site",
        details: [
          "Maintien en Conditions Opérationnelles (MCO) d'un pool de +7 clients récurrents : gestion autonome du RUN (changements systèmes/réseaux, supervision active) et résolution d'incidents complexes.",
          "BUILD & Gestion de Projet : Pilotage autonome de projets techniques d'évolution d'infrastructure et d'intégration de nouvelles architectures, incluant la planification, le déploiement opérationnel et la relation client directe.",
          "Shifts transverses : Prise en charge des flux entrants de l'ensemble des squads, assurant l'analyse rapide des incidents, la résolution ou l'escalade qualifiée.",
          "Conformité & Architecture Cloud : Administration au sein d'environnements de Cloud Privé souverain, Cloud Public (Azure) et solutions hybrides, sous certifications exigeantes ISO-27001, SecNumCloud, PAMS, et HDS (Hébergement de Données de Santé)."
        ],
        tags: ["Haute Disponibilité", "SecNumCloud", "PAMS", "ISO 27001", "HDS", "Azure / Cloud Hybride", "VMware"]
      },
      {
        period: "Octobre 2024 - Septembre 2025",
        company: "Cloud Temple",
        role: "Ingénieur de Production (Alternance)",
        location: "Tours, France · Sur site",
        details: [
          "Prise en charge (PEC) de l'onboarding et intégration de nouveaux clients, conception de pipelines d'automatisation légers (scripts PowerShell/Bash).",
          "Industrialisation des processus répétitifs et déploiement d'outils d'Infrastructure-as-Code (Terraform, configurations Ansible pour l'application automatique de code).",
          "Résilience & Plan de Continuité d'Activité : Conduite et suivi d'un exercice complet de Plan de Reprise d'Activité (PRA) pour un client critique afin de valider et sécuriser les protocoles de bascule."
        ],
        tags: ["Terraform", "Ansible", "PRA (Disaster Recovery)", "Automation"]
      },
      {
        period: "Juillet 2024 - Septembre 2024",
        company: "Cloud Temple",
        role: "Ingénieur de Production (Stage)",
        location: "Tours, France · Sur site",
        details: [
          "Immersion opérationnelle N2 sur l'analyse proactive des métriques de performance, réduction du MTTR (temps moyen de résolution) et maintien de l'uptime.",
          "Développement de scripts d'automatisation rapides (Bash et Python) pour le monitoring actif et le traitement automatique des alertes récurrentes."
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
    aboutText: "Master's student at SUPINFO Tours, I am driven by the automation, reliability, and security of modern Cloud Environments. I specialize in designing high-availability server topologies (VMware, Azure, AWS, Private Cloud) and executing the continuous maintenance (MCO) of highly critical systems while fully respecting regulatory standards like ANSSI SecNumCloud and the core principles of ITIL.",
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
    copyright: "© 2026 Melvin Cureau. All rights reserved.",

    // Experiences Data
    experiences: [
      {
        period: "September 2025 - Present",
        company: "Cloud Temple",
        role: "SysOps Engineer (Apprenticeship)",
        location: "Tours, France · On-site",
        details: [
          "Managed continuous operations (MCO) and the RUN phase for a dedicated pool of +7 recurring enterprise clients, handling complex systems/networks and incidents.",
          "BUILD & Project Management: Autonomous leadership of technical transformation projects, infrastructure upgrades, and new architectures deployment while driving complete customer relations.",
          "Rotation-based shifts: Handling all incoming cloud incidents from all squads, delivering fast triaging, L2/L3 resolution, or escalation.",
          "Compliance & Cloud Architecture: System and network administration across sovereign Private Cloud, Public Cloud (Azure), and hybrid models under strict ISO-27001, SecNumCloud, PAMS, and HDS (Healthcare Data Hosting) regulatory certifications."
        ],
        tags: ["High Availability", "SecNumCloud", "PAMS", "ISO 27001", "HDS", "Azure / Hybrid Cloud", "VMware"]
      },
      {
        period: "October 2024 - September 2025",
        company: "Cloud Temple",
        role: "Production Engineer (Apprenticeship)",
        location: "Tours, France · On-site",
        details: [
          "Managed client onboarding & system integration (PEC) processes, crafting automated helper pipelines via PowerShell and Bash scripts.",
          "Industrialized routine operational tasks and deployed Infrastructure-as-Code setups (using Terraform and Ansible configurations for automated code application).",
          "Resilience & Business Continuity: Successfully coordinated and executed a full Disaster Recovery (PRA) simulation for a critical client to validate failover protocols and secure systems."
        ],
        tags: ["Terraform", "Ansible", "Disaster Recovery (PRA)", "Automation"]
      },
      {
        period: "July 2024 - September 2024",
        company: "Cloud Temple",
        role: "Production Engineer (Internship)",
        location: "Tours, France · On-site",
        details: [
          "Dived into N2 operational diagnostics, proactive system performance analytics, and efforts targeting lower Mean Time to Resolution (MTTR).",
          "Programmed quick administration tools in Python and Bash for continuous infrastructure health checks and automated incident mitigation."
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
    aboutText: "Estudiante de Máster en SUPINFO Tours, me apasiona la automatización, seguridad y fiabilidad en infraestructuras Cloud. Me especializo en el diseño de arquitecturas robustas de alta disponibilidad (VMware, Azure, AWS, Private Cloud) y en el mantenimiento en condiciones operativas de sistemas altamente críticos aplicando rigurosos estándares regulados como SecNumCloud y la aplicación de los principios de ITIL.",
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
    copyright: "© 2026 Melvin Cureau. Todos los derechos reservados.",

    // Experiences Data
    experiences: [
      {
        period: "Septiembre de 2025 - Presente",
        company: "Cloud Temple",
        role: "Ingeniero SysOps (Aprendizaje)",
        location: "Tours, Francia · Presencial",
        details: [
          "Mantenimiento en condiciones operativas (MCO) de un grupo de +7 clientes recurrentes: gestión autónoma del RUN (cambios de sistemas/redes, monitorización activa) y resolución de incidencias.",
          "BUILD y Gestión de Proyectos: Liderazgo autónomo de proyectos técnicos de evolución de infraestructura e integración de nuevas arquitecturas, que incluye la planificación, el despliegue operativo y la relación directa con el cliente.",
          "Shift rotativo: Soporte centralizado para todas las squads, asegurando un análisis rápido de alertas entrantes, remediación inmediata o escalado de nivel 2/3.",
          "Cumplimiento y Arquitectura Cloud: Administración de sistemas y redes en entornos de Cloud Privado soberano, Cloud Público (Azure) y soluciones híbridas, bajo las exigentes certificaciones ISO-27001, SecNumCloud, PAMS y certificación HDS (Alojamiento de Datos de Salud)."
        ],
        tags: ["Alta Disponibilidad", "SecNumCloud", "PAMS", "ISO 27001", "HDS", "Azure / Cloud Híbrido", "VMware"]
      },
      {
        period: "Octubre de 2024 - Septiembre de 2025",
        company: "Cloud Temple",
        role: "Ingeniero de Production (Aprendizaje)",
        location: "Tours, Francia · Presencial",
        details: [
          "Gestión del onboarding e integración de nuevos clientes (PEC), diseñando flujos automatizados de aprovisionamiento con PowerShell y Bash.",
          "Industrialización de operaciones habituales y despliegue de Infraestructura como Código (usando Terraform y configuraciones Ansible para la aplicación automática de código).",
          "Resiliencia y Continuidad de Negocio: Ejecución y seguimiento de una prueba completa de Plan de Recuperación ante Desastres (PRA) para un cliente crítico con el fin de validar y asegurar los protocolos de recuperación de sistemas."
        ],
        tags: ["Terraform", "Ansible", "Planes de Recuperación (PRA)", "Automation"]
      },
      {
        period: "Julio de 2024 - Septiembre de 2024",
        company: "Cloud Temple",
        role: "Ingeniero de Production (Prácticas)",
        location: "Tours, Francia · Presencial",
        details: [
          "Análisis operativo N2 centrado en la monitorización proactiva, optimización de alarmas y reducción del tiempo medio de resolución (MTTR).",
          "Desarrollo de scripts de automatización rápidos (Bash y Python) para el diagnóstico continuo del estado del sistema y mitigación automática de alertas recurrentes."
        ],
        tags: ["Python", "Bash Scripting", "Proactive Alerting", "Incident Management"]
      },
      {
        period: "Julio de 2023 - Agosto de 2023",
        company: "Polyexpert Construction",
        role: "Prácticas de Gestión de Sistemas de Información",
        location: "Tours, France · Presencial",
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
