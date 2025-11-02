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
    <div className="bg-white rounded-xl mt-6 p-6 shadow flex gap-6">
      <div className="flex justify-start">
        <Image src={icon} alt={label} width={100} height={70} />
      </div>

      <div>
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-bold text-gray-900">{total}</p>
          <span className="text-gray-900 text-lg">{label}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Image src={growthIcon} alt="growth" width={18} height={18} />
          <span className={`${growthColor} font-semibold text-base`}>{growthRate}</span>
          <span className="underline cursor-pointer text-gray-500">{growthNote}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
