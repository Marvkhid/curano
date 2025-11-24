'use client';

import React from 'react';

interface ControlButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label?: string;
}

export default function ControlButton({ children, onClick, active, label }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`rounded-md px-2 py-1 bg-white/90 hover:bg-white text-sm shadow transform transition-all ${
        active ? 'ring-2 ring-green-400 scale-105' : ''
      }`}
      type="button"
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5">{children}</div>
      </div>
    </button>
  );
}
