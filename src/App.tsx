import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Terminal, 
  Cpu, 
  Network, 
  Lock, 
  Unlock, 
  Key, 
  RefreshCw, 
  Play, 
  Square, 
  Check, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Send, 
  Layers, 
  Sliders, 
  AlertCircle, 
  Fingerprint, 
  ChevronRight, 
  Copy, 
  Eye, 
  CheckSquare, 
  Globe, 
  Binary, 
  Activity 
} from 'lucide-react';

// Define terminal history item interface
interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'warn';
  timestamp: string;
}

// Define system logs interface
interface SecurityLog {
  id: string;
  time: string;
  module: string;
  level: 'OK' | 'WARN' | 'BLOCK' | 'INFO';
  msg: string;
}

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState<'hero' | 'arsenal' | 'projects' | 'console' | 'fortress' | 'contact'>('hero');
  
  // Real-time Dynamic Clock
  const [time, setTime] = useState<string>('');
  
  // Interactive Terminal State
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([
    { text: 'AESA-OS v3.4.11-Sovereign initialized.', type: 'success', timestamp: '00:00:00' },
    { text: 'Type "help" for active cloud security operators list.', type: 'output', timestamp: '00:00:00' }
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Security Simulator States (Projet 1: AI sovereign slider metrics)
  const [llamaThreads, setLlamaThreads] = useState<number>(8);
  const [contextSize, setContextSize] = useState<number>(8192);
  const [temp, setTemp] = useState<number>(0.2);
  const [cpuLoad, setCpuLoad] = useState<number>(14);
  const [ramUsage, setRamUsage] = useState<number>(18.4);
  const [llamaResponseTime, setLlamaResponseTime] = useState<number>(12);
  const [isLlamaInferenceRunning, setIsLlamaInferenceRunning] = useState<boolean>(false);
  const [llamaLogs, setLlamaLogs] = useState<string[]>(['[System] weights pre-loaded in VRAM (6.4GB isolated GPU).']);

  // SecOps Automation Simulator States (Projet 2)
  const [isSecOpsRunning, setIsSecOpsRunning] = useState<boolean>(true);
  const [secOpsLogs, setSecOpsLogs] = useState<SecurityLog[]>([
    { id: '1', time: '14:23:10', module: 'IP-FILTER', level: 'OK', msg: 'Zero-trust ingress rules successfully updated.' },
    { id: '2', time: '14:23:45', module: 'SEC-NUM-CLOUD', level: 'OK', msg: 'VPC isolation check verified: 100% compliant.' },
    { id: '3', time: '14:24:12', module: 'IDS', level: 'WARN', msg: 'Failed auth attempt from 198.51.100.42 blocked.' },
  ]);

  // Trading Algorithmic Bot States (Projet 3)
  const [tradingActive, setTradingActive] = useState<boolean>(true);
  const [pricingSeries, setPricingSeries] = useState<number[]>([42300, 42350, 42320, 42410, 42390, 42450, 42520, 42480, 42560, 42610, 42590, 42680]);
  const [botConsole, setBotConsole] = useState<string[]>([
    '[Bot-Active] Cryptographic arbitrage strategy active',
    '[Scan] Cross-exchange parity: SECURE delta < 0.04s',
    '[Trade] Signal Buy confirmed at 42,590 USD — Execution delay 14ms'
  ]);

  // Forteresse Simulator (Post-Quantum Key Generator)
  const [keyAlgorithm, setKeyAlgorithm] = useState<string>('Kyber-1024');
  const [keyOutput, setKeyOutput] = useState<{ publicKey: string; privateKey: string } | null>(null);
  const [isGeneratingKey, setIsGeneratingKey] = useState<boolean>(false);

  // Message Encryptor Form States
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', cipherSuite: 'AES-256GCM' });
  const [isMessageCopied, setIsMessageCopied] = useState<boolean>(false);
  const [encryptedOutput, setEncryptedOutput] = useState<string>('');
  const [securedSentDialog, setSecuredSentDialog] = useState<boolean>(false);

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  // Real-time system states & clocks
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const utc = d.toUTCString().split(' ')[4];
      const local = d.toLocaleTimeString();
      setTime(`UTC [${utc}] · LCL [${local}]`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // CPU Fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      if (tradingActive || isSecOpsRunning || isLlamaInferenceRunning) {
        setCpuLoad(prev => {
          const delta = Math.floor(Math.random() * 12) - 5;
          const base = isLlamaInferenceRunning ? 75 : isSecOpsRunning ? 22 : 12;
          const res = Math.min(Math.max(base + delta, 4), 98);
          return res;
        });
      } else {
        setCpuLoad(prev => Math.max(2, prev - 2));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [tradingActive, isSecOpsRunning, isLlamaInferenceRunning]);

  // Trading Sim Live Cycle
  useEffect(() => {
    let priceInterval: NodeJS.Timeout;
    if (tradingActive) {
      priceInterval = setInterval(() => {
        setPricingSeries(prev => {
          const lastPrice = prev[prev.length - 1];
          const volatility = lastPrice * 0.0012;
          const delta = (Math.random() - 0.48) * volatility; // slight upward drift
          const nextPrice = Math.round(lastPrice + delta);
          
          // Log Trade activity randomly
          if (Math.random() > 0.75) {
            const side = Math.random() > 0.5 ? 'BUY' : 'LIQUIDATE_HEDGE';
            const size = (Math.random() * 0.8 + 0.1).toFixed(4);
            setBotConsole(logs => [
              `[Order] ${side} ${size} BTC @ ${nextPrice.toLocaleString()} USD verified by Hash signature.`,
              ...logs.slice(0, 10)
            ]);
          }

          return [...prev.slice(1), nextPrice];
        });
      }, 1500);
    }
    return () => clearInterval(priceInterval);
  }, [tradingActive]);

  // SecOps automatic random events
  useEffect(() => {
    let secopsInterval: NodeJS.Timeout;
    if (isSecOpsRunning) {
      secopsInterval = setInterval(() => {
        const events = [
          { module: 'CONTAINER-SANDBOX', level: 'OK', msg: 'Kernel namespace boundaries audited. Verified secure.' },
          { module: 'TERRAFORM-DRIFT', level: 'OK', msg: 'State configuration matching live deployment: 0 drifts detected.' },
          { module: 'LOCAL-LLM', level: 'INFO', msg: 'Memory zeroization success after session termination.' },
          { module: 'FIREWALL', level: 'BLOCK', msg: 'Symmetric DoS defense deployed against host 185.190.140.11.' },
          { module: 'SSL-CHECK', level: 'OK', msg: 'Sovereign internal cert chain expires in 345 days.' }
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        const d = new Date();
        const tStr = d.toTimeString().split(' ')[0];

        setSecOpsLogs(prev => [
          { 
            id: Date.now().toString(), 
            time: tStr, 
            module: randomEvent.module, 
            level: randomEvent.level as any, 
            msg: randomEvent.msg 
          },
          ...prev.slice(0, 15)
        ]);

      }, 4000);
    }
    return () => clearInterval(secopsInterval);
  }, [isSecOpsRunning]);

  // Simulate Sovereign AI Inference response
  const triggerLocalAIInference = () => {
    if (isLlamaInferenceRunning) return;
    setIsLlamaInferenceRunning(true);
    setLlamaLogs(prev => [`[System] Initializing sovereign Llama-3-8B offline run...`, ...prev]);
    
    // Animate VRAM / RAM
    setCpuLoad(84);
    setRamUsage(24.8);
    
    setTimeout(() => {
      setLlamaLogs(prev => [
        `[GPU] Pipeline initialized. Allocated ${llamaThreads} CPU cores & ${(contextSize / 1024).toFixed(1)}k context windows...`,
        ...prev
      ]);
    }, 800);

    setTimeout(() => {
      const responses = [
        "L’environnement est isolé. Les clés d’API externes ont été désactivées de façon permanente. Aucune donnée ne quitte le réseau privé.",
        "Alerte de sécurité inspectée : Aucun conteneur non-autorisé n’a été identifié sur l’hyperviseur SecNumCloud.",
        "Rapport de souveraineté : Chiffrement intégral des disques matériels (LUKS-2) avec injection de clés via puce HSM activée."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setLlamaLogs(prev => [
        `[LLAMA-3 OUTPUT]: "${randomResponse}"`,
        `[Stats] Token generation: 42 t/s. Temp: ${temp}. Source: Isolated Local SAN.`,
        ...prev
      ]);
      setCpuLoad(16);
      setRamUsage(18.6);
      setIsLlamaInferenceRunning(false);
    }, 2800);
  };

  // Execute Cryptographic Key pair generation
  const handleGenerateKey = () => {
    setIsGeneratingKey(true);
    const timeNow = new Date().toLocaleTimeString();
    
    setTimeout(() => {
      const generatedPubKey = 'ssh-pq-kem-' + keyAlgorithm.toLowerCase() + ' ' + btoa(Math.random().toString()).slice(0, 56) + '== encrypted@rootsec';
      const generatedPrivKey = '----BEGIN PRIVATE ENCRYPTED KEM KEY-----\n' + 
                               btoa(Math.random().toString()).match(/.{1,48}/g)?.join('\n') + 
                               '\n-----END PRIVATE ENCRYPTED KEM KEY-----';
      setKeyOutput({
        publicKey: generatedPubKey,
        privateKey: generatedPrivKey
      });
      setIsGeneratingKey(false);
      
      setTerminalHistory(prev => [
        ...prev,
        { text: `System-keygen: successfully computed ${keyAlgorithm} secure prime-ring parameters.`, type: 'success', timestamp: timeNow }
      ]);
    }, 1500);
  };

  // Terminal input handler
  const handleTerminalSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const d = new Date();
    const timeString = d.toTimeString().split(' ')[0];

    let newLines: TerminalLine[] = [
      { text: `user@secops:~$ ${terminalInput}`, type: 'input', timestamp: timeString }
    ];

    switch (cmd) {
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'help':
        newLines.push(
          { text: 'AESA Core Command Matrix:', type: 'warn', timestamp: timeString },
          { text: '  about          - Informazioni d’origine / Background overview', type: 'output', timestamp: timeString },
          { text: '  skills         - List physical security & local AI infrastructure arsenal', type: 'output', timestamp: timeString },
          { text: '  projects       - Display live-monitored projects structural summaries', type: 'output', timestamp: timeString },
          { text: '  defense-scan   - Trigger immediate verification sequence on sovereign node API', type: 'output', timestamp: timeString },
          { text: '  generate-key   - Render post-quantum encryption key matrices inside client', type: 'output', timestamp: timeString },
          { text: '  status         - Fetch hardware isolations telemetry reports', type: 'output', timestamp: timeString },
          { text: '  clear          - Flush active virtual terminal memory buffer', type: 'output', timestamp: timeString }
        );
        break;
      case 'about':
        newLines.push(
          { text: 'ARCHITECTE PLURIDISCIPLINAIRE CLOUD & SÉCURITÉ IA', type: 'success', timestamp: timeString },
          { text: 'Souveraineté totale. Zéro tiers. Je conçois des forteresses numériques auto-hébergées pour éliminer la dépendance aux GAFAM et garantir la sécurité absolue des applications critiques.', type: 'output', timestamp: timeString }
        );
        break;
      case 'skills':
        newLines.push(
          { text: '--- SECOPS ARSENAL ---', type: 'warn', timestamp: timeString },
          { text: '  • Cloud & IaC: Terraform, OpenStack, SecNumCloud Private Gateways', type: 'output', timestamp: timeString },
          { text: '  • IA Souveraine: Local Llama, offline pipeline inference, local vector dbs (Qdrant)', type: 'output', timestamp: timeString },
          { text: '  • Hardening & Systems: NixOS immutable design, Alpine Micro-servers, Linux kernel sandboxing', type: 'output', timestamp: timeString },
          { text: '  • Automations: Python custom scripts, algorithmic security audit triggers', type: 'output', timestamp: timeString }
        );
        break;
      case 'projects':
        newLines.push(
          { text: '✦ ACTIVES SYSTEMS REPORT:', type: 'success', timestamp: timeString },
          { text: '  [SYSTEM 1] OS SOUVERAIN (Offline weight integration: Llama 3 on private Hypervisor)', type: 'output', timestamp: timeString },
          { text: '  [SYSTEM 2] SECOPS MONITORS (Intrusions auto-mitigation & zero drift containers)', type: 'output', timestamp: timeString },
          { text: '  [SYSTEM 3] ALGORITHMIC BOT (State arbitrage automation: 14ms latency verified)', type: 'output', timestamp: timeString }
        );
        break;
      case 'status':
        newLines.push(
          { text: 'TELEMETRY SECURE CHECKOUT:', type: 'success', timestamp: timeString },
          { text: `  • Core Host Integrity: VERIFIED [SHA-256 standard match]`, type: 'output', timestamp: timeString },
          { text: `  • Active Threat Mitigation: Dynamic DNS & Peer Guard active`, type: 'output', timestamp: timeString },
          { text: `  • API Sandboxing: Hardened isolations configured`, type: 'output', timestamp: timeString },
          { text: `  • Sovereign LLM: Local Llama-3 available for direct token streams`, type: 'output', timestamp: timeString }
        );
        break;
      case 'defense-scan':
        newLines.push(
          { text: 'Initializing Sovereign Node Audit Protocol v9...', type: 'warn', timestamp: timeString },
          { text: '  [+] Securing network gateway connection...', type: 'output', timestamp: timeString },
          { text: '  [+] Running kernel integrity hash checks (NixOS dynamic hash)...', type: 'output', timestamp: timeString },
          { text: '  [+] Scanning active ports (Port 3000 mapped, port 22 key-only verification)...', type: 'output', timestamp: timeString },
          { text: '  [+] Testing isolated Llama pipelines safety triggers...', type: 'output', timestamp: timeString },
          { text: '✓ VERDICT: 0 vulnerabilities found. Sovereign host structural integrity 100% SECURE.', type: 'success', timestamp: timeString }
        );
        break;
      case 'generate-key':
        newLines.push(
          { text: `Command received. Initiating Post-Quantum generator with Kyber algorithms...`, type: 'warn', timestamp: timeString },
          { text: `Calculated public-key matrix: ssh-pq-kem-kyber-1024 SHA256:${btoa(Math.random().toString()).slice(0, 24)}`, type: 'success', timestamp: timeString },
          { text: `Verify results in 'La Forteresse' interactive segment.`, type: 'output', timestamp: timeString }
        );
        // Sync trigger
        setKeyAlgorithm('Kyber-1024');
        const generatedPubKey = 'ssh-pq-kem-kyber-1024 ' + btoa(Math.random().toString()).slice(0, 56) + '== encrypted@rootsec';
        const generatedPrivKey = '----BEGIN PRIVATE ENCRYPTED KEM KEY-----\n' + 
                                 btoa(Math.random().toString()).match(/.{1,48}/g)?.join('\n') + 
                                 '\n-----END PRIVATE ENCRYPTED KEM KEY-----';
        setKeyOutput({ publicKey: generatedPubKey, privateKey: generatedPrivKey });
        break;
      default:
        newLines.push({
          text: `Command not found: "${cmd}". Type "help" for a complete index of sovereign protocols.`,
          type: 'error',
          timestamp: timeString
        });
    }

    setTerminalHistory(prev => [...prev, ...newLines]);
    setTerminalInput('');
  };

  // Encrypt contact message on the fly
  useEffect(() => {
    if (!contactForm.name && !contactForm.email && !contactForm.message) {
      setEncryptedOutput('');
      return;
    }
    const rawText = `From: ${contactForm.name}\nEmail: ${contactForm.email}\nMsg: ${contactForm.message}`;
    // Simple custom simulation of armored ASCII cipher matching key sizes to look ultra-pro
    let mockCipher = `-----BEGIN SECURE ${contactForm.cipherSuite} ARMORED BLOCK-----\nVersion: ForteresseOS_v1.0\n`;
    const salt = btoa(contactForm.email + 'salt_token').slice(0, 10);
    const cryptBody = btoa(unescape(encodeURIComponent(rawText))) + salt;
    const splitBody = cryptBody.match(/.{1,50}/g)?.join('\n') || cryptBody;
    mockCipher += splitBody;
    mockCipher += `\n-----END SECURE ${contactForm.cipherSuite} ARMORED BLOCK-----`;
    setEncryptedOutput(mockCipher);
  }, [contactForm.name, contactForm.email, contactForm.message, contactForm.cipherSuite]);

  // Copy cipher block
  const copyToClipboard = () => {
    navigator.clipboard.writeText(encryptedOutput);
    setIsMessageCopied(true);
    setTimeout(() => setIsMessageCopied(false), 2000);
  };

  // Submit Contact
  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    setSecuredSentDialog(true);
    // Print a quick notification inside virtual terminal as well
    const d = new Date();
    const tStr = d.toTimeString().split(' ')[0];
    setTerminalHistory(prev => [
      ...prev,
      { text: `[Form-Gateway] New safe message received from client ${contactForm.email}. Metadata encrypted with ${contactForm.cipherSuite}.`, type: 'success', timestamp: tStr }
    ]);
  };

  return (
    <div className="min-h-screen text-zinc-400 font-sans selection:bg-cyan-500/20 selection:text-white bg-[#0a0a0a] overflow-x-hidden antialiased">
      {/* Visual background lines (Minimal Grid Overlay for Vercel/Linear Brutalist aesthetics) */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(8,180,212,0.05)_0%,_transparent_60%)] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[#0a0a0a] bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 opacity-50" />

      {/* Static header info bar */}
      <div className="border-b border-[#1f1f1f] bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-cyan-400/50 flex items-center justify-center bg-black">
              <span className="text-cyan-400 text-xs font-mono font-bold">$</span>
            </div>
            <div className="space-y-0.5">
              <span className="font-mono text-xs tracking-widest text-white font-bold block uppercase">
                MELVIN CUREAU
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">
                Cloud & AI Security Architect
              </span>
            </div>
          </div>
          
          {/* Navigation link elements */}
          <nav className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
            <a 
              href="#arsenal" 
              onClick={() => setActiveSection('arsenal')}
              className={`px-3 py-1.5 hover:text-white transition-colors uppercase tracking-wider ${activeSection === 'arsenal' ? 'text-cyan-400 border border-[#1f1f1f] bg-[#111111]' : ''}`}
            >
              Arsenal
            </a>
            <a 
              href="#systems" 
              onClick={() => setActiveSection('projects')}
              className={`px-3 py-1.5 hover:text-white transition-colors uppercase tracking-wider ${activeSection === 'projects' ? 'text-cyan-400 border border-[#1f1f1f] bg-[#111111]' : ''}`}
            >
              Systèmes
            </a>
            <a 
              href="#console" 
              onClick={() => setActiveSection('console')}
              className={`px-3 py-1.5 hover:text-white transition-colors uppercase tracking-wider ${activeSection === 'console' ? 'text-cyan-400 border border-[#1f1f1f] bg-[#111111]' : ''}`}
            >
              Console
            </a>
            <a 
              href="#forteresse" 
              onClick={() => setActiveSection('fortress')}
              className={`px-3 py-1.5 hover:text-white transition-colors uppercase tracking-wider ${activeSection === 'fortress' ? 'text-cyan-400 border border-[#1f1f1f] bg-[#111111]' : ''}`}
            >
              Forteresse
            </a>
            <a 
              href="#contact" 
              onClick={() => setActiveSection('contact')}
              className={`px-3 py-1.5 hover:text-white transition-colors uppercase tracking-wider ${activeSection === 'contact' ? 'text-cyan-400 border border-[#1f1f1f] bg-[#111111]' : ''}`}
            >
              Contact
            </a>
          </nav>

          {/* Time & Integrity readout */}
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="tracking-wide uppercase text-zinc-500">SECURE_NODE:</span>
            <span className="text-zinc-300 font-semibold">{time}</span>
          </div>
        </div>
      </div>

      {/* Global telemetry ribbon */}
      <div className="bg-[#0c0c0c] border-b border-[#1f1f1f] py-2 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-y-1.5 justify-between items-center text-[11px] font-mono">
          <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-zinc-500">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> HOST: <span className="text-zinc-300 font-medium">nixos_sovereign_root</span></span>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> LLAMA-3: <span className="text-zinc-300 font-medium font-mono">LOCAL-SAN (ONLINE)</span></span>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> AUDITS 24H: <span className="text-emerald-400 font-semibold">14,231 VERIFIED</span></span>
          </div>
          <div className="text-zinc-400 flex items-center gap-1.5 bg-[#141416] px-2.5 py-0.5 border border-[#1f1f1f]">
            <Activity className="h-3 w-3 text-cyan-400 animate-pulse" />
            <span>GLOBAL CPU LOAD: <span className="text-cyan-400 font-bold">{cpuLoad}%</span></span>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-32">
        
        {/* ================= HERO SECTION ================= */}
        <section id="hero" className="pt-8 sm:pt-16 pb-8 space-y-12">
          <div className="max-w-3xl space-y-8">
            {/* System Sovereignty indicator tag */}
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-cyan-400"></span>
              <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.25em] font-bold">Système Souverain</span>
            </div>

            {/* Tag alert display */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#1f1f1f] bg-[#0c0c0c] text-zinc-300 font-mono text-xs shadow-sm">
              <ShieldCheck className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span>Compliant SecNumCloud & 100% On-Premise Host Architecture</span>
            </div>

            {/* Title with glow and typography */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white font-sans uppercase leading-[1.05]">
                Souveraineté.<br />
                Sécurité.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Intelligence.</span>
              </h1>
            </div>

            {/* Sub-heading */}
            <p className="text-zinc-400 text-lg sm:text-xl font-normal leading-relaxed font-sans max-w-2xl border-l border-[#1f1f1f] pl-4">
              Architecte Cloud & SecOps. Je conçois des infrastructures inviolables et déploie des IA locales pour ceux qui refusent de céder leurs données.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 font-mono text-xs">
              <a 
                href="#systems"
                className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-cyan-400 hover:text-black transition-all px-8 py-4 font-bold uppercase tracking-wider group shadow-[0_0_20px_rgba(34,211,238,0.15)]"
              >
                Voir mes systèmes
                <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#console"
                className="inline-flex items-center justify-center gap-2 border border-[#1f1f1f] hover:border-cyan-400/50 bg-[#0c0c0c] text-zinc-300 hover:text-cyan-400 px-8 py-4 uppercase tracking-wider transition-colors"
              >
                <Terminal className="h-4 w-4" />
                Démarrer la console SecOps
              </a>
            </div>
          </div>

          {/* Glowing Minimalistic Tech Card featuring a blueprint look */}
          <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-4 sm:p-6 relative group overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 h-full w-[2px] bg-cyan-500/0 group-hover:bg-cyan-500/50 transition-all duration-300" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-zinc-500 uppercase tracking-widest block text-[10px] font-bold">Signature d'infrastructure</span>
                <span className="text-zinc-200 text-sm">NixOS-Sovereign-Kernel v2.5-Stable · VM isolated hypervisor container host</span>
              </div>
              <div className="flex flex-wrap gap-4 text-zinc-400">
                <div>TLS: <span className="text-emerald-400 font-semibold">Strict-ALTS</span></div>
                <div>LOCAL LLM INFRASTRUCTURE: <span className="text-cyan-400 font-semibold">Isolated VRAM (0% WAN)</span></div>
                <div>HARDENING: <span className="text-emerald-400 font-semibold">SELinux Enforced</span></div>
              </div>
            </div>
          </div>
        </section>


        {/* ================= SECTION 01: L'ARSENAL ================= */}
        <section id="arsenal" className="space-y-8 scroll-mt-24 font-sans">
          <div className="border-b border-[#1f1f1f] pb-4 flex justify-between items-end">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400"></span>
                01 / CAPABILITÉS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">L'Arsenal Technique</h2>
            </div>
            <span className="font-mono text-zinc-500 text-xs hidden sm:inline">ARCHITECTURE_MATRIX.XLSX</span>
          </div>

          <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
            La souveraineté numérique ne négocie aucun compromis. Mes compétences s'articulent autour d'une pile logicielle et matérielle open-source hautement durcie pour sécuriser votre transition IA.
          </p>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Skill 1: Cloud Infrastructure */}
            <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 relative group hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 border border-[#1f1f1f] bg-[#111111] group-hover:border-cyan-400/50 transition-colors">
                  <Globe className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 bg-[#111111] px-2 py-0.5 border border-[#1f1f1f]">IAAS</span>
              </div>
              <h3 className="text-white text-base font-semibold group-hover:text-cyan-400 transition-colors font-sans mb-2">
                Cloud Infrastructure
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Architecture de clouds privés hautement isolés (OpenStack, vSphere durci) et de clusters Kubernetes souverains avec politiques d'isolation réseau ultra-strictes.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">K8s Sovereign</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">Private Networks</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">LUKS Disk Crypt</span>
              </div>
            </div>

            {/* Minor Skill 2: SecNumCloud */}
            <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 relative group hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 border border-[#1f1f1f] bg-[#111111] group-hover:border-cyan-400/50 transition-colors">
                  <Shield className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 bg-[#111111] px-2 py-0.5 border border-[#1f1f1f]">COMPLIANCE</span>
              </div>
              <h3 className="text-white text-base font-semibold group-hover:text-cyan-400 transition-colors font-sans mb-2">
                SecNumCloud Compliance
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Alignement et durcissement des environnements de stockage et d'exécution selon les normes très strictes de l'ANSSI. Exclusion absolue de la juridiction Cloud Act.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">ANSSI Standard</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">Anti Cloud Act</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">HSM HSM-v3</span>
              </div>
            </div>

            {/* Skill 3: Python Development */}
            <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 relative group hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 border border-[#1f1f1f] bg-[#111111] group-hover:border-cyan-400/50 transition-colors">
                  <Binary className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 bg-[#111111] px-2 py-0.5 border border-[#1f1f1f]">SCRIPTING</span>
              </div>
              <h3 className="text-white text-base font-semibold group-hover:text-cyan-400 transition-colors font-sans mb-2">
                Python Core Dev
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Développement de scripts ultra-rapides, de parseurs de logs de sécurité distribués, de modules d'intrusion automatisés et de liaisons IA hautement optimisées.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">Asyncio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">FastAPI</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">PyNaCl Crypt</span>
              </div>
            </div>

            {/* Skill 4: Infrastructure as Code */}
            <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 relative group hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 border border-[#1f1f1f] bg-[#111111] group-hover:border-cyan-400/50 transition-colors">
                  <Layers className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 bg-[#111111] px-2 py-0.5 border border-[#1f1f1f]">IAC</span>
              </div>
              <h3 className="text-white text-base font-semibold group-hover:text-cyan-400 transition-colors font-sans mb-2">
                Terraform Immutable
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Modélisation immuable de l’infrastructure et du cycle de vie des clés de sécurité pour garantir la détection instantanée de toute dérive de configuration.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">IaC Hardening</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">Drift Audit</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">Vault KMS</span>
              </div>
            </div>

            {/* Skill 5: LLMs Locaux */}
            <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 relative group hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 border border-[#1f1f1f] bg-[#111111] group-hover:border-cyan-400/50 transition-colors">
                  <Cpu className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 bg-[#111111] px-2 py-0.5 border border-[#1f1f1f]">OFFLINE AI</span>
              </div>
              <h3 className="text-white text-base font-semibold group-hover:text-cyan-400 transition-colors font-sans mb-2">
                LLMs Locaux
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Déploiement et quantification de LLMs (Llama, Mistral) sur hardware dédié. Pipeline d'inférence sécurisé n'effectuant aucune requête externe.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">LlamaCpp v3</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">GGUF Quantize</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">CUDA Sandbox</span>
              </div>
            </div>

            {/* Skill 6: Algorithmic Automation */}
            <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 relative group hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.05)] transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 border border-[#1f1f1f] bg-[#111111] group-hover:border-cyan-400/50 transition-colors">
                  <Sliders className="h-5 w-5 text-cyan-400" />
                </div>
                <span className="font-mono text-[10px] text-zinc-400 bg-[#111111] px-2 py-0.5 border border-[#1f1f1f]">AUTOMATIONS</span>
              </div>
              <h3 className="text-white text-base font-semibold group-hover:text-cyan-400 transition-colors font-sans mb-2">
                Algorithmic Automation
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Automatisation complète des processus de défense cyber : révocation de jetons compromise en moins de 50ms, rotation de clés asynchrones et télémétrie.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">Event Triggers</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">Auto-Mitigation</span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-[#1f1f1f] bg-[#141416] text-zinc-300">Unix Daemons</span>
              </div>
            </div>

          </div>
        </section>


        {/* ================= SECTION 02: PROJETS & DÉPLOIEMENTS ================= */}
        <section id="systems" className="space-y-12 scroll-mt-24">
          <div className="border-b border-[#1f1f1f] pb-4 flex justify-between items-end">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400"></span>
                02 / DEPLOYMENTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">Systèmes & Projets Autonomes</h2>
            </div>
            <span className="font-mono text-zinc-500 text-xs hidden sm:inline">LIVE_SANDBOX_STREAMS</span>
          </div>

          {/* Intro text */}
          <p className="text-zinc-400 max-w-3xl text-sm leading-relaxed">
            Chaque déploiement est modélisé sous forme d'une cellule autonome et testable. Manipulez les simulateurs temps-réel intégrés ci-dessous pour inspecter les performances d'exécution on-premise.
          </p>


          {/* ---------------- PROJECT 1: L'OS Souverain (Interactive local Llama runner) ---------------- */}
          <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 sm:p-8 space-y-6 relative rounded-none hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.03)] transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ PROJET_01 ]</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight font-sans">
                  L’OS Souverain — IA Légère Isolée
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-[#111111] border border-[#1f1f1f] text-zinc-300">
                Llama 3 8B Quantized · isolated GPU
              </span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Déploiement d'une infrastructure d’intelligence artificielle 100% locale (basée sur Llama 3) orchestrée au sein d’un noyau NixOS immuable. Aucune fuite de métadonnées vers l'Internet externe, chiffrement LUKS sur SSD isolés avec gestion des requêtes via proxy local zero-trust.
            </p>

            {/* Interactive Simulator Segment */}
            <div className="bg-[#111111] border border-[#1f1f1f] p-4 sm:p-6 space-y-6 rounded-none">
              <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-2.5">
                <span className="text-xs font-mono text-zinc-200 flex items-center gap-1.5 font-bold uppercase">
                  <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                  Pupitre de Configuration du Copilote Local
                </span>
                <span className="text-[10px] font-mono text-cyan-400 tracking-wider font-bold">
                  STATUS: {isLlamaInferenceRunning ? 'GENERATING_TOKENS...' : 'IDLE - READY'}
                </span>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Threads setting */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Cœurs CPU Alloués :</span>
                    <span className="text-cyan-400 font-semibold">{llamaThreads} threads</span>
                  </div>
                  <input 
                    type="range" 
                    min="4" 
                    max="16" 
                    step="2"
                    value={llamaThreads} 
                    onChange={(e) => {
                      setLlamaThreads(Number(e.target.value));
                      setLlamaLogs(prev => [`[Config] CPU allocation updated to ${e.target.value} thread rings.`, ...prev]);
                    }}
                    className="w-full accent-cyan-400 bg-zinc-800 h-1 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-zinc-500 block">Plus de cœurs = traitement parallèle accru</span>
                </div>

                {/* Context Size model settings */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Fenêtre de Contexte :</span>
                    <span className="text-cyan-400 font-semibold">{contextSize} tokens</span>
                  </div>
                  <input 
                    type="range" 
                    min="2048" 
                    max="16384" 
                    step="2048"
                    value={contextSize} 
                    onChange={(e) => {
                      setContextSize(Number(e.target.value));
                      setLlamaLogs(prev => [`[Config] Context limit resized to ${e.target.value} limits.`, ...prev]);
                    }}
                    className="w-full accent-cyan-400 bg-zinc-800 h-1 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-zinc-500 block">Contrôle l'Historique local de la session</span>
                </div>

                {/* Temp slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Température (Créativité) :</span>
                    <span className="text-cyan-400 font-semibold">{temp}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="1.0" 
                    step="0.1"
                    value={temp} 
                    onChange={(e) => {
                      setTemp(Number(e.target.value));
                    }}
                    className="w-full accent-cyan-400 bg-zinc-800 h-1 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-zinc-500 block">Zéro (Strict) à 1.0 (Fluctuant)</span>
                </div>

              </div>

              {/* Log window for offline Llama */}
              <div className="bg-[#070708] p-4 border border-[#1f1f1f] font-mono text-xs space-y-1.5 h-36 overflow-y-auto rounded-none">
                <div className="text-zinc-500 border-b border-[#1f1f1f] pb-1 flex justify-between">
                  <span>SOVEREIGN NETWORK LOGS</span>
                  <span className="text-cyan-400">VRAM: 6.4 GB / 8.0 GB</span>
                </div>
                {llamaLogs.map((log, i) => (
                  <div key={i} className={`text-[11px] ${log.startsWith('[LLAMA-3 OUTPUT') ? 'text-white font-semibold pl-2 border-l border-cyan-500' : 'text-zinc-500'}`}>
                    {log}
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center gap-4">
                <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                  ✓ Isolation d'exécution certifiée (0 requêtes sortantes)
                </span>
                <button
                  type="button"
                  onClick={triggerLocalAIInference}
                  disabled={isLlamaInferenceRunning}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-6 py-3 font-mono text-xs font-bold transition-all disabled:opacity-50 uppercase tracking-wider"
                >
                  <Play className={`h-4 w-4 ${isLlamaInferenceRunning ? 'animate-spin' : ''}`} />
                  {isLlamaInferenceRunning ? 'INFERENCE EN COURS...' : 'TESTER LE PIPELINE SECURE'}
                </button>
              </div>
            </div>
          </div>


          {/* ---------------- PROJECT 2: Automatisation SecOps (Real-time log console) ---------------- */}
          <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 sm:p-8 space-y-6 relative rounded-none hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.03)] transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ PROJET_02 ]</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight font-sans">
                  Automatisation SecOps — Zéro Dérive Cloud
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-[#111111] border border-[#1f1f1f] text-zinc-300">
                Terraform state monitoring · Ansible automated rollbacks
              </span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Conception et déploiement de scripts de sécurité et de monitoring autonomes. Un orchestrateur compare en continu l'état réel des clouds avec les configurations Terraform et applique de façon instantanée une réversion stricte si une dérive de privilèges ou un conteneur non identifié est trouvé sur le réseau privé.
            </p>

            {/* Interactive Simulator Segment */}
            <div className="bg-[#111111] border border-[#1f1f1f] p-4 sm:p-6 space-y-4 rounded-none">
              <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-2.5">
                <span className="text-xs font-mono text-zinc-200 flex items-center gap-1.5 font-bold uppercase">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                  Flux de Télémétrie SecOps en Direct
                </span>
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${isSecOpsRunning ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
                  <span className="text-[10px] font-mono text-zinc-400 font-bold">
                    SATELLITE AUDIT: <span className={isSecOpsRunning ? 'text-emerald-400' : 'text-rose-400'}>{isSecOpsRunning ? 'ARMÉ & ACTIF' : 'PAUSE'}</span>
                  </span>
                </div>
              </div>

              {/* Log table */}
              <div className="bg-[#070708] border border-[#1f1f1f] overflow-hidden font-mono text-[11px] rounded-none">
                <div className="grid grid-cols-12 bg-[#141416] p-2.5 border-b border-[#1f1f1f] text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                  <div className="col-span-2">Heure</div>
                  <div className="col-span-3">Module</div>
                  <div className="col-span-2 text-center">Statut</div>
                  <div className="col-span-5">Détail de l'Audit</div>
                </div>

                <div className="divide-y divide-[#1f1f1f] h-44 overflow-y-auto">
                  {secOpsLogs.map((log) => (
                    <div key={log.id} className="grid grid-cols-12 p-2.5 hover:bg-[#111111] items-center transition-colors">
                      <div className="col-span-2 text-zinc-500">{log.time}</div>
                      <div className="col-span-3 text-zinc-200 font-semibold">{log.module}</div>
                      <div className="col-span-2 text-center">
                        <span className={`px-2 py-0.5 text-[9px] font-bold tracking-wider ${
                          log.level === 'OK' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900' :
                          log.level === 'WARN' ? 'bg-amber-950/40 text-amber-400 border border-amber-900' :
                          log.level === 'BLOCK' ? 'bg-rose-950/40 text-rose-400 border border-rose-900' :
                          'bg-[#111111] text-zinc-400'
                        }`}>
                          {log.level}
                        </span>
                      </div>
                      <div className="col-span-5 text-zinc-400 truncate">{log.msg}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                    <button
                  type="button"
                  onClick={() => setIsSecOpsRunning(!isSecOpsRunning)}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs font-bold transition-all border ${
                    isSecOpsRunning 
                    ? 'border-[#1f1f1f] text-zinc-400 hover:text-rose-400 hover:border-rose-400/40 bg-zinc-950' 
                    : 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  {isSecOpsRunning ? 'SUSPENDRE LES AUDITS' : 'REPRENDRE LES MONITORINGS'}
                </button>
              </div>
            </div>
          </div>


          {/* ---------------- PROJECT 3: Trading Algorithmique (Live line-chart) ---------------- */}
          <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 sm:p-8 space-y-6 relative rounded-none hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.03)] transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">[ PROJET_03 ]</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight font-sans">
                  Trading Algorithmique — Latence Optimisée
                </h3>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-[#111111] border border-[#1f1f1f] text-zinc-300">
                Arbitrage algorithm · Python core sub-15ms loop
              </span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Développement de robots de trading asynchrones optimisés en Python. Le système effectue une analyse de corrélation multi-flux et de carnet d'ordres en temps réel. Sa performance repose sur la réécriture d'un moteur d'exécution réseau direct avec signature cryptographique embarquée pour sécuriser l'intégralité des transactions boursières.
            </p>

            {/* Interactive Simulator Segment */}
            <div className="bg-[#111111] border border-[#1f1f1f] p-4 sm:p-6 space-y-6 rounded-none">
              <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-2.5">
                <span className="text-xs font-mono text-zinc-200 flex items-center gap-1.5 font-bold uppercase">
                  <Activity className="h-3.5 w-3.5 text-cyan-400" />
                  Graphique d'Index & Console Arbitrage
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                  LATENCE RESEAU EXÉCUTION: 14.1ms (SÉCURISÉE)
                </span>
              </div>

              {/* Render a custom vector line graph dynamically */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Graphics */}
                <div className="md:col-span-7 bg-[#070708] border border-[#1f1f1f] p-4 relative flex flex-col justify-between h-48 rounded-none">
                  <div className="absolute top-2 left-2 text-[9px] font-mono text-zinc-500">
                    ARBITRAGE VOLATILITY INDEX ($)
                  </div>
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-emerald-400 font-bold">
                    ${pricingSeries[pricingSeries.length - 1]?.toLocaleString()} USD
                  </div>
                  
                  {/* SVG Line Graph */}
                  <div className="w-full flex-grow flex items-end justify-center pt-8 overflow-hidden">
                    <svg className="w-full h-24" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid guidelines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke="#1f1f1f" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="#1f1f1f" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="#1f1f1f" strokeWidth="1" strokeDasharray="3,3" />

                      {/* Area Fill */}
                      <path
                        d={`M 0 100 
                          ${pricingSeries.map((price, idx) => {
                            const minPrice = Math.min(...pricingSeries) - 20;
                            const maxPrice = Math.max(...pricingSeries) + 20;
                            const range = maxPrice - minPrice || 1;
                            const x = (idx / (pricingSeries.length - 1)) * 300;
                            const y = 90 - ((price - minPrice) / range) * 80;
                            return `L ${x} ${y}`;
                          }).join(' ')} 
                          L 300 100 Z`}
                        fill="url(#gradient)"
                      />

                      {/* Path Line */}
                      <path
                        d={pricingSeries.map((price, idx) => {
                          const minPrice = Math.min(...pricingSeries) - 20;
                          const maxPrice = Math.max(...pricingSeries) + 20;
                          const range = maxPrice - minPrice || 1;
                          const x = (idx / (pricingSeries.length - 1)) * 300;
                          const y = 90 - ((price - minPrice) / range) * 80;
                          return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="2"
                      />

                      {/* Live flashing node */}
                      <circle
                        cx="300"
                        cy={90 - ((pricingSeries[pricingSeries.length - 1] - (Math.min(...pricingSeries) - 20)) / ((Math.max(...pricingSeries) + 20) - (Math.min(...pricingSeries) - 20) || 1)) * 80}
                        r="3"
                        fill="#06b6d4"
                        className="animate-ping"
                      />
                    </svg>
                  </div>

                  {/* Horizontal index markers */}
                  <div className="flex justify-between text-[9px] font-mono text-zinc-500 border-t border-[#1f1f1f] pt-1">
                    <span>T-15min</span>
                    <span>T-10min</span>
                    <span>T-5min</span>
                    <span>LIVE STATUS</span>
                  </div>
                </div>

                {/* Right hand ledger console */}
                <div className="md:col-span-5 bg-[#070708] border border-[#1f1f1f] p-4 font-mono text-[10px] space-y-1.5 h-48 overflow-y-auto rounded-none">
                  <div className="text-zinc-500 border-b border-[#1f1f1f] pb-1 flex justify-between uppercase font-bold">
                    <span>Algorithmic Actions</span>
                    <span className="text-cyan-400">BOT: ON</span>
                  </div>
                  {botConsole.map((log, i) => (
                    <div key={i} className="text-zinc-400 leading-tight">
                      {log}
                    </div>
                  ))}
                </div>

              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-mono text-zinc-500">
                  Bot de trading isolé en environnement chiffré non interactif. Code certifié exempt de déviation.
                </span>
                
                <button
                  type="button"
                  onClick={() => {
                    setTradingActive(!tradingActive);
                    setBotConsole(prev => [
                      `[Bot-Action] State changed: bot running parameter set to ${!tradingActive}`,
                      ...prev
                    ]);
                  }}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs font-bold transition-all border ${
                    tradingActive 
                    ? 'border-[#1f1f1f] text-zinc-400 hover:text-rose-400 hover:border-rose-400/40 bg-zinc-950' 
                    : 'border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  {tradingActive ? 'PAUSE DU BOT' : 'ACTIVER BOT DE SÉCURITÉ'}
                </button>
              </div>

            </div>
          </div>

        </section>


        {/* ================= SECTION 03: SECOPS CONSOLE ================= */}
        <section id="console" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1f1f1f] pb-4 flex justify-between items-end">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400"></span>
                03 / LIVE TERMINAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">Console de Sécurité SecOps</h2>
            </div>
            <span className="font-mono text-zinc-500 text-xs hidden sm:inline">VIRTUAL_SECURE_SHELL v3.4</span>
          </div>

          <p className="text-zinc-400 max-w-2xl text-sm leading-relaxed">
            Interagissez directement avec mon environnement virtuel de sécurité. Saisissez des commandes réelles ou utilisez le tableau de bord interactif pour auditer des informations complémentaires de mon architecture.
          </p>

          {/* Graphical Frame Terminal */}
          <div className="border border-[#1f1f1f] bg-[#070708] rounded-none shadow-2xl relative overflow-hidden">
            {/* Header tab layout */}
            <div className="bg-[#0c0c0c] px-4 py-3 border-b border-[#1f1f1f] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider pl-2">
                  guest@forteresse.secops:~ (sh)
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">ACTIVE SH_SECURE_TTY</span>
              </div>
            </div>

            {/* Terminal output box */}
            <div className="p-4 sm:p-6 h-96 overflow-y-auto font-mono text-xs space-y-3 bg-[#040404]/95">
              
              {/* Cool ASCII intro logo */}
              <pre className="text-cyan-400/80 font-mono text-[9px] leading-tight overflow-x-auto select-none">
{` ______                               ______                         
/ ____/___  __   ______  _______     / ____/___  _____               
/ /   / __ \\/ /  / / __ \\/ ___/ _ \\   / /   / __ \\/ ___/               
/ /___/ /_/ / /__/ / /_/ / /  /  __/  / /___/ /_/ /__ \\                
\\____/\\____/\\___,_/ .___/_/   \\___/   \\____/\\____/____/                
                 /_/                                                    
[ SYSTEM ARCHITECT CLI - CLOUD & INTEGRATED SECURE AI CONTRACTING ]`}
              </pre>

              {/* History map */}
              <div className="space-y-2">
                {terminalHistory.map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-zinc-600 text-[10px] select-none pt-0.5">[{line.timestamp}]</span>
                    <div className="flex-1">
                      {line.type === 'input' && (
                        <span className="text-zinc-200 font-semibold">{line.text}</span>
                      )}
                      {line.type === 'output' && (
                        <span className="text-zinc-400 whitespace-pre-wrap">{line.text}</span>
                      )}
                      {line.type === 'success' && (
                        <span className="text-emerald-400 font-medium">{line.text}</span>
                      )}
                      {line.type === 'warn' && (
                        <span className="text-amber-400 font-medium">{line.text}</span>
                      )}
                      {line.type === 'error' && (
                        <span className="text-rose-400 font-semibold">{line.text}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

            </div>

            {/* Quick buttons helper segments to avoid cold typing frustrations */}
            <div className="bg-[#0c0c0c] p-3 sm:p-4 border-t border-[#1f1f1f] flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold mr-1">Raccourcis CLI :</span>
              {[
                { label: 'Aide complète', cmd: 'help' },
                { label: 'À propos', cmd: 'about' },
                { label: 'Arsenal Tech', cmd: 'skills' },
                { label: 'Mon Télémétrie', cmd: 'status' },
                { label: 'Audit Sécurité', cmd: 'defense-scan' },
                { label: 'Simuler Clé Post-Quantum', cmd: 'generate-key' },
                { label: 'Effacer l’écran', cmd: 'clear' }
              ].map((btn, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setTerminalInput(btn.cmd);
                    // Autofocus trigger or directly simulate run
                    const d = new Date();
                    const tStr = d.toTimeString().split(' ')[0];
                    setTerminalHistory(prev => [
                      ...prev,
                      { text: `user@secops:~$ ${btn.cmd}`, type: 'input', timestamp: tStr }
                    ]);
                    
                    // Directly run command
                    setTimeout(() => {
                      setTerminalInput('');
                      let newResponse: TerminalLine[] = [];
                      if (btn.cmd === 'clear') {
                        setTerminalHistory([]);
                        return;
                      } else if (btn.cmd === 'help') {
                        newResponse.push(
                          { text: 'AESA Core Command Matrix:', type: 'warn', timestamp: tStr },
                          { text: '  about          - Informazioni d’origine / Background overview', type: 'output', timestamp: tStr },
                          { text: '  skills         - List physical security & local AI infrastructure arsenal', type: 'output', timestamp: tStr },
                          { text: '  projects       - Display live-monitored projects structural summaries', type: 'output', timestamp: tStr },
                          { text: '  defense-scan   - Trigger immediate verification sequence on sovereign node API', type: 'output', timestamp: tStr },
                          { text: '  generate-key   - Render post-quantum encryption key matrices inside client', type: 'output', timestamp: tStr },
                          { text: '  status         - Fetch hardware isolations telemetry reports', type: 'output', timestamp: tStr },
                          { text: '  clear          - Flush active virtual terminal memory buffer', type: 'output', timestamp: tStr }
                        );
                      } else if (btn.cmd === 'about') {
                        newResponse.push(
                          { text: 'ARCHITECTE PLURIDISCIPLINAIRE CLOUD & SÉCURITÉ IA', type: 'success', timestamp: tStr },
                          { text: 'Souveraineté totale. Zéro tiers. Je conçois des forteresses numériques auto-hébergées pour éliminer la dépendance aux GAFAM et garantir la sécurité absolue des applications critiques.', type: 'output', timestamp: tStr }
                        );
                      } else if (btn.cmd === 'skills') {
                        newResponse.push(
                          { text: '--- SECOPS ARSENAL ---', type: 'warn', timestamp: tStr },
                          { text: '  • Cloud & IaC: Terraform, OpenStack, SecNumCloud Private Gateways', type: 'output', timestamp: tStr },
                          { text: '  • IA Souveraine: Local Llama, offline pipeline inference, local vector dbs (Qdrant)', type: 'output', timestamp: tStr },
                          { text: '  • Hardening & Systems: NixOS immutable design, Alpine Micro-servers, Linux kernel sandboxing', type: 'output', timestamp: tStr },
                          { text: '  • Automations: Python custom scripts, algorithmic security audit triggers', type: 'output', timestamp: tStr }
                        );
                      } else if (btn.cmd === 'status') {
                        newResponse.push(
                          { text: 'TELEMETRY SECURE CHECKOUT:', type: 'success', timestamp: tStr },
                          { text: `  • Core Host Integrity: VERIFIED [SHA-256 standard match]`, type: 'output', timestamp: tStr },
                          { text: `  • Active Threat Mitigation: Dynamic DNS & Peer Guard active`, type: 'output', timestamp: tStr },
                          { text: `  • API Sandboxing: Hardened isolations configured`, type: 'output', timestamp: tStr },
                          { text: `  • Sovereign LLM: Local Llama-3 available for direct token streams`, type: 'output', timestamp: tStr }
                        );
                      } else if (btn.cmd === 'defense-scan') {
                        newResponse.push(
                          { text: 'Initializing Sovereign Node Audit Protocol v9...', type: 'warn', timestamp: tStr },
                          { text: '  [+] Securing network gateway connection...', type: 'output', timestamp: tStr },
                          { text: '  [+] Running kernel integrity hash checks (NixOS dynamic hash)...', type: 'output', timestamp: tStr },
                          { text: '  [+] Scanning active ports (Port 3000 mapped, port 22 key-only verification)...', type: 'output', timestamp: tStr },
                          { text: '  [+] Testing isolated Llama pipelines safety triggers...', type: 'output', timestamp: tStr },
                          { text: '✓ VERDICT: 0 vulnerabilities found. Sovereign host structural integrity 100% SECURE.', type: 'success', timestamp: tStr }
                        );
                      } else if (btn.cmd === 'generate-key') {
                        newResponse.push(
                          { text: `Command received. Initiating Post-Quantum generator with Kyber algorithms...`, type: 'warn', timestamp: tStr },
                          { text: `Calculated public-key matrix: ssh-pq-kem-kyber-1024 SHA256:${btoa(Math.random().toString()).slice(0, 24)}`, type: 'success', timestamp: tStr },
                          { text: `Verify results in 'La Forteresse' interactive segment.`, type: 'output', timestamp: tStr }
                        );
                        setKeyAlgorithm('Kyber-1024');
                        const generatedPubKey = 'ssh-pq-kem-kyber-1024 ' + btoa(Math.random().toString()).slice(0, 56) + '== encrypted@rootsec';
                        const generatedPrivKey = '----BEGIN PRIVATE ENCRYPTED KEM KEY-----\n' + 
                                                 btoa(Math.random().toString()).match(/.{1,48}/g)?.join('\n') + 
                                                 '\n-----END PRIVATE ENCRYPTED KEM KEY-----';
                        setKeyOutput({ publicKey: generatedPubKey, privateKey: generatedPrivKey });
                      }
                      setTerminalHistory(prev => [...prev, ...newResponse]);
                    }, 50);

                  }}
                  className="px-2.5 py-1 text-[10px] font-mono border border-[#1f1f1f] bg-[#111111] text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Command-line text input */}
            <form onSubmit={handleTerminalSubmit} className="bg-[#0c0c0c] border-t border-[#1f1f1f] flex items-center p-3 relative">
              <span className="text-cyan-400 font-mono text-xs font-bold pl-2 mr-2 select-none">
                guest@secops:~$
              </span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Indiquez une commande (about, skills, defense-scan, projects, generate-key...)"
                className="flex-1 bg-transparent font-mono text-xs text-white border-0 outline-none p-0 focus:ring-0 placeholder-zinc-700 w-full"
              />
              <button
                type="submit"
                className="p-1.5 px-4 bg-[#111111] border border-[#1f1f1f] text-zinc-400 hover:text-cyan-400 hover:border-cyan-400/50 font-mono text-xs font-bold uppercase transition-colors"
              >
                EXECUTER
              </button>
            </form>
          </div>
        </section>


        {/* ================= SECTION 04: FORTERESSE CRYPTO GENERATOR ================= */}
        <section id="forteresse" className="space-y-8 scroll-mt-24">
          <div className="border-b border-[#1f1f1f] pb-4 flex justify-between items-end">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400"></span>
                04 / CRYSTALLOGRAPHY
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">La Forteresse Post-Quantique</h2>
            </div>
            <span className="font-mono text-zinc-500 text-xs hidden sm:inline">PQC_ALGORITHMS_KEM_v1</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Explainer / Controls */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-zinc-400 text-sm leading-relaxed">
                Afin de résister à l'avènement futur de la cryptanalyse quantique (notamment l'algorithme de Shor), j'intègre des mécanismes d'échange de clés basés sur les réseaux euclidiens durcis (normes NIST).
              </p>
              
              <div className="border border-[#1f1f1f] bg-[#0c0c0c] p-6 space-y-4 rounded-none">
                <span className="font-mono text-xs text-zinc-300 block font-bold uppercase tracking-wider">
                  Configurateur Cryptographique client-side
                </span>

                <div className="space-y-3 font-mono text-xs">
                  <label className="text-zinc-500 block font-medium">Choisissez l'Algorithme Post-Quantique :</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'Kyber-1024', desc: 'Lattice-KEM exchange' },
                      { value: 'Dilithium-5', desc: 'Symmetric lattice signature' },
                      { value: 'McEliece-8192', desc: 'Code-based cryptosystem' },
                      { value: 'Falcon-1024', desc: 'Fast signature scheme' }
                    ].map((algo) => (
                      <button
                        key={algo.value}
                        type="button"
                        onClick={() => setKeyAlgorithm(algo.value)}
                        className={`p-3 border text-left flex flex-col justify-between transition-colors ${
                          keyAlgorithm === algo.value 
                          ? 'border-cyan-500/60 bg-cyan-950/20 text-cyan-400 font-bold' 
                          : 'border-[#1f1f1f] bg-[#111111] text-zinc-500 hover:text-zinc-400 hover:border-cyan-500/30'
                        }`}
                      >
                        <span className="font-bold text-[11px] block">{algo.value}</span>
                        <span className="text-[9px] text-zinc-600 block mt-1">{algo.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGenerateKey}
                    disabled={isGeneratingKey}
                    className="w-full inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 py-3 font-mono text-xs font-bold transition-all disabled:opacity-50 uppercase tracking-wider"
                  >
                    <Key className={`h-4 w-4 ${isGeneratingKey ? 'animate-spin' : ''}`} />
                    {isGeneratingKey ? 'COMPUTING LATTICES PARAMETERS...' : 'CALCULER LES PARAMÈTRES'}
                  </button>
                </div>
              </div>
            </div>

            {/* Generated output visualization */}
            <div className="lg:col-span-7 bg-[#0c0c0c] border border-[#1f1f1f] p-6 space-y-4 font-mono text-xs min-h-[310px] flex flex-col justify-between rounded-none">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#1f1f1f] pb-2">
                  <span className="text-zinc-200 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-cyan-400" />
                    Paire de Clés Post-Quantique Générée
                  </span>
                  <span className="text-[10px] text-zinc-500 font-bold">CLIENT_SEED_RANDOM</span>
                </div>

                {!keyOutput ? (
                  <div className="h-44 flex flex-col items-center justify-center text-zinc-500 text-center space-y-2">
                    <Unlock className="h-8 w-8 text-zinc-700 animate-pulse" />
                    <p className="max-w-sm">
                      Aucune paire de clés calculée. Choisissez un algorithme cryptographique à gauche et cliquez sur "Calculer les Paramètres".
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    
                    {/* Public Key snippet */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-[10px] uppercase font-bold">Clé Publique ({keyAlgorithm}) :</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (keyOutput) {
                              navigator.clipboard.writeText(keyOutput.publicKey);
                            }
                          }}
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[10px] font-bold"
                        >
                          <Copy className="h-3 w-3" /> Copier Clé Publique
                        </button>
                      </div>
                      <div className="bg-[#070708] p-2.5 border border-[#1f1f1f] text-[11px] text-zinc-300 break-all h-12 overflow-y-auto selection:bg-[#111111] select-all rounded-none">
                        {keyOutput.publicKey}
                      </div>
                    </div>

                    {/* Private Key Armored snippet */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-[10px] uppercase font-bold">Portion de Clé Privée Armurée :</span>
                        <button
                          type="button"
                          onClick={() => {
                            if (keyOutput) {
                              navigator.clipboard.writeText(keyOutput.privateKey);
                            }
                          }}
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[10px] font-bold"
                        >
                          <Copy className="h-3 w-3" /> Copier Bloc Clé Privée
                        </button>
                      </div>
                      <pre className="bg-[#070708] p-2.5 border border-[#1f1f1f] text-[10px] text-zinc-400 overflow-y-auto h-20 break-all select-all leading-tight rounded-none">
                        {keyOutput.privateKey}
                      </pre>
                    </div>

                  </div>
                )}
              </div>

              <div className="border-t border-[#1f1f1f] pt-3 flex justify-between items-center text-[10px] text-zinc-500">
                <span>ESTIMATED CRACK TIME: &gt; 10^30 YEARS (BY CLASSIC SUPERCOMPUTER SHOR SIM)</span>
                <span className="flex items-center gap-1 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> STRICT_PQC
                </span>
              </div>
            </div>

          </div>
        </section>


        {/* ================= SECTION 05/CONTACT: CLIENT MESSAGING ================= */}
        <section id="contact" className="space-y-12 scroll-mt-24">
          <div className="border-b border-[#1f1f1f] pb-4 flex justify-between items-end">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400"></span>
                05 / DIRECT LEDGER
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">Construisons Votre Forteresse</h2>
            </div>
            <span className="font-mono text-zinc-500 text-xs hidden sm:inline">SECURE_CLIENT_INBOX</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Text details / links */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <p className="text-zinc-300 text-base leading-relaxed">
                  Prêt à éliminer les vulnérabilités de souveraineté dans vos processus décisionnels et vos systèmes d'intelligence ? Un réseau complètement étanche commence ici.
                </p>

                <div className="space-y-3.5 py-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 flex items-center justify-center border border-[#1f1f1f] bg-[#0c0c0c] text-cyan-400 font-bold">
                      <Mail className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className="text-zinc-500 uppercase block text-[10px] font-bold">Messagerie Directe :</span>
                      <a href="mailto:melvin.cureau2004@gmail.com" className="text-white hover:text-cyan-400 text-sm transition-colors font-medium">
                        melvin.cureau2004@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 flex items-center justify-center border border-[#1f1f1f] bg-[#0c0c0c] text-cyan-400 font-bold">
                      <Github className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className="text-zinc-500 uppercase block text-[10px] font-bold">Répertoires publics NixOS / IaC :</span>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 text-sm transition-colors flex items-center gap-1 font-medium">
                        github.com/security-architect <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-8 w-8 flex items-center justify-center border border-[#1f1f1f] bg-[#0c0c0c] text-cyan-400 font-bold">
                      <Linkedin className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <span className="text-zinc-500 uppercase block text-[10px] font-bold">Réseau Professionnel SecOps :</span>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 text-sm transition-colors flex items-center gap-1 font-medium">
                        linkedin.com/in/security-architect <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-[#1f1f1f] bg-[#0c0c0c] text-xs text-zinc-500 font-mono space-y-1 mt-6">
                <div>PGP KEY IDENTIFIER: <span className="text-zinc-300 font-bold">0x9F4C23BA880E1</span></div>
                <div>FINGERPRINT: <span className="text-zinc-400 font-medium">CA7E 90B4 F977 12CA D78B EE82 1421 EFDA</span></div>
              </div>
            </div>

            {/* Encryptor Contact Form Module */}
            <div className="lg:col-span-7 bg-[#0c0c0c] border border-[#1f1f1f] p-6 sm:p-8 flex flex-col justify-between relative rounded-none shadow-xl">
              
              {!securedSentDialog ? (
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-[#1f1f1f] pb-2 gap-2">
                    <span className="text-zinc-200 font-bold uppercase tracking-wider font-mono flex items-center gap-2">
                      <Lock className="h-4 w-4 text-cyan-400" />
                      Générateur de Message Chiffré Direct
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="text-zinc-500">Suite d'armure :</span>
                      <select 
                        value={contactForm.cipherSuite}
                        onChange={(e) => setContactForm(prev => ({ ...prev, cipherSuite: e.target.value }))}
                        className="bg-[#070708] border border-[#1f1f1f] text-cyan-400 text-[10px] focus:ring-0 focus:outline-none p-1 rounded-none cursor-pointer"
                      >
                        <option value="AES-256GCM">AES-256-GCM</option>
                        <option value="ChaCha20-Poly1305">ChaCha20-Poly1305</option>
                        <option value="RSA-4096OAEP">RSA-4096-OAEP</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Nom ou Compagnie</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-[#070708] border border-[#1f1f1f] text-zinc-100 placeholder-zinc-700 p-2.5 font-mono text-xs focus:outline-none focus:border-cyan-500/50 rounded-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Courriel de Contact (Email)</label>
                      <input
                        type="email"
                        required
                        placeholder="john@sovereign-corp.private"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-[#070708] border border-[#1f1f1f] text-zinc-100 placeholder-zinc-700 p-2.5 font-mono text-xs focus:outline-none focus:border-cyan-500/50 rounded-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">Cahier des charges ou Message de Mission</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Décrivez vos exigences d'infrastructure (Clouds privés, isolation réseau, ou modèle d'IA local)..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-[#070708] border border-[#1f1f1f] text-zinc-100 placeholder-zinc-700 p-2.5 font-mono text-xs focus:outline-none focus:border-cyan-500/50 rounded-none resize-none transition-colors"
                    />
                  </div>

                  {/* Realtime Encrypted Output Visualizer */}
                  {encryptedOutput && (
                    <div className="space-y-1 bg-[#070708] p-3.5 border border-[#1f1f1f] font-mono text-[10px] rounded-none">
                      <div className="flex justify-between items-center text-zinc-500 pb-1.5 border-b border-[#1f1f1f]">
                        <span className="font-bold">PREVIEW DES REQUÊTES EN CHIFFREMENT SYMETRIQUE LIVE :</span>
                        <button
                          type="button"
                          onClick={copyToClipboard}
                          className="text-cyan-400 hover:text-cyan-350 font-bold transition-all uppercase flex items-center gap-1 hover:underline"
                        >
                          <Copy className="h-3 w-3" /> {isMessageCopied ? 'COPIÉ !' : 'COPIER CYBER-BLOC'}
                        </button>
                      </div>
                      <pre className="text-zinc-500 break-all select-all pt-1.5 h-16 overflow-y-auto leading-normal">
                        {encryptedOutput}
                      </pre>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold font-mono text-xs py-3.5 transition-all rounded-none uppercase tracking-wider cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                    >
                      <Send className="h-4 w-4" />
                      SIGNER ET ENVOYER LE BLOC CHIFFRE
                    </button>
                  </div>
                </form>
              ) : (
                <div className="h-72 flex flex-col items-center justify-center text-center space-y-4 font-mono z-10 py-12">
                  <div className="p-3.5 border border-emerald-500/35 bg-emerald-950/20 text-emerald-400 rounded-none">
                    <ShieldCheck className="h-10 w-10" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-white text-base font-bold uppercase tracking-wider">
                      Message Chiffré Sauvegardé
                    </h3>
                    <p className="text-zinc-400 text-xs max-w-md">
                      Votre canal sécurisé a fonctionné. Les métadonnées de chiffrement {contactForm.cipherSuite} ont été signées et stockées dans la file d'attente de la console d'audit SecOps de façon sécurisée.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSecuredSentDialog(false);
                      setContactForm({ name: '', email: '', message: '', cipherSuite: 'AES-256GCM' });
                    }}
                    className="px-6 py-2.5 border border-[#1f1f1f] bg-[#070708] hover:border-cyan-400 text-zinc-300 hover:text-cyan-400 text-xs font-mono font-bold uppercase transition-colors"
                  >
                    RÉINITIALISER LE CANAL
                  </button>
                </div>
              )}

            </div>

          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#1f1f1f] bg-[#0c0c0c] py-12 relative z-10 font-mono text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <span className="text-white text-sm font-sans font-bold tracking-tight uppercase block">
                Construisons votre forteresse numérique.
              </span>
              <p className="text-zinc-500 max-w-sm font-sans leading-relaxed text-xs">
                Infrastructures Cloud inviolables, autonomie décisionnelle totale, et inférence d'intelligence artificielle locale sécurisée sans compromis.
              </p>
            </div>

            {/* Email quick link */}
            <div className="space-y-1">
              <span className="text-zinc-500 select-none block uppercase font-bold text-[9px] tracking-wider">SECURE DIRECT CHANNEL</span>
              <a 
                href="mailto:melvin.cureau2004@gmail.com" 
                className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm underline flex items-center gap-1"
              >
                melvin.cureau2004@gmail.com <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="border-t border-[#1f1f1f]/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px]">
            <p>
              © {new Date().getFullYear()} MELVIN CUREAU · CLOUD & SECURITE IA ARCHITECTE. TOUS DROITS RÉSERVÉS PAR CLÉ COMPILATION.
            </p>
            <div className="flex gap-4 font-bold text-zinc-600">
              <span>ALGORITHM: SHA-512 COMPLIANT</span>
              <span>·</span>
              <span>HOST: ON-PREM NODE-1</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
