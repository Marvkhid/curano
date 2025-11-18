// TopContributorsCard.tsx

'use client';

import React from 'react';
import { Doctor } from './type';

interface TopContributorsCardProps {
  doctors: Doctor[];
}

const TopContributorsCard: React.FC<TopContributorsCardProps> = ({ doctors }) => {
  const getInitials = (name: string) => {
    const parts = name.replace('Dr. ', '').split(' ');
    return parts
      .map((p) => p[0])
      .join('')
      .substring(0, 2);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Top contributors</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sort by</span>
          <select className="text-xs font-medium text-gray-700 border-0 focus:ring-0 cursor-pointer">
            <option>Doctor</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-2 gap-4 pb-2 border-b border-gray-200">
          <span className="text-xs font-medium text-gray-500 uppercase">Doctor&apos;s Name</span>
          <span className="text-xs font-medium text-gray-500 uppercase text-right">Status</span>
        </div>

        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {getInitials(doctor.name)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                <p className="text-xs text-gray-500">{doctor.specialty}</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <span
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  doctor.status === 'Available' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    doctor.status === 'Available' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                />
                {doctor.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContributorsCard;
