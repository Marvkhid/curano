'use client';

import React from 'react';
import Image from 'next/image';
import { Patient } from '../types';

interface PersonalInfoSectionProps {
  patient: Patient;
}

export default function PersonalInfoSection({ patient }: PersonalInfoSectionProps) {
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase">Personal Information</h3>
        <span className="inline-flex px-2 py-1 rounded-md text-xs font-medium bg-[#D1FAE5] text-[#065F46]">
          Active
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Image
            src="/nathan.png"
            alt={patient.name}
            width={40}
            height={40}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-semibold text-gray-900">{patient.name}</div>
            <div className="text-xs text-gray-500">{patient.email}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-gray-500">Contact Number</div>
            <div className="text-gray-900 font-medium">{patient.contactNumber}</div>
          </div>
          <div>
            <div className="text-gray-500">Gender</div>
            <div className="text-gray-900 font-medium">{patient.gender}</div>
          </div>
          <div>
            <div className="text-gray-500">Date of Birth</div>
            <div className="text-gray-900 font-medium">{patient.dateOfBirth}</div>
          </div>
          <div>
            <div className="text-gray-500">Member Since</div>
            <div className="text-gray-900 font-medium">{patient.memberSince}</div>
          </div>
          <div className="col-span-2">
            <div className="text-gray-500">Address</div>
            <div className="text-gray-900 font-medium">{patient.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
