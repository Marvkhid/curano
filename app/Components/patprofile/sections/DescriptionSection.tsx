'use client';

import React from 'react';
import { Patient } from '../types';

interface DescriptionSectionProps {
  patient: Patient;
}

export default function DescriptionSection({ patient }: DescriptionSectionProps) {
  const fields = [
    { label: 'Class',     value: patient.class },
    { label: 'Diagnosis', value: patient.diagnosisCode },
    { label: '',          value: 'Prostate' },
    { label: 'Stage',     value: patient.stage },
    { label: 'ER status', value: patient.erStatus },
  ];

  return (
    <div className="flex-1 w-full min-w-0">
      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 sm:mb-4">
        Description
      </h3>

      <dl className="space-y-2 sm:space-y-3">
        {fields.map((field, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-2 sm:gap-4 min-w-0"
          >
            <dt className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
              {field.label}
            </dt>
            <dd className="text-xs sm:text-sm text-gray-900 font-medium text-right truncate min-w-0">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}