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
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
      <div className="flex gap-8">
        <PersonalInfoSection patient={patient} />
        <DescriptionSection patient={patient} />
        <ReportsSection patient={patient} />
      </div>
    </div>
  );
}
