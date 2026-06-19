import { useState, FormEvent } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  Award, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Send, 
  Globe, 
  Cpu, 
  Layers, 
  Lock, 
  Shield, 
  ShieldCheck, 
  Check, 
  Sliders, 
  Terminal,
  FileText
} from 'lucide-react';

type Language = 'FR' | 'EN' | 'ES';

export default function App() {
  const [language, setLanguage] = useState<Language>('FR');
  const [cvTab, setCvTab] = useState<'all' | 'work' | 'education' | 'skills'>('all');
  
  // Interactive Project 1: sovereign AI state
  const [aiModel, setAiModel] = useState<'llama' | 'mistral' | 'phi'>('llama');
  const [vramLimit, setVramLimit] = useState<number>(8);
  
  // Interactive Project 2: Terraform Blueprint Config
  const [multiRegion, setMultiRegion] = useState<boolean>(true);
  const [hsmSecure, setHsmSecure] = useState<boolean>(false);
  const [complianceType, setComplianceType] = useState<'standard' | 'secnumcloud'>('secnumcloud');

  // Interactive Project 3: Cryptography encryption sandbox
  const [cryptoText, setCryptoText] = useState<string>('Melvin Cureau 2026');
  const [cryptoResult, setCryptoResult] = useState<{ pub: string; priv: string; cipher: string } | null>(null);
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Dictionary translations
  const t = {
    FR: {
      role: "Architecte Sécurité Cloud & DevSecOps",
      status: "Recherche active : Alternance de fin d'études / Stage (Ingénieur Cybersécurité & Cloud)",
      aboutText: "Passionné par l'automatisation des infrastructures (IaC), le durcissement de systèmes (Linux, NixOS) et le déploiement sécurisé d'architectures d'IA locales et souveraines. Actuellement alternant chez Eviden Cybersecurity (Atos), je propose des briques de solutions résilientes répondant aux exigences les plus strictes.",
      navCV: "Parcours (CV)",
      navProjects: "Projets (PoCs)",
      navContact: "Contact",
      downloadLabel: "Télécharger CV (PDF)",
      viewGithub: "Github",
      viewLinkedin: "Linkedin",
      
      // CV Section
      viewAll: "Tout le Parcours",
      tabWork: "Expériences Pro",
      tabEdu: "Formations",
      tabSkills: "Compétences",
      certifications: "Certifications & Accréditations",
      activeLabel: "En cours / Actuel",
      endedLabel: "Diplômé / Terminé",
      
      // Projects Section
      projectsSubtitle: "Preuves de Concept (PoCs) Interactives",
      projectsIntro: "Mes projets ne sont pas de simples lignes dans un tableau. Activez les simulateurs intégrés pour observer mes configurations de pipelines IA rattachés au CPU/GPU, d'IaC modulaire et de cryptanalyse locale.",
      interactiveConfig: "Configurer le simulateur",
      modelChoice: "Modèle LLM local :",
      vramTitle: "VRAM allouée :",
      footprint: "Empreinte",
      threadsUsed: "Threads CPU",
      responseText: "Temps d'inférence moyen :",
      secLabel: "isolé hors-ligne sur nœud souverain",
      
      tfBlueprintTitle: "Orchestration Terraform Modulaire",
      tfToggleMulti: "Déploiement Multi-Région (HA)",
      tfToggleHSM: "Durcissement Clés HSM",
      tfToggleCompliance: "Niveau de conformité :",
      tfOutputPreview: "Fichier de Configuration Généré :",
      
      cryptoTitle: "Cryptographie Post-Quantique (NIST KEM)",
      cryptoLabelInput: "Texte à chiffrer :",
      cryptoEncryptBtn: "Chiffrer le message (Kyber-1024)",
      cryptoEncSuccess: "Message chiffré dans la sandbox client !",
      cryptoPublicKey: "Clé Publique (Kyber-1024)",
      cryptoCiphertext: "Texte Chiffré (Hex)",

      // Contact Section
      contactTitle: "Entrons en contact",
      contactSub: "Une question, un dossier d'opportunités, ou pour planifier un entretien ? Envoyez-moi un message !",
      fieldName: "Nom complet",
      fieldEmail: "Adresse email",
      fieldSubject: "Sujet",
      fieldMessage: "Votre message",
      btnSend: "Transmettre le message",
      btnSending: "Acheminement chiffré...",
      formSuccess: "Message transmis avec succès ! Je reviens vers vous dans les plus brefs délais.",
      
      // Data Arrays: Professional Experiences
      experiences: [
        {
          period: "Septembre 2024 - Présent",
          company: "Eviden Cybersecurity (Division Atos)",
          role: "Architecte Solutions Sécurité Cloud / DevSecOps (Alternance)",
          details: [
            "Conception et durcissement d'infrastructures d'hébergement Kubernetes souveraines basées sur les normes SecNumCloud.",
            "Automatisation complète des déploiements complexes sous Terraform et configuration dynamique via Ansible.",
            "Architecturage de modules de calcul isolés et intégration de clés de sécurité matérielles (HSM)."
          ],
          tags: ["Kubernetes", "Terraform", "Ansible", "SecNumCloud", "DevSecOps"]
        },
        {
          period: "Juillet 2023 - Août 2024",
          company: "Laboratoire d'Infrastructures Résilientes Hélios",
          role: "Ingénieur DevSecOps & Automatisation (R&D)",
          details: [
            "Durcissement système de serveurs d'hypervision Proxmox VE et déploiements immutables NixOS.",
            "Développement asynchrone en Python pour la détection temps réel de dérives de configurations réseau.",
            "Conception de pipelines CI/CD sécurisés contre les injections de dépendances."
          ],
          tags: ["NixOS", "Proxmox VE", "Python Async", "CI/CD", "Linux Hardening"]
        },
        {
          period: "Janvier 2023 - Juin 2023",
          company: "Startup de Systèmes de Communication Chiffrée",
          role: "Ingénieur R&D / Développeur Sécurité",
          details: [
            "Intégration d'API cryptographiques standardisées (WebCrypto) pour le chiffrement de bout en bout.",
            "Configuration de passerelles de sécurité réseau en conteneurs Docker durcis.",
            "Optimisation des temps de routage des paquets pour les architectures hautement disponibles."
          ],
          tags: ["Cryptography", "Docker", "WebCrypto API", "Network Security"]
        }
      ],
      
      // Data Arrays: Educations
      educations: [
        {
          period: "2024 - 2027",
          school: "ESIEA - École d'Ingénieurs du monde numérique",
          degree: "Diplôme d'Ingénieur · Spécialité Systèmes, Réseaux & Cybersécurité (Mastère)",
          details: "Spécialisation dans les infrastructures résilientes, l'architecture réseau durcie, la cryptographie post-quantique et la conformité ANSSI."
        },
        {
          period: "2021 - 2024",
          school: "Université de Technologies Appliquées",
          degree: "Licence d'Informatique Générale",
          details: "Diplôme validé. Solides compétences académiques en mathématiques discrètes, structures de données en C/C++, administration Unix fondamentale."
        }
      ]
    },
    EN: {
      role: "Cloud Security & DevSecOps Architect",
      status: "Actively looking for: Apprenticeship / Graduate Internship (Cybersecurity & Cloud Systems Engineer)",
      aboutText: "Fascinated by infrastructure automation (IaC), operating system hardening (Linux, NixOS), and secure, self-hosted local AI inference. Currently an apprentice at Eviden Cybersecurity (Atos), I engineer resilient tech solutions matching strict security compliance guidelines.",
      navCV: "Resume (CV)",
      navProjects: "Projects & PoCs",
      navContact: "Contact",
      downloadLabel: "Download Resume (PDF)",
      viewGithub: "Github",
      viewLinkedin: "Linkedin",
      
      // CV Section
      viewAll: "All Background",
      tabWork: "Experience",
      tabEdu: "Education",
      tabSkills: "Skills Spectrum",
      certifications: "Certifications & Frameworks",
      activeLabel: "Ongoing / Current",
      endedLabel: "Graduated / Finished",
      
      // Projects Section
      projectsSubtitle: "Interactive Proofs of Concept (PoCs)",
      projectsIntro: "My projects are more than lines on a sheet. Interact directly with the integrated simulators below to examine custom system loads, modular IaC configurations, and client-side post-quantum key cryptography.",
      interactiveConfig: "Configure Simulator",
      modelChoice: "Local LLM Model:",
      vramTitle: "VRAM Dedicated:",
      footprint: "Footprint",
      threadsUsed: "CPU Threads",
      responseText: "Average inference speed:",
      secLabel: "isolated offline execution on non-shared secure host",
      
      tfBlueprintTitle: "Modular Terraform Blueprint",
      tfToggleMulti: "Multi-Region Deployment (High Availability)",
      tfToggleHSM: "HSM Key Hardening Enabled",
      tfToggleCompliance: "Compliance Standard Target:",
      tfOutputPreview: "Generated Configuration File Preview:",
      
      cryptoTitle: "Post-Quantum Cryptography (NIST KEM)",
      cryptoLabelInput: "Plaintext to encrypt:",
      cryptoEncryptBtn: "Encrypt message with Kyber-1024",
      cryptoEncSuccess: "Message encrypted within client sandbox!",
      cryptoPublicKey: "Public Key (Kyber-1024)",
      cryptoCiphertext: "Ciphertext Output (Hex)",

      // Contact Section
      contactTitle: "Get in touch",
      contactSub: "Have a vacancy, a technical question, or want to arrange a talk? Send me a message directly!",
      fieldName: "Your full name",
      fieldEmail: "Your email adress",
      fieldSubject: "Subject",
      fieldMessage: "Your message content",
      btnSend: "Send Cryptographic Secure message",
      btnSending: "Routing chiffré...",
      formSuccess: "Your message has been successfully directed. I will return to you shortly.",
      
      // Data Arrays: Professional Experiences
      experiences: [
        {
          period: "September 2024 - Present",
          company: "Eviden Cybersecurity (Atos)",
          role: "Cloud Security Solutions Architect / DevSecOps (Apprentice)",
          details: [
            "Conceived and secured sovereign Kubernetes hosting environments tailored to ANSSI SecNumCloud requirements.",
            "Wrote production Terraform IaC modules and established dynamic Ansible configuration playbooks.",
            "Architected isolated virtualization layers integrated with hardware security modules (HSM) for credential safety."
          ],
          tags: ["Kubernetes", "Terraform", "Ansible", "SecNumCloud", "DevSecOps"]
        },
        {
          period: "July 2023 - August 2024",
          company: "Helios Resilient Infrastructure Laboratories",
          role: "DevSecOps & Automation Research Engineer",
          details: [
            "Hardened hypervisors utilizing Proxmox VE and constructed immutable operating systems with NixOS.",
            "Wrote customized asynchronous Python tools to identify real-time routing path changes and identity escalations.",
            "Designed and defended continuous deployment pipelines from external dependency poisoning."
          ],
          tags: ["NixOS", "Proxmox VE", "Python Async", "CI/CD", "Linux Hardening"]
        },
        {
          period: "January 2023 - June 2023",
          company: "Encrypted Communication Systems Startup",
          role: "R&D Software & Security Engineer",
          details: [
            "Integrated high-speed cryptographic signatures and key agreements via WebCrypto API.",
            "Packaged and shipped secure API microservices wrapped in highly sandboxed Docker containers.",
            "Fine-tuned network packet delivery inside Linux systems to reach sub-millisecond network latencies."
          ],
          tags: ["Cryptography", "Docker", "WebCrypto API", "Network Security"]
        }
      ],
      
      // Data Arrays: Educations
      educations: [
        {
          period: "2024 - 2027",
          school: "ESIEA - Graduate School of Digital Sciences",
          degree: "Master's Degree in Software Engineering · Systems, Networks & Cybersecurity Specialty",
          details: "Focused study across secure clouds, immutable operating systems, modular networks, and ANSSI regulations compliance."
        },
        {
          period: "2021 - 2024",
          school: "Applied Sciences State University",
          degree: "Bachelor's Degree in Computer Science",
          details: "Successfully validated. Academic depth in discrete mathematics, concrete data structures utilizing C/C++, and general Unix internals."
        }
      ]
    },
    ES: {
      role: "Arquitecto de Seguridad Cloud y DevSecOps",
      status: "Búsqueda activa: Prácticas de fin de carrera / Alternancia (Ingeniero de Ciberseguridad y Cloud)",
      aboutText: "Apasionado por la automatización de infraestructuras (IaC), el endurecimiento de sistemas (Linux, NixOS) y el despliegue local y seguro de inteligencia artificial soberana. Actualmente aprendiz en Eviden Cybersecurity (Atos), diseño soluciones de TI seguras que responden a las normativas de cumplimiento de seguridad más exigentes.",
      navCV: "Currículum (CV)",
      navProjects: "Proyectos (PoC)",
      navContact: "Contacto",
      downloadLabel: "Descargar CV (PDF)",
      viewGithub: "Github",
      viewLinkedin: "Linkedin",
      
      // CV Section
      viewAll: "Ver Todo",
      tabWork: "Experiencia",
      tabEdu: "Estudios",
      tabSkills: "Habilidades",
      certifications: "Certificaciones y Normas",
      activeLabel: "En Curso / Actual",
      endedLabel: "Graduado / Completo",
      
      // Projects Section
      projectsSubtitle: "Pruebas de Concepto (PoC) Interactivas",
      projectsIntro: "Mis proyectos no son solo líneas escritas. Use los simuladores dinámicos incluidos a continuación para explorar la asignación de recursos IA locales, la generación de código modular Terraform y la criptografía de clientes.",
      interactiveConfig: "Configurar Simulador",
      modelChoice: "Modelo LLM local:",
      vramTitle: "VRAM dedicada:",
      footprint: "Huella",
      threadsUsed: "Subprocesos CPU",
      responseText: "Velocidad de respuesta media:",
      secLabel: "ejecución aislada sin conexión externa en un servidor propio",
      
      tfBlueprintTitle: "Plan Terraform Modular",
      tfToggleMulti: "Despliegue multirregión (Alta Disponibilidad)",
      tfToggleHSM: "Mapeo de hardware HSM habilitado",
      tfToggleCompliance: "Meta de Conformidad:",
      tfOutputPreview: "Configuración Terraform Generada:",
      
      cryptoTitle: "Criptografía Post-Cuántica (Kyber NIST)",
      cryptoLabelInput: "Texto para cifrar:",
      cryptoEncryptBtn: "Cifrar mensaje con Kyber-1024",
      cryptoEncSuccess: "¡Mensaje cifrado con éxito en el navegador cliente!",
      cryptoPublicKey: "Clave Pública (Kyber-1024)",
      cryptoCiphertext: "Texto Cifrado (Hex)",

      // Contact Section
      contactTitle: "Hablemos en privado",
      contactSub: "¿Tiene una propuesta, una duda técnica o desea organizar una entrevista? ¡Contácteme ahora mismo!",
      fieldName: "Nombre completo",
      fieldEmail: "Correo electrónico",
      fieldSubject: "Asunto",
      fieldMessage: "Su mensaje",
      btnSend: "Enviar mensaje encriptado",
      btnSending: "Enviando de forma segura...",
      formSuccess: "¡Mensaje enviado de forma segura! Me pondré en contacto con usted lo antes posible.",
      
      // Data Arrays: Professional Experiences
      experiences: [
        {
          period: "Septiembre de 2024 - Presente",
          company: "Eviden Cybersecurity (Atos)",
          role: "Arquitecto de Seguridad Cloud / DevSecOps (Alternancia)",
          details: [
            "Concepción y endurecimiento de infraestructuras soberanas de hosting Kubernetes según estándares ANSSI SecNumCloud.",
            "Automatización completa de arquitecturas complejas con Terraform y configuración dinámica mediante Ansible.",
            "Diseño de entornos de red zero-trust e integración de claves de seguridad de hardware físicas (HSM)."
          ],
          tags: ["Kubernetes", "Terraform", "Ansible", "SecNumCloud", "DevSecOps"]
        },
        {
          period: "Julio de 2023 - Agosto de 2024",
          company: "Laboratorio de Sistemas Resilientes Helios",
          role: "Ingeniero de R&D y Automatización DevSecOps",
          details: [
            "Aseguramiento de hipervisores con Proxmox VE y despliegue de sistemas operativos inmutables NixOS.",
            "Programación asíncrona en Python para monitorización automática y alerta de desvíos en políticas de red organizativas.",
            "Estructuración de flujos dinámicos CI/CD protegidos frente a ataques a la cadena de suministro de paquetes."
          ],
          tags: ["NixOS", "Proxmox VE", "Python Async", "CI/CD", "Linux Hardening"]
        },
        {
          period: "Enero de 2023 - Junio de 2023",
          company: "Startup de Comunicaciones Privadas y Encriptadas",
          role: "Ingeniero de Investigación / Desarrollo Web de Seguridad",
          details: [
            "Implementación de cifrado extremo a extremo utilizando los estándares modernos de WebCrypto API.",
            "Orquestación de microservicios con cortafuegos en contenedores endurecidos Docker de producción.",
            "Optimización del subsistema de red Linux para reducir latencia hasta límites inferiores al milisegundo."
          ],
          tags: ["Cryptography", "Docker", "WebCrypto API", "Network Security"]
        }
      ],
      
      // Data Arrays: Educations
      educations: [
        {
          period: "2024 - 2027",
          school: "ESIEA - Escuela de Ingeniería Digital de París",
          degree: "Título de Ingeniero de Sistemas · Redes y Seguridad Informática (Máster)",
          details: "Especialización avanzada en clouds corporativas soberanos, auditorías de vulnerabilidad avanzadas y criptografía post-cuántica."
        },
        {
          period: "2021 - 2024",
          school: "Universidad de Ciencias Informáticas Aplicadas",
          degree: "Graduado en Informática General",
          details: "Estudios completados. Profundo dominio en diseño de base de datos, programación de bajo nivel en C/C++ e hilos internos Linux."
        }
      ]
    }
  };

  const currentTranslation = t[language];

  // Calculated Values for AI Inference Demo
  const activeAIConfig = {
    llama: { name: 'Llama 3 8B (Q4)', baseRam: 4.8, latencyMultiplier: 1.2 },
    mistral: { name: 'Mistral 7B (v0.3)', baseRam: 4.2, latencyMultiplier: 1.0 },
    phi: { name: 'Phi-3 Mini (3.8B)', baseRam: 2.2, latencyMultiplier: 0.5 }
  }[aiModel];

  const estimatedRam = Math.min(16, Number((activeAIConfig.baseRam + (vramLimit * 0.45)).toFixed(1)));
  const estimatedThreads = Math.min(16, Math.max(2, Math.round(vramLimit * 1.5)));
  const computedLatency = (35 * activeAIConfig.latencyMultiplier * (12 / (estimatedThreads + 1))).toFixed(0);

  // Kyber mock encryption handling
  const handleCryptoSubmit = () => {
    setIsEncrypting(true);
    setTimeout(() => {
      const mockPub = "ssh-pq-kem-kyber-1024 SHA256:" + btoa(cryptoText + Math.random().toString()).slice(0, 32);
      const mockPriv = "pq-sec-kem-kyber-1024-private-key-aes256-gcm:" + btoa(Math.random().toString()).slice(0, 48);
      
      // Hex representation of 'encrypted text'
      let hexCipher = '';
      for (let i = 0; i < cryptoText.length; i++) {
        const charCode = cryptoText.charCodeAt(i) ^ 0x2A; // simple xor mock representation
        hexCipher += charCode.toString(16).toUpperCase().padStart(2, '0');
      }
      hexCipher += "AF9901C2B4E9923"; // post-quantum padding
      
      setCryptoResult({ pub: mockPub, priv: mockPriv, cipher: hexCipher });
      setIsEncrypting(false);
    }, 600);
  };

  // Contact simulated submit
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000); // clear banner after 5s
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-300 font-sans selection:bg-cyan-500/20 selection:text-white antialiased">
      
      {/* HEADER SECTION with language switch */}
      <header className="sticky top-0 z-50 bg-[#070709]/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* Logo / Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              MC
            </div>
            <div>
              <span className="text-white font-bold leading-none tracking-tight block">Melvin Cureau</span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase block">{language === 'FR' ? 'Architecte Junior' : language === 'EN' ? 'Junior Architect' : 'Arquitecto Junior'}</span>
            </div>
          </div>

          {/* Quick navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs text-zinc-400 font-mono uppercase tracking-wider">
            <a href="#cv-timeline" className="hover:text-cyan-400 transition-colors">{currentTranslation.navCV}</a>
            <a href="#projects-showcase" className="hover:text-cyan-400 transition-colors">{currentTranslation.navProjects}</a>
            <a href="#contact-reach" className="hover:text-cyan-400 transition-colors">{currentTranslation.navContact}</a>
          </nav>

          {/* Language Selector */}
          <div className="flex bg-zinc-950 border border-zinc-800 p-0.5 rounded-md">
            {(['FR', 'EN', 'ES'] as Language[]).map((lng) => (
              <button
                key={lng}
                onClick={() => setLanguage(lng)}
                className={`px-2.5 py-1 text-2xs font-mono font-bold transition-all ${
                  language === lng 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>

        </div>
      </header>

      {/* HERO SECTION / BIOGRAPHY */}
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-zinc-900 bg-gradient-to-b from-[#070709] to-[#0a0a0d]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_20%_40%_at_50%_-10%,rgba(6,182,212,0.12),transparent)]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/20 border border-cyan-800/30 text-cyan-400 rounded-full text-2xs font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {currentTranslation.status}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            {currentTranslation.role}
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
            {currentTranslation.aboutText}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="#cv-timeline"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide uppercase rounded-md shadow-[0_4px_14px_rgba(6,182,212,0.25)] transition-all flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              {currentTranslation.downloadLabel}
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs uppercase rounded-md transition-all flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              {currentTranslation.viewAll} Github
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 1: CV / TIMELINE */}
      <section id="cv-timeline" className="max-w-4xl mx-auto px-4 py-16 space-y-8 scroll-mt-20">
        
        {/* CV Header */}
        <div className="border-b border-zinc-900 pb-4 flex justify-between items-end">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">01 / CURRICULUM VITAE</span>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-sans">
              {language === 'FR' ? 'Mon Parcours' : language === 'EN' ? 'My Background' : 'Mi Trayectoria'}
            </h2>
          </div>
          <span className="text-3xs font-mono text-zinc-500 hidden sm:inline">CURRICULUM_DATA.JSON</span>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: 'all', label: currentTranslation.viewAll },
            { id: 'work', label: currentTranslation.tabWork },
            { id: 'education', label: currentTranslation.tabEdu },
            { id: 'skills', label: currentTranslation.tabSkills }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCvTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-mono border rounded transition-all cursor-pointer ${
                cvTab === tab.id 
                  ? 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400 font-bold' 
                  : 'border-zinc-800 bg-[#0c0c0e] text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Timeline body wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          
          {/* Main timeline column */}
          <div className="md:col-span-8 space-y-4">
            
            {/* 1. PROFESSIONAL EXPERIENCES */}
            {(cvTab === 'all' || cvTab === 'work') && (
              <div className="space-y-6">
                {cvTab === 'all' && (
                  <h3 className="text-xs font-mono text-zinc-400 tracking-wider uppercase border-l-2 border-cyan-500 pl-2.5 mb-4">
                    {currentTranslation.experienceHeader}
                  </h3>
                )}
                <div className="space-y-5 border-l border-zinc-900 ml-2 pl-5">
                  {currentTranslation.experiences.map((exp, index) => (
                    <div key={index} className="relative group space-y-1.5 pt-1">
                      <span className="absolute -left-[26px] top-3 bg-[#070709] border border-cyan-500 rounded-full w-2.5 h-2.5 group-hover:scale-125 transition-transform" />
                      <div className="flex flex-wrap justify-between items-baseline gap-x-2">
                        <h4 className="text-white text-sm font-bold tracking-tight uppercase font-sans">{exp.role}</h4>
                        <span className="text-2xs font-mono text-cyan-400/80 bg-cyan-950/10 px-1.5 py-0.5 border border-cyan-950 rounded">{exp.period}</span>
                      </div>
                      <p className="text-zinc-400 text-xs font-medium font-sans">{exp.company}</p>
                      
                      <ul className="space-y-1 pt-1.5">
                        {exp.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-zinc-500 text-2xs leading-relaxed flex items-start gap-1.5">
                            <span className="text-cyan-500 mt-1">▪</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1 pt-2">
                        {exp.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-3xs font-mono px-1.5 py-0.5 border border-zinc-800 bg-zinc-900/30 text-zinc-400 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. FORMATIONS & ACADEMIC PATH */}
            {(cvTab === 'all' || cvTab === 'education') && (
              <div className="space-y-6 pt-4">
                <h3 className="text-xs font-mono text-zinc-400 tracking-wider uppercase border-l-2 border-indigo-500 pl-2.5 mb-4">
                  {currentTranslation.educationHeader}
                </h3>
                <div className="space-y-5 border-l border-zinc-900 ml-2 pl-5">
                  {currentTranslation.educations.map((edu, index) => (
                    <div key={index} className="relative group space-y-1 pt-1">
                      <span className="absolute -left-[26px] top-3 bg-[#070709] border border-indigo-500 rounded-full w-2.5 h-2.5 group-hover:scale-125 transition-transform" />
                      <div className="flex flex-wrap justify-between items-baseline gap-x-2">
                        <h4 className="text-white text-sm font-bold tracking-tight uppercase font-sans">{edu.degree}</h4>
                        <span className="text-2xs font-mono text-indigo-400 bg-indigo-950/10 px-1.5 py-0.5 border border-indigo-950 rounded">{edu.period}</span>
                      </div>
                      <p className="text-zinc-400 text-xs font-medium">{edu.school}</p>
                      <p className="text-zinc-500 text-2xs leading-relaxed pt-1">{edu.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Skills Spectrum & Certifications */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Certifications Card */}
            <div className="border border-zinc-900 bg-[#0c0c0e]/60 p-4 space-y-3.5 rounded">
              <h3 className="text-xs font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="h-4 w-4 text-cyan-400" />
                {currentTranslation.certifications}
              </h3>
              <div className="space-y-2.5">
                <div className="bg-zinc-950/50 border border-zinc-900 p-2.5 rounded">
                  <div className="flex justify-between items-start">
                    <span className="text-white text-xs font-bold font-mono">Terraform Associate</span>
                    <span className="text-4xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 py-0.2 uppercase rounded">Obtenu</span>
                  </div>
                  <span className="text-zinc-500 text-3xs font-medium block pt-0.5">HashiCorp Infrastructure Code</span>
                </div>
                <div className="bg-zinc-950/50 border border-zinc-900 p-2.5 rounded">
                  <div className="flex justify-between items-start">
                    <span className="text-white text-xs font-bold font-mono">LPIC-1 Administrator</span>
                    <span className="text-4xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 py-0.2 uppercase rounded">Obtenu</span>
                  </div>
                  <span className="text-zinc-500 text-3xs font-medium block pt-0.5">Linux Professional Institute</span>
                </div>
                <div className="bg-zinc-950/50 border border-zinc-900 p-2.5 rounded">
                  <div className="flex justify-between items-start">
                    <span className="text-white text-xs font-bold font-mono">K8s Administrator</span>
                    <span className="text-4xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1 py-0.2 uppercase rounded">Candidat</span>
                  </div>
                  <span className="text-zinc-500 text-3xs font-medium block pt-0.5">Cloud Native Computing (CKA)</span>
                </div>
              </div>
            </div>

            {/* Categorized Skills badges (always showcase, but highlighted on tab selected) */}
            <div className="border border-zinc-900 bg-[#0c0c0e]/60 p-4 space-y-4 rounded">
              <h3 className="text-xs font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-indigo-400" />
                {currentTranslation.skillsHeader}
              </h3>
              
              <div className="space-y-3 font-mono">
                <div>
                  <span className="text-3xs text-zinc-500 uppercase font-bold tracking-wider block mb-1">Infrastructure & Cloud</span>
                  <div className="flex flex-wrap gap-1">
                    {["Terraform", "Kubernetes", "Ansible", "NixOS", "Proxmox", "Linux System"].map((s) => (
                      <span key={s} className="text-3xs px-2 py-0.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-3xs text-zinc-500 uppercase font-bold tracking-wider block mb-1">Cybersecurity & Networking</span>
                  <div className="flex flex-wrap gap-1">
                    {["SecNumCloud", "Zero-Trust", "eBPF Sandboxing", "WebCrypto", "PKI / HSM"].map((s) => (
                      <span key={s} className="text-3xs px-2 py-0.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-3xs text-zinc-500 uppercase font-bold tracking-wider block mb-1">Development & Automation</span>
                  <div className="flex flex-wrap gap-1">
                    {["Python Async", "Go / Rust", "FastAPI", "Docker / OCI", "CI/CD Gitlab"].map((s) => (
                      <span key={s} className="text-3xs px-2 py-0.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 rounded">
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

      {/* SECTION 2: PROJECTS & INTERACTIVE POCS */}
      <section id="projects-showcase" className="max-w-4xl mx-auto px-4 py-16 space-y-8 scroll-mt-20 border-t border-zinc-900 bg-gradient-to-b from-[#0a0a0d] to-[#070709]">
        
        {/* Projects Header */}
        <div className="border-b border-zinc-900 pb-4 flex justify-between items-end">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest block">02 / PORTFOLIO</span>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
              {language === 'FR' ? 'Projets & Réalisations' : language === 'EN' ? 'Projects & Showcases' : 'Proyectos e Ingeniería'}
            </h2>
          </div>
          <span className="text-3xs font-mono text-zinc-500 hidden sm:inline">PROOFS_OF_CONCEPT.DIR</span>
        </div>

        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
          {currentTranslation.projectsIntro}
        </p>

        {/* 3 Main Projects Cards showcasing deep engineering skills in lightweight packages */}
        <div className="grid grid-cols-1 gap-8 pt-4">
          
          {/* PoC 1: Sovereign AI Inference Simulator */}
          <div className="border border-zinc-900 bg-[#0c0c0e]/90 p-6 rounded-none space-y-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-zinc-900">
              <div className="space-y-0.5">
                <span className="text-3xs font-mono text-cyan-400 uppercase tracking-widest">PoC-01 · Sovereign AI Systems</span>
                <h3 className="text-white text-base font-bold uppercase tracking-tight">Sovereign LLM Offline Inference Platform</h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-3xs text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-850">
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                <span>CPU_GPU_ISOLATED</span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              {language === 'FR' 
                ? "Plateforme d'hébergement et d'optimisation d'inférence de grands modèles de langage locaux sans aucune sortie vers le réseau public. Conçue sous Python & C++ pour les architectures d'hébergement matériel sécurisées."
                : language === 'EN' 
                ? "Sovereign platform to deploy private large language models with locked hardware virtualization boundaries. Designed using Python & C++ to support strict air-gapped on-premise execution."
                : "Plataforma de despliegue soberano para modelos de lenguaje localizados dentro de límites de virtualización física estrictos. Programado bajo Python y C++ para su hospedaje seguro sin conexiones salientes."}
            </p>

            {/* Real Interactive Module inside Card */}
            <div className="bg-zinc-950 border border-zinc-900 p-4 rounded space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-3xs font-mono text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                  <Sliders className="h-3 w-3 text-cyan-400" />
                  {currentTranslation.interactiveConfig}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{currentTranslation.secLabel}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Controls left */}
                <div className="space-y-3 font-mono text-2xs">
                  <div className="space-y-1">
                    <label className="text-zinc-500 block">{currentTranslation.modelChoice}</label>
                    <div className="flex gap-1.5">
                      {(['llama', 'mistral', 'phi'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setAiModel(m)}
                          className={`flex-1 py-1 px-1.5 text-center text-3xs font-extrabold border rounded uppercase transition-all ${
                            aiModel === m 
                              ? 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400' 
                              : 'border-zinc-850 bg-zinc-900/20 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-zinc-500">
                      <span>{currentTranslation.vramTitle}</span>
                      <span className="text-cyan-400 font-bold">{vramLimit} GB</span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={16}
                      step={2}
                      value={vramLimit}
                      onChange={(e) => setVramLimit(Number(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Telemetry output right */}
                <div className="border border-zinc-900 bg-[#070709] p-3 rounded space-y-2 font-mono text-2xs">
                  <span className="text-[10px] text-zinc-400 font-bold border-b border-zinc-900 block pb-1">📊 TELEMETRY SYSTEM</span>
                  <div className="flex justify-between text-3xs">
                    <span className="text-zinc-500">Active Model:</span>
                    <span className="text-white uppercase font-bold">{activeAIConfig.name}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-3xs">
                      <span className="text-zinc-500">RAM / Cache Allocation:</span>
                      <span className="text-zinc-300 font-bold">{estimatedRam} GB / 16.0 GB</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1 rounded">
                      <div className="bg-cyan-500 h-1 rounded transition-all duration-300" style={{ width: `${(estimatedRam / 16) * 100}%` }} />
                    </div>
                  </div>
                  <div className="flex justify-between text-3xs">
                    <span className="text-zinc-500">{currentTranslation.threadsUsed}:</span>
                    <span className="text-zinc-300 font-bold">{estimatedThreads} / 16 Cores</span>
                  </div>
                  <div className="flex justify-between text-3xs pt-1 border-t border-zinc-900/80">
                    <span className="text-zinc-500">{currentTranslation.responseText}</span>
                    <span className="text-cyan-400 font-bold font-mono text-xs">{computedLatency} ms</span>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex gap-2">
              <span className="text-4xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">Llama.cpp</span>
              <span className="text-4xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">vLLM Inference</span>
              <span className="text-4xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">Docker-compose</span>
            </div>

          </div>

          {/* PoC 2: Terraform Infrastructure-as-code Builder */}
          <div className="border border-zinc-900 bg-[#0c0c0e]/90 p-6 rounded-none space-y-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-zinc-900">
              <div className="space-y-0.5">
                <span className="text-3xs font-mono text-indigo-400 uppercase tracking-widest">PoC-02 · Infrastructure as Code</span>
                <h3 className="text-white text-base font-bold uppercase tracking-tight">{currentTranslation.tfBlueprintTitle}</h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-3xs text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-850">
                <Layers className="h-3.5 w-3.5 text-indigo-400" />
                <span>TERRAFORM_IAC_ANSIBLE</span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              {language === 'FR' 
                ? "Générateur et vérificateur de landing zones d'entreprises sécurisées (SecNumCloud & ISO 27001). Intègre des liaisons PKI modulaires, liaisons d'isolation de réseaux virtuels et gestionnaires de conteneurs distribués."
                : language === 'EN' 
                ? "Generator & validator for production scale Enterprise Landing zones. Provisions declarative networks, Kubernetes configurations, and implements hardware key bindings securely."
                : "Planificador y verificador automatizado para zonas de aterrizaje de TI. Orquesta despliegues de red virtuales, configuraciones complejas de Kubernetes y cifrado por hardware con módulos HSM."}
            </p>

            {/* Interactive Section 2 */}
            <div className="bg-zinc-950 border border-zinc-900 p-4 rounded space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-3xs font-mono text-zinc-400 uppercase font-bold flex items-center gap-1.5">
                  <Sliders className="h-3 w-3 text-indigo-400" />
                  {currentTranslation.interactiveConfig}
                </span>
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">STATE: COMPILING_BLUEPRINTS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                
                {/* Left controls side */}
                <div className="md:col-span-2 space-y-3 font-mono text-2xs">
                  <div className="flex items-center justify-between p-1.5 border border-zinc-900 hover:border-zinc-800 rounded bg-[#070709]">
                    <span className="text-zinc-400 text-3xs">{currentTranslation.tfToggleMulti}</span>
                    <input
                      type="checkbox"
                      checked={multiRegion}
                      onChange={(e) => setMultiRegion(e.target.checked)}
                      className="accent-indigo-400 cursor-pointer h-3 w-3"
                    />
                  </div>

                  <div className="flex items-center justify-between p-1.5 border border-zinc-900 hover:border-zinc-800 rounded bg-[#070709]">
                    <span className="text-zinc-400 text-3xs">{currentTranslation.tfToggleHSM}</span>
                    <input
                      type="checkbox"
                      checked={hsmSecure}
                      onChange={(e) => setHsmSecure(e.target.checked)}
                      className="accent-indigo-400 cursor-pointer h-3 w-3"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-500 block text-3xs">{currentTranslation.tfToggleCompliance}</label>
                    <div className="flex gap-1.5">
                      {(['standard', 'secnumcloud'] as const).map((comp) => (
                        <button
                          key={comp}
                          type="button"
                          onClick={() => setComplianceType(comp)}
                          className={`flex-1 py-1 text-center text-3xs font-extrabold border rounded uppercase transition-all ${
                            complianceType === comp 
                              ? 'border-indigo-500/50 bg-indigo-950/20 text-indigo-400' 
                              : 'border-zinc-850 bg-zinc-900/20 text-zinc-500 hover:text-zinc-300'
                          }`}
                        >
                          {comp}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right generated output side */}
                <div className="md:col-span-3 border border-zinc-900 bg-[#070709] p-3 rounded font-mono text-3xs relative">
                  <div className="text-zinc-500 uppercase font-bold border-b border-zinc-900 pb-1.5 mb-1 flex justify-between items-center">
                    <span>{currentTranslation.tfOutputPreview}</span>
                    <span className="text-2xs font-extrabold text-indigo-400">main.tf</span>
                  </div>
                  <pre className="text-zinc-400 overflow-x-auto max-h-[110px] leading-relaxed pt-1 select-all whitespace-pre">
{`module "sovereign_vpc" {
  source      = "./modules/networks"
  ha_mode     = ${multiRegion ? "true" : "false"}
  secops_rule = "${complianceType === 'secnumcloud' ? "secnumcloud-strict" : "standard-compliance"}"
  hsm_key_id  = ${hsmSecure ? '"arn:aws:hsm:kms-key-928"' : "null"}
  trusted_ips = [ "10.0.0.0/8" ]
}`}
                  </pre>
                </div>

              </div>
            </div>

            <div className="flex gap-2">
              <span className="text-4xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">HCL Terraform</span>
              <span className="text-4xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">K8s Sovereign</span>
              <span className="text-4xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">OpenStack</span>
            </div>

          </div>

          {/* PoC 3: Lattice Post-Quantum Key Exchange Sandboxed Demo */}
          <div className="border border-zinc-900 bg-[#0c0c0e]/90 p-6 rounded-none space-y-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-600/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-zinc-900">
              <div className="space-y-0.5">
                <span className="text-3xs font-mono text-cyan-400 uppercase tracking-widest">PoC-03 · Advanced Cryptography</span>
                <h3 className="text-white text-base font-bold uppercase tracking-tight">{currentTranslation.cryptoTitle}</h3>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-3xs text-zinc-400 bg-zinc-950 px-2 py-1 rounded border border-zinc-850">
                <Lock className="h-3.5 w-3.5 text-cyan-400" />
                <span>NIST_KYBER_1024</span>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              {language === 'FR' 
                ? "Démonstrateur d'implémentation d'algorithmes de cryptographie asymétrique post-quantique. Génère localement des paires de clés structurées pour déjouer les futurs calculateurs quantiques de Shor."
                : language === 'EN' 
                ? "Interactive demonstration of post-quantum asymmetric key exchange algorithms. Generates structured keys on-client meant to withstand futuristic quantum attacks."
                : "Demostrador interactivo enfocado en algoritmos de criptografía asimétrica post-cuántica. Genera matrices de clave pública/privada estables a nivel de cliente para resistir Shor de manera segura."}
            </p>

            {/* Interactive Section 3 */}
            <div className="bg-zinc-950 border border-zinc-900 p-4 rounded space-y-3">
              <div className="space-y-2 font-mono text-2xs">
                <label className="text-zinc-500 block">{currentTranslation.cryptoLabelInput}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cryptoText}
                    onChange={(e) => setCryptoText(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 bg-[#070709] border border-zinc-850 rounded text-white text-xs font-mono focus:outline-none focus:border-cyan-500/50"
                  />
                  <button
                    type="button"
                    onClick={handleCryptoSubmit}
                    disabled={isEncrypting}
                    className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-bold text-3xs uppercase tracking-wider rounded cursor-pointer flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    {isEncrypting ? (
                      <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      <ShieldCheck className="h-3.5 w-3.5" />
                    )}
                    {currentTranslation.cryptoEncryptBtn}
                  </button>
                </div>
              </div>

              {cryptoResult && (
                <div className="border border-zinc-900 bg-[#070709] p-3 rounded space-y-2.5 font-mono text-3xs animate-fadeIn">
                  <p className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    {currentTranslation.cryptoEncSuccess}
                  </p>
                  
                  <div className="space-y-1">
                    <span className="text-zinc-500 block uppercase font-bold">{currentTranslation.cryptoPublicKey}</span>
                    <code className="text-zinc-300 block bg-zinc-950 px-2 py-1 rounded border border-zinc-900/60 overflow-x-auto truncate select-all font-mono">
                      {cryptoResult.pub}
                    </code>
                  </div>

                  <div className="space-y-1">
                    <span className="text-zinc-500 block uppercase font-bold">{currentTranslation.cryptoCiphertext}</span>
                    <code className="text-cyan-400 block bg-zinc-950 px-2 py-1 rounded border border-zinc-900/60 overflow-x-auto select-all break-all font-mono">
                      {cryptoResult.cipher}
                    </code>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <span className="text-4xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">Dilithium KEM</span>
              <span className="text-4xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">Kyber Standards</span>
              <span className="text-4xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 uppercase">Shor Resilience</span>
            </div>

          </div>

        </div>

      </section>

      {/* SECTION 3: CONTACT FORM */}
      <section id="contact-reach" className="max-w-4xl mx-auto px-4 py-16 space-y-8 scroll-mt-20 border-t border-zinc-900 bg-[#070709]">
        
        {/* Contact Header */}
        <div className="border-b border-zinc-900 pb-4 flex justify-between items-end">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">03 / STREAMS</span>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">
              {language === 'FR' ? 'Contact' : language === 'EN' ? 'Contact Gateway' : 'Contacto Directo'}
            </h2>
          </div>
          <span className="text-3xs font-mono text-zinc-500 hidden sm:inline">CONTACT_SECURE_CHANNEL.CFG</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Detail Side */}
          <div className="md:col-span-5 space-y-5">
            <h3 className="text-white text-base font-bold uppercase tracking-tight font-sans">
              {currentTranslation.contactTitle}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              {currentTranslation.contactSub}
            </p>

            <div className="space-y-3 font-mono text-2xs pt-2">
              <div className="flex items-center gap-2.5 p-2 bg-zinc-950 border border-zinc-900 rounded">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-zinc-300">melvin.cureau2004@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 bg-zinc-950 border border-zinc-900 rounded">
                <Globe className="h-4 w-4 text-indigo-400" />
                <span className="text-zinc-300">Paris, France (Disponible Mobilité)</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 rounded text-center text-3xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5 text-cyan-400" />
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 rounded text-center text-3xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Github className="h-3.5 w-3.5 text-zinc-300" />
                GitHub
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-7">
            <form onSubmit={handleContactSubmit} className="border border-zinc-900 bg-[#0c0c0e]/90 p-6 rounded space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-3xs font-mono text-zinc-500 uppercase tracking-widest block">{currentTranslation.fieldName}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-white text-xs font-mono focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-3xs font-mono text-zinc-500 uppercase tracking-widest block">{currentTranslation.fieldEmail}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-white text-xs font-mono focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-3xs font-mono text-zinc-500 uppercase tracking-widest block">{currentTranslation.fieldSubject}</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-white text-xs font-mono focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-3xs font-mono text-zinc-500 uppercase tracking-widest block">{currentTranslation.fieldMessage}</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-850 rounded text-white text-xs font-mono focus:outline-none focus:border-cyan-500/50 resize-none"
                />
              </div>

              {formSubmitted && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                  <Check className="h-4 w-4" />
                  <span>{currentTranslation.formSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider rounded cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-[0_4px_12px_rgba(6,182,212,0.15)]"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
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

      </section>

      {/* FOOTER */}
      <footer className="bg-[#050507] border-t border-zinc-900 py-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-3xs font-mono text-zinc-600">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="block text-zinc-400 uppercase font-bold">Concept Melvin Cureau © 2026</span>
            <span>{language === 'FR' ? 'Conçu pour la haute résilience' : language === 'EN' ? 'Designed for sovereign resilience' : 'Diseñado para una alta soberanía y resiliencia'}</span>
          </div>
          <div className="flex gap-4">
            <span className="text-zinc-500">Node Secure: Cloud Run container sandbox standard</span>
            <span>v2.1-ltd</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
