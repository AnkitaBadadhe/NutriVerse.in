import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
}

export const NutriVerseLogoIcon: React.FC<LogoIconProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#005082] via-[#003d66] to-[#002845] text-white shadow-lg border border-cyan-400/30 group-hover:scale-105 transition-all duration-300 overflow-hidden shrink-0 ${className}`}>
      {/* Subtle Radiant Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/25 via-cyan-400/20 to-amber-400/25 opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      <svg 
        className="w-full h-full p-1.5 relative z-10 drop-shadow-md"
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Culinary Bowl / Plate Base (Food & Nutrition) */}
        <path 
          d="M 16 54 C 16 80, 84 80, 84 54 L 77 54 C 77 71, 23 71, 23 54 Z" 
          fill="url(#foodBowlGrad)" 
        />

        {/* Health Vitality Leaf (Health & Organic Wellness) */}
        <path 
          d="M 50 15 C 30 25, 24 46, 50 54 C 76 46, 70 25, 50 15 Z" 
          fill="url(#leafHealthGrad)" 
        />

        {/* Heartbeat ECG Pulse Line (Clinical Health Diagnostics) */}
        <path 
          d="M 26 38 L 38 38 L 44 26 L 50 50 L 56 34 L 62 38 L 74 38" 
          stroke="#FBBF24" 
          strokeWidth="5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* AI Golden Sparkle (AI Precision) */}
        <path 
          d="M 74 12 L 76.5 18 L 82.5 20.5 L 76.5 23 L 74 29 L 71.5 23 L 65.5 20.5 L 71.5 18 Z" 
          fill="#FBBF24" 
        />

        <defs>
          <linearGradient id="foodBowlGrad" x1="16" y1="54" x2="84" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="leafHealthGrad" x1="24" y1="15" x2="76" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34D399" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
