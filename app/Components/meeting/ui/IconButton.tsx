'use client';

import React from 'react';

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function IconButton({ children, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="px-2 py-1 border rounded-md text-sm text-gray-700 hover:shadow-sm transition"
    >
      {children}
    </button>
  );
}
