import { motion } from 'motion/react';
import { useState } from 'react';

interface ProfileImageProps {
  theme: 'dark' | 'light';
}

export default function ProfileImage({ theme }: ProfileImageProps) {
  const [imageError, setImageError] = useState(false);
  
  // Theme colors for surrounding orbiting elements
  const accentColor = theme === 'dark' ? '#00bd95' : '#008f70';
  const ringColor = theme === 'dark' ? 'rgba(0, 189, 149, 0.25)' : 'rgba(0, 143, 112, 0.2)';

  return (
    <div 
      className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center select-none" 
      id="profile-image-container"
    >
      {/* Outer Floating Cyber-Orbit Rings (Signifying High Availability & Cloud Architectures) */}
      <motion.div
        className="absolute inset-0 rounded-full border border-dashed opacity-40"
        style={{ borderColor: ringColor }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute inset-4 rounded-full border border-dotted opacity-50"
        style={{ borderColor: ringColor }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Pulsing Cyber Rings */}
      <motion.div
        className="absolute inset-10 rounded-full border border-emerald-500/10 dark:border-emerald-400/5"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbiting Tech Nodes */}
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full"
        style={{ 
          background: accentColor,
          boxShadow: `0 0 14px ${accentColor}`,
          top: '15%',
          left: '15%'
        }}
        animate={{ scale: [1, 1.25, 1], y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ 
          background: accentColor,
          boxShadow: `0 0 10px ${accentColor}`,
          bottom: '18%',
          right: '18%'
        }}
        animate={{ scale: [1, 1.2, 1], x: [0, 4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Circular Frame for Hand-Drawn Sketch (Crisp solid white background for both modes) */}
      <div 
        className="absolute inset-6 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-xl border border-neutral-200/50 dark:border-neutral-800/10"
      >
        {!imageError ? (
          <div className="relative w-full h-full flex items-center justify-center bg-white">
            <img
              src="/melvin.png"
              alt="Melvin Cureau"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center select-none scale-[0.85] origin-center"
            />
          </div>
        ) : (
          /* High-end Professional Fallback Card */
          <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center space-y-3 bg-white rounded-full">
            <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-neutral-300 bg-neutral-50">
              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="space-y-1 px-4">
              <p className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-700">
                Photo de profil
              </p>
              <p className="text-[9px] text-neutral-500 leading-relaxed max-w-[140px] mx-auto">
                Glissez <span className="font-mono text-emerald-600 font-bold">melvin.png</span> dans <span className="font-mono text-emerald-600 font-bold">public/</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
