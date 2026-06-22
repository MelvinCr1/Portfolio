import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Globe, Linkedin, Github, Send, Check } from 'lucide-react';
import { Language, TranslationSet } from '../types';

interface ContactSectionProps {
  theme: 'dark' | 'light';
  language: Language;
  currentTranslation: TranslationSet;
}

export default function ContactSection({
  theme,
  language,
  currentTranslation
}: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState({ name: '', email: '', subject: '', message: '' });
  const [touchedFields, setTouchedFields] = useState({ name: false, email: false, subject: false, message: false });

  const validateField = (fieldName: 'name' | 'email' | 'subject' | 'message', value: string): string => {
    const trimmed = value.trim();
    if (fieldName === 'name') {
      if (!trimmed) return language === 'FR' ? 'Le nom est requis.' : language === 'ES' ? 'El nombre es obligatorio.' : 'Name is required.';
      if (trimmed.length < 2 || trimmed.length > 50) {
        return currentTranslation.errName || 'Name must be between 2 and 50 characters.';
      }
    }
    if (fieldName === 'email') {
      if (!trimmed) return language === 'FR' ? "L'e-mail est requis." : language === 'ES' ? 'El correo es obligatorio.' : 'Email is required.';
      // Safe, strict email validation regex
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(trimmed)) {
        return currentTranslation.errEmail || 'Please enter a valid email address.';
      }
    }
    if (fieldName === 'subject') {
      if (!trimmed) return language === 'FR' ? 'Le sujet est requis.' : language === 'ES' ? 'El asunto es obligatorio.' : 'Subject is required.';
      if (trimmed.length < 3 || trimmed.length > 100) {
        return currentTranslation.errSubject || 'Subject must be between 3 and 100 characters.';
      }
    }
    if (fieldName === 'message') {
      if (!trimmed) return language === 'FR' ? 'Le message est requis.' : language === 'ES' ? 'El mensaje es obligatorio.' : 'Message is required.';
      if (trimmed.length < 10 || trimmed.length > 2000) {
        return currentTranslation.errMessage || 'Message must be between 10 and 2000 characters.';
      }
    }
    return '';
  };

  const handleInputChange = (field: 'name' | 'email' | 'subject' | 'message', val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    if (touchedFields[field]) {
      const err = validateField(field, val);
      setFormErrors(prev => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: 'name' | 'email' | 'subject' | 'message') => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setFormErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message)
    };

    setFormErrors(errors);
    setTouchedFields({ name: true, email: true, subject: true, message: true });

    const hasAnyError = Object.values(errors).some(err => err !== '');
    if (hasAnyError) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Clean inputs to avoid Header Injection / CR-LF threats:
      const cleanSubject = (formData.subject || 'Contact depuis Portfolio')
        .replace(/[\r\n]/g, ' ')
        .trim();
      const cleanName = formData.name
        .replace(/[\r\n]/g, ' ')
        .trim();
      const cleanEmail = formData.email.trim();
      const cleanMessage = formData.message.trim();
      
      const subjectEncoded = encodeURIComponent(cleanSubject);
      const mailtoBody = `Bonjour Melvin,\n\nVous avez reçu un message de la part de ${cleanName} (${cleanEmail}) :\n\n${cleanMessage}\n\nCordialement,\n${cleanName}`;
      const bodyEncoded = encodeURIComponent(mailtoBody);
      
      // Redirect to standard secure client mail composer
      window.location.href = `mailto:portfolio@melvincureau.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
      
      // Reset logic
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouchedFields({ name: false, email: false, subject: false, message: false });
      setFormErrors({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setFormSubmitted(false), 6000);
    }, 1000);
  };

  return (
    <section id="contact-section" className={`relative py-20 px-6 border-t scroll-mt-12 transition-all duration-300 ${
      theme === 'dark' ? 'border-white/[0.04]' : 'border-slate-200 bg-slate-50/[0.15]'
    }`}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center space-y-3 mb-16">
          <h2 className={`text-3xl font-bold tracking-tight uppercase leading-none transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>{currentTranslation.contactTitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Info Column */}
          <div className="md:col-span-5 space-y-6">
            <p className={`text-sm leading-relaxed font-light transition-colors ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {currentTranslation.contactSub}
            </p>

            <div className="space-y-4 font-mono text-xs">
              <div className={`p-4 border rounded-2xl flex items-center gap-3 transition-all ${
                theme === 'dark' 
                  ? 'bg-slate-900/30 border-white/[0.04] text-slate-300' 
                  : 'bg-white border-slate-200 text-slate-755 shadow-sm'
              }`}>
                <Mail className="h-4.5 w-4.5 text-teal-400 shrink-0" />
                <span className="truncate font-light select-all">portfolio@melvincureau.com</span>
              </div>
              <div className={`p-4 border rounded-2xl flex items-center gap-3 transition-all ${
                theme === 'dark' 
                  ? 'bg-slate-900/30 border-white/[0.04] text-slate-300' 
                  : 'bg-white border-slate-200 text-slate-755 shadow-sm'
              }`}>
                <Globe className="h-4.5 w-4.5 text-indigo-400 shrink-0" />
                <span className="font-light">Tours, France</span>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/in/melvin-cureau-83a812252/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 border rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 hover:bg-slate-900 border-white/[0.06] text-slate-400 hover:text-white'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                }`}
              >
                <Linkedin className="h-4 w-4 text-teal-400" />
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 py-3 border rounded-xl text-center text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 hover:bg-slate-900 border-white/[0.06] text-slate-400 hover:text-white'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm'
                }`}
              >
                <Github className="h-4 w-4 text-slate-500" />
                GitHub
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-7">
            <form onSubmit={handleContactSubmit} className={`border p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 transition-all ${
              theme === 'dark' 
                ? 'border-white/[0.04] bg-slate-900/20' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 align-top">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldName}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs font-sans focus:outline-none focus:ring-1 transition-all duration-200 font-light ${
                      formErrors.name && touchedFields.name
                        ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/30 bg-rose-500/[0.01]'
                        : 'focus:border-teal-500/40 focus:ring-teal-500/40'
                    } ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-white/5 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  <AnimatePresence>
                    {formErrors.name && touchedFields.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-[10px] font-mono text-rose-500 mt-1 flex items-center gap-1"
                      >
                        <span>●</span> {formErrors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <div className="space-y-1.5 align-top">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldEmail}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-2.5 border rounded-xl text-xs font-sans focus:outline-none focus:ring-1 transition-all duration-200 font-light ${
                      formErrors.email && touchedFields.email
                        ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/30 bg-rose-500/[0.01]'
                        : 'focus:border-teal-500/40 focus:ring-teal-500/40'
                    } ${
                      theme === 'dark'
                        ? 'bg-slate-950 border-white/5 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  <AnimatePresence>
                    {formErrors.email && touchedFields.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-[10px] font-mono text-rose-500 mt-1 flex items-center gap-1"
                      >
                        <span>●</span> {formErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-1.5 pb-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldSubject}</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  onBlur={() => handleBlur('subject')}
                  className={`w-full px-4 py-2.5 border rounded-xl text-xs font-sans focus:outline-none focus:ring-1 transition-all duration-200 font-light ${
                    formErrors.subject && touchedFields.subject
                      ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/30 bg-rose-500/[0.01]'
                      : 'focus:border-teal-500/40 focus:ring-teal-500/40'
                  } ${
                    theme === 'dark'
                      ? 'bg-slate-950 border-white/5 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
                <AnimatePresence>
                  {formErrors.subject && touchedFields.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-[10px] font-mono text-rose-500 mt-1 flex items-center gap-1"
                    >
                      <span>●</span> {formErrors.subject}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-1.5 pb-1">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">{currentTranslation.fieldMessage}</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`w-full px-4 py-2.5 border rounded-xl text-xs font-sans focus:outline-none focus:ring-1 transition-all duration-200 resize-none font-light ${
                    formErrors.message && touchedFields.message
                      ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/30 bg-rose-500/[0.01]'
                      : 'focus:border-teal-500/40 focus:ring-teal-500/40'
                  } ${
                    theme === 'dark'
                      ? 'bg-slate-950 border-white/5 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
                <AnimatePresence>
                  {formErrors.message && touchedFields.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-[10px] font-mono text-rose-500 mt-1 flex items-center gap-1"
                    >
                      <span>●</span> {formErrors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 border border-teal-500/30 bg-teal-500/5 rounded-2xl flex items-center gap-3 text-xs text-teal-400 font-mono"
                  >
                    <Check className="h-4.5 w-4.5 shrink-0" />
                    <span>{currentTranslation.formSuccess}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50 border ${
                  theme === 'dark'
                    ? 'bg-teal-500 border-teal-400 text-slate-950 hover:bg-teal-400'
                    : 'bg-slate-950 border-slate-950 text-white hover:bg-slate-800'
                }`}
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
  );
}
