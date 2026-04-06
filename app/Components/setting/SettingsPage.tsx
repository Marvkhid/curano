'use client';

import React, { useState } from 'react';

// Header component
interface HeaderProps {
  sortAsc: boolean;
  onSort: () => void;
}

function Header({ sortAsc, onSort }: HeaderProps) {
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

// Example user data (replace with your real data)
interface User {
  id: number;
  name: string;
  patients: number;
}

// SettingsPage component
export default function SettingsPage() {
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = () => {
    setSortAsc((prev) => !prev);
  };

  // Example user list
  const users: User[] = [
    { id: 1, name: 'Alice', patients: 5 },
    { id: 2, name: 'Bob', patients: 12 },
    { id: 3, name: 'Charlie', patients: 8 },
  ];

  // Sort users based on sortAsc
  const sortedUsers = [...users].sort((a, b) =>
    sortAsc ? a.patients - b.patients : b.patients - a.patients
  );

  return (
    <div className="p-6">
      <Header sortAsc={sortAsc} onSort={handleSort} />

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">ID</th>
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Patients</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{user.id}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.patients}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}