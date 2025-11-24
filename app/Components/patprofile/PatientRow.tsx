'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Patient } from './types';
import { getStatusColor } from './utils';
import ExpandedDetails from './ExpandedDetails';

interface PatientRowProps {
  patient: Patient;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function PatientRow({ patient, isExpanded, onToggle }: PatientRowProps) {
  return (
    <div>
      {/* Main Row */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center">
        <div className="col-span-2 flex items-center gap-3">
          <Image
            src="/nathan.png"
            alt={patient.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-900">{patient.name}</span>
        </div>
        <div className="col-span-1 text-sm text-gray-600">{patient.gender}</div>
        <div className="col-span-1 text-sm text-gray-600">{patient.age}</div>
        <div className="col-span-2 text-sm text-gray-600">{patient.diagnosis}</div>
        <div className="col-span-2">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              patient.status
            )}`}
          >
            {patient.status}
          </span>
        </div>
        <div className="col-span-1 text-sm text-gray-600">{patient.blood}</div>
        <div className="col-span-2 text-sm text-gray-600">{patient.lastVisit}</div>
        <div className="col-span-1 flex justify-end">
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && <ExpandedDetails patient={patient} />}
    </div>
  );
}
