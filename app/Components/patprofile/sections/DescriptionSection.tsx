'use client';

import React from 'react';
import { Patient } from '../types';

interface DescriptionSectionProps {
  patient: Patient;
}

export default function DescriptionSection({ patient }: DescriptionSectionProps) {
  return (
    <div className="flex-1">
      <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">Description</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Class</span>
          <span className="text-gray-900 font-medium">{patient.class}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Diagnosis</span>
          <span className="text-gray-900 font-medium">{patient.diagnosisCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500"></span>
          <span className="text-gray-900 font-medium">Prostate</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Stage</span>
          <span className="text-gray-900 font-medium">{patient.stage}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">ER status</span>
          <span className="text-gray-900 font-medium">{patient.erStatus}</span>
        </div>
      </div>
    </div>
  );
}
