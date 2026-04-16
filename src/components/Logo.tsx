import React from 'react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="metalJ" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8f4f2"/>
          <stop offset="20%" stopColor="#a8d8d2"/>
          <stop offset="45%" stopColor="#00c4ae"/>
          <stop offset="70%" stopColor="#007a6e"/>
          <stop offset="100%" stopColor="#00e5cc"/>
        </linearGradient>
        <linearGradient id="crossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#a0d8d2"/>
          <stop offset="100%" stopColor="#00b4a0"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring accent lines */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="url(#metalJ)" strokeWidth="4" opacity="0.8"/>
      <circle cx="100" cy="100" r="82" fill="none" stroke="url(#metalJ)" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.5"/>

      {/* Nexus network lines */}
      <g opacity="0.4" stroke="#00c4ae" strokeWidth="1.2" fill="none">
        <line x1="100" y1="18" x2="60" y2="60"/>
        <line x1="100" y1="18" x2="140" y2="60"/>
        <line x1="60" y1="60" x2="30" y2="100"/>
        <line x1="140" y1="60" x2="170" y2="100"/>
        <line x1="30" y1="100" x2="60" y2="140"/>
        <line x1="170" y1="100" x2="140" y2="140"/>
        <line x1="60" y1="140" x2="100" y2="182"/>
        <line x1="140" y1="140" x2="100" y2="182"/>
      </g>

      {/* Medical cross */}
      <rect x="85" y="50" width="30" height="100" rx="4" fill="url(#crossGrad)" />
      <rect x="50" y="85" width="100" height="30" rx="4" fill="url(#crossGrad)" />

      {/* J character */}
      <text 
        x="100" 
        y="130" 
        fontFamily="Georgia, serif" 
        fontSize="85" 
        fontWeight="900"
        fill="url(#metalJ)" 
        textAnchor="middle" 
        filter="url(#glow)"
      >J</text>

      {/* Center pulse dot */}
      <circle cx="100" cy="100" r="4" fill="white" opacity="0.9" />
    </svg>
  );
}
