'use client';

import React from 'react';

interface HeaderProps {
  sortAsc: boolean;
  onSort: () => void;
}

export default function Header({ sortAsc, onSort }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-6 gap-3 sm:gap-0">
      <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left w-full sm:w-auto">Users</h1>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base">
          Ask AI
        </button>
        <button
          className="bg-gray-100 px-3 py-2 rounded-md w-full sm:w-auto text-sm sm:text-base"
          onClick={onSort}
        >
          Sort by Patients {sortAsc ? '▲' : '▼'}
        </button>
      </div>
    </header>
  );
}