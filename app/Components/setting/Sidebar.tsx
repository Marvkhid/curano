'use client';

import React from 'react';

interface SidebarProps {
  onAddUser: () => void;
}

export default function Sidebar({ onAddUser }: SidebarProps) {
  const menuItems = ['Users', 'Admin', 'About AI', 'Profile', 'History', 'Access Permission'];

  return (
    <div className="flex w-full">
      <aside className="
        w-full 
        md:w-64 lg:w-72 
        bg-white shadow-md 
        p-3 sm:p-4 
        flex flex-col md:flex-col 
        gap-3 md:gap-4 
        md:h-screen md:sticky md:top-0 md:overflow-y-auto
      ">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-center md:text-left">
          Settings
        </h2>

        <nav className="
          flex 
          flex-row md:flex-col 
          flex-wrap md:flex-nowrap 
          gap-2
        ">
          {menuItems.map((item) => (
            <details
              key={item}
              className="group w-[48%] md:w-full relative"
            >
              <summary className="
                cursor-pointer 
                text-xs sm:text-sm 
                font-medium 
                py-2 px-2 sm:px-3 
                bg-gray-100 rounded-md 
                group-open:bg-gray-200 
                text-center md:text-left
              ">
                {item}
              </summary>

              <div className="
                text-xs sm:text-sm 
                text-gray-600 
                md:pl-4 
                absolute md:static 
                top-full left-0 
                bg-white md:bg-transparent 
                border md:border-0 
                rounded-md md:rounded-none 
                shadow md:shadow-none 
                p-2 md:p-0 
                z-50 md:z-auto
                w-max md:w-auto
              ">
                Details about {item}
              </div>
            </details>
          ))}
        </nav>

        <button
          onClick={onAddUser}
          className="
            mt-2 md:mt-6 
            bg-blue-500 text-white 
            text-xs sm:text-sm 
            px-3 py-2 
            rounded-md 
            hover:bg-blue-600 
            w-full
          "
        >
          + Add New User
        </button>
      </aside>
    </div>
  );
}