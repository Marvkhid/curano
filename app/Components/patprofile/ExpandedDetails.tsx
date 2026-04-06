'use client';

import React from 'react';
import { Patient } from './types';
import PersonalInfoSection from './sections/PersonalInfoSection';
import DescriptionSection from './sections/DescriptionSection';
import ReportsSection from './sections/ReportsSection';

interface ExpandedDetailsProps {
  patient: Patient;
}

export default function ExpandedDetails({ patient }: ExpandedDetailsProps) {
  return (
    <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-100 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <PersonalInfoSection patient={patient} />
        <DescriptionSection patient={patient} />
        <ReportsSection patient={patient} />
      </div>
    </div>
  );
}