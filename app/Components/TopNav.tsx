'use client';

import Image from 'next/image';

export const TopNav = () => {
  const isOnline = true;

  return (
    <header
      className="
        fixed top-0 left-0 w-full
        md:left-64 md:w-[calc(100%-16rem)]
        lg:left-72 lg:w-[calc(100%-18rem)]
        h-[60px] md:h-[64px]
        bg-white md:bg-transparent
        z-50
        flex items-center justify-between
        px-3 sm:px-4 lg:px-6
      "
    >
      {/* Title */}
      <p className="text-sm sm:text-base md:text-lg text-gray-800 whitespace-nowrap">
        AI-powered cancer registry
      </p>

      {/* Search Center */}
      <div className="flex-1 flex justify-center px-2 sm:px-4">
        <div className="
          hidden sm:flex items-center gap-2 
          bg-gray-100 rounded-md 
          px-3 py-2 
          w-[180px] sm:w-[220px] md:w-[280px] lg:w-[360px]
        ">
          <Image src="/search.png" alt="Search Icon" width={16} height={16} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-xs md:text-sm"
          />
        </div>
      </div>

      {/* Right-side */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        
        {/* Notification */}
        <Image
          src="/notification.png"
          alt="Notifications"
          width={18}
          height={18}
          className="hidden sm:block"
        />

        {/* Profile */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative">
            <Image
              src="/simon.png"
              alt="Profile"
              width={26}
              height={26}
              className="rounded-full sm:w-[28px] sm:h-[28px]"
            />
            <span
              className={`
                absolute bottom-0 right-0 
                w-2 h-2 sm:w-2.5 sm:h-2.5 
                rounded-full border-2 border-white
                ${isOnline ? 'bg-green-500' : 'bg-red-500'}
              `}
            />
          </div>

          <span className="
            hidden md:inline 
            text-xs md:text-sm 
            font-medium text-gray-700 whitespace-nowrap
          ">
            Marcus White
          </span>
        </div>

        {/* Dropdown */}
        <button className="text-gray-500 text-xs md:text-sm">▼</button>
      </div>
    </header>
  );
};