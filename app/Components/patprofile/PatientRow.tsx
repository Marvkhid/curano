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
  const chevron = isExpanded
    ? <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
    : <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />;

  const toggleBtn = (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
      className="
        inline-flex items-center justify-center
        min-w-[36px] min-h-[36px]
        text-gray-400 hover:text-gray-600
        touch-manipulation select-none active:scale-95
        transition-all duration-150 rounded-md
      "
    >
      {chevron}
    </button>
  );

  return (
    <>
      {/* ── Desktop: valid <tr> rows inside <tbody> ── */}
      <tr className="hidden md:table-row hover:bg-gray-50 transition-colors">
        <td className="px-4 lg:px-6 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/nathan.png"
                alt={patient.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs lg:text-sm font-medium text-gray-900 truncate max-w-[100px] lg:max-w-none">
              {patient.name}
            </span>
          </div>
        </td>
        <td className="px-4 lg:px-6 py-3 text-xs lg:text-sm text-gray-600">{patient.gender}</td>
        <td className="px-4 lg:px-6 py-3 text-xs lg:text-sm text-gray-600">{patient.age}</td>
        <td className="px-4 lg:px-6 py-3 text-xs lg:text-sm text-gray-600">{patient.diagnosis}</td>
        <td className="px-4 lg:px-6 py-3">
          <span className={`inline-flex px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
            {patient.status}
          </span>
        </td>
        <td className="px-4 lg:px-6 py-3 text-xs lg:text-sm text-gray-600">{patient.blood}</td>
        <td className="px-4 lg:px-6 py-3 text-xs lg:text-sm text-gray-600">{patient.lastVisit}</td>
        <td className="px-4 lg:px-6 py-3 text-right">{toggleBtn}</td>
      </tr>

      {/* Expanded panel — must stay inside valid <tr><td> */}
      {isExpanded && (
        <tr className="hidden md:table-row">
          <td colSpan={8} className="p-0 border-b border-gray-100">
            <ExpandedDetails patient={patient} />
          </td>
        </tr>
      )}

      {/* ── Mobile: card layout, lives outside <table> in PatientProfile ── */}
      <div className="md:hidden px-3 sm:px-4 py-3 sm:py-4 hover:bg-gray-50 transition-colors">
        {/* Top row: avatar + name + toggle */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src="/nathan.png"
                alt={patient.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{patient.name}</p>
              <p className="text-[10px] text-gray-500">{patient.diagnosis}</p>
            </div>
          </div>
          {toggleBtn}
        </div>

        {/* Detail grid */}
        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
          {[
            { label: 'Gender',     value: patient.gender   },
            { label: 'Age',        value: patient.age      },
            { label: 'Blood',      value: patient.blood    },
            { label: 'Last Visit', value: patient.lastVisit },
          ].map(({ label, value }) => (
            <div key={label}>
              <dt className="text-[10px] text-gray-400">{label}</dt>
              <dd className="text-xs text-gray-700 font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Status badge */}
        <div className="mt-2">
          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(patient.status)}`}>
            {patient.status}
          </span>
        </div>

        {/* Expanded details */}
        {isExpanded && (
          <div className="mt-3 border-t border-gray-100 pt-3">
            <ExpandedDetails patient={patient} />
          </div>
        )}
      </div>
    </>
  );
}