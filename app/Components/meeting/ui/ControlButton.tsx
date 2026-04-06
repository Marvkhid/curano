'use client';

import React from 'react';

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  label?: string;
  active?: boolean;
}

export default function IconButton({ children, onClick, label, active }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={`
        inline-flex items-center justify-center
        px-2 py-1
        sm:px-3 sm:py-1.5
        min-w-[36px] min-h-[36px]
        sm:min-w-[40px] sm:min-h-[40px]
        border rounded-md
        text-xs sm:text-sm
        text-gray-700
        hover:shadow-sm
        touch-manipulation
        select-none
        transition-all duration-150
        active:scale-95
        ${active ? 'bg-gray-100 border-gray-400' : 'bg-white'}
      `}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0">
          {children}
        </div>
        {label && (
          <span className="hidden sm:inline text-xs font-medium whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </button>
  );
}