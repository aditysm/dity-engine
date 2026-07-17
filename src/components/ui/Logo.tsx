import React from 'react';

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Container Frame */}
      <rect x="3" y="3" width="94" height="94" rx="28" fill="none" />
      
      {/* Twin Rounded Stream Logo */}
      <g fill="currentColor">
        {/* Component 1 (Bottom Left) */}
        <path d="M 20,42 V 70 A 10,10 0 0,0 30,80 H 58 V 62 H 38 V 42 Z" />
                 
        {/* Component 2 (Top Right) */}
        <path d="M 80,58 V 30 A 10,10 0 0,0 70,20 H 42 V 38 H 62 V 58 Z" />
      </g>
    </svg>
  );
}
