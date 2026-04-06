'use client';

import React from 'react';
import Image from 'next/image';
import { Patient } from '../types';

interface PersonalInfoSectionProps {
  patient: Patient;
}

export default function PersonalInfoSection({ patient }: PersonalInfoSectionProps) {
  const fields = [
    { label: 'Contact Number', value: patient.contactNumber, span: false },
    { label: 'Gender',         value: patient.gender,        span: false },
    { label: 'Date of Birth',  value: patient.dateOfBirth,   span: false },
    { label: 'Member Since',   value: patient.memberSince,   span: false },
    { label: 'Address',        value: patient.address,       span: true  },
  ];

  return (
    <div className="flex-1 w-full min-w-0">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Personal Information
        </h3>
        <span className="inline-flex px-2 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium bg-[#D1FAE5] text-[#065F46] flex-shrink-0">
          Active
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Avatar + name */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/nathan.png"
              alt={patient.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
              {patient.name}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 truncate">
              {patient.email}
            </p>
          </div>
        </div>

        {/* Info grid */}
        <dl className="grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-3">
          {fields.map((field) => (
            <div
              key={field.label}
              className={field.span ? 'col-span-2' : 'col-span-1 min-w-0'}
            >
              <dt className="text-[10px] sm:text-xs text-gray-500 mb-0.5">
                {field.label}
              </dt>
              <dd className="text-xs sm:text-sm text-gray-900 font-medium break-words">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}