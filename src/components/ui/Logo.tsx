import React from 'react';

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Container Ikon (Transparan) */}
      <rect x="3" y="3" width="94" height="94" rx="28" fill="none" />

      {/* Dity Engine Logo */}
      <g fill="currentColor">
        {/* Blok Kiri Atas Raksasa */}
        <path d="M 20,28 A 8,8 0 0,1 28,20 H 72 A 8,8 0 0,1 80,28 V 36 Q 54,42 36,60 L 20,76 Z" />
        {/* Blok Kanan Bawah Mini */}
        <path d="M 54,62 Q 68,52 80,48 V 72 A 8,8 0 0,1 72,80 H 46 Z" />
      </g>
    </svg>
  );
}
