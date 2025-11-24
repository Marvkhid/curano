'use client';

import React from 'react';

interface HeaderProps {
  sortAsc: boolean;
  onSort: () => void;
}

export default function Header({ sortAsc, onSort }: HeaderProps) {
  return (
    <header className="flex flex-wrap justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="flex items-center gap-3">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Ask AI</button>
        <button className="bg-gray-100 px-3 py-2 rounded-md" onClick={onSort}>
          Sort by Patients {sortAsc ? '▲' : '▼'}
        </button>
      </div>
    </header>
  );
}
