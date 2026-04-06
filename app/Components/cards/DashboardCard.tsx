'use client';

import React from 'react';
import Image from 'next/image';

interface DashboardCardProps {
  icon: string;
  total: string;
  label: string;
  growthIcon: string;
  growthRate: string;
  growthColor: string;
  growthNote: string;
}

const DashboardCard = ({
  icon,
  total,
  label,
  growthIcon,
  growthRate,
  growthColor,
  growthNote,
}: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-xl mt-6 p-4 sm:p-6 shadow flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
      
      {/* Icon */}
      <div className="flex-shrink-0 flex justify-center sm:justify-start">
        <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
          <Image
            src={icon}
            alt={label}
            fill
            style={{ objectFit: 'contain' }}
            className="rounded"
          />
        </div>
      </div>

      {/* Text and stats */}
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{total}</p>
          <span className="text-lg sm:text-xl text-gray-900 truncate">{label}</span>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-2 sm:mt-4 text-sm">
          <div className="w-4 h-4 relative">
            <Image src={growthIcon} alt="growth" fill style={{ objectFit: 'contain' }} />
          </div>
          <span className={`${growthColor} font-semibold text-base`}>{growthRate}</span>
          <span className="underline cursor-pointer text-gray-500">{growthNote}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;