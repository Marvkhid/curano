'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: '/dashboard.png' },
  { name: 'Cases List', href: '/dashboard/cases-list', icon: '/cases.png' },
  { name: 'Patient Profile', href: '/dashboard/profile', icon: '/profile.png' },
  { name: 'Meetings', href: '/dashboard/meetings', icon: '/meetings.png' },
  { name: 'Analytics & Exports', href: '/dashboard/analytics', icon: '/analytics.png' },
  { name: 'Settings', href: '/dashboard/settings', icon: '/settings.png' },
  { name: 'Log Out', href: '/dashboard/logout', icon: '/logout.png' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-white flex flex-col p-4 border-r border-gray-200">
      {/* Logo */}
      <div className="mb-6 flex justify-start">
        <Link href="/">
          <Image src="/Curano.png" alt="Logo" width={120} height={40} priority />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                    isActive ? 'bg-green-900 text-white' : 'text-gray-500 hover:bg-green-100'
                  }`}
                >
                  <Image src={link.icon} alt={`${link.name} icon`} width={22} height={22} />
                  <span className="text-[15px] font-semibold">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Thought Box */}
      <div className="relative bg-green-900 text-white rounded-lg p-4 text-center">
        <div className="absolute inset-x-0 -top-12 flex justify-center">
          <div className="bg-green-900 rounded-full p-1">
            <Image src="/bulb.png" alt="Bulb" width={60} height={60} />
          </div>
        </div>
        <p className="mt-10 text-base font-semibold">Thoughts time</p>
        <p className="text-sm text-white/80 mt-2 leading-tight">
          Curano -- The best possible location for health care and maximum hosptality
        </p>
      </div>
    </aside>
  );
};
