'use client';

import React from 'react';

interface SidebarProps {
  onAddUser: () => void;
}

export default function Sidebar({ onAddUser }: SidebarProps) {
  const menuItems = ['Users', 'Admin', 'About AI', 'Profile', 'History', 'Access Permission'];

  return (
    <aside className="w-full md:w-64 bg-white shadow-md p-4 flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-2">Settings</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <details key={item} className="group">
            <summary className="cursor-pointer text-sm font-medium py-2 px-3 bg-gray-100 rounded-md group-open:bg-gray-200">
              {item}
            </summary>
            <div className="pl-4 text-sm text-gray-600">Details about {item}</div>
          </details>
        ))}
      </nav>

      <button
        onClick={onAddUser}
        className="mt-6 bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600"
      >
        + Add New User
      </button>
    </aside>
  );
}
