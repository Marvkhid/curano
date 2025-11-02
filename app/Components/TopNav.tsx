'use client';

import Image from 'next/image';

export const TopNav = () => {
  const isOnline = true; // Change this to control online/offline status

  return (
    <header className="fixed top-0 left-[220px] w-[calc(100%-220px)] h-[64px] bg-transparent z-50 flex items-center justify-between px-4 lg:px-6">
      {/* Title */}
      <p className="text-base md:text-lg text-gray-800 whitespace-nowrap">
        AI-powered cancer registry
      </p>

      {/* Search Center */}
      <div className="flex-1 flex justify-center px-4">
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 w-[220px] md:w-[320px] lg:w-[400px]">
          <Image src="/search.png" alt="Search Icon" width={16} height={16} />
          <input
            type="text"
            placeholder="Search cases, patients, appointments"
            className="bg-transparent outline-none w-full text-xs md:text-sm"
          />
        </div>
      </div>

      {/* Right-side Icons */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification */}
        <Image
          src="/notification.png"
          alt="Notifications"
          width={20}
          height={20}
          className="hidden sm:block"
        />

        {/* Profile */}
        <div className="flex items-center gap-1 md:gap-2">
          <div className="relative">
            <Image src="/simon.png" alt="Profile" width={28} height={28} className="rounded-full" />
            {/* Online/Offline Status Indicator */}
            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
          </div>
          <span className="hidden sm:inline text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">
            Marcus White
          </span>
        </div>

        {/* Dropdown Toggle */}
        <button className="text-gray-500 text-xs md:text-sm">▼</button>
      </div>
    </header>
  );
};
