'use client';

import React from 'react';
import { Patient } from '../types';

interface ReportsSectionProps {
  patient: Patient;
}

export default function ReportsSection({ patient }: ReportsSectionProps) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase">Reports</h3>
        <div className="flex gap-2">
          <button className="text-xs text-gray-600 hover:text-gray-900">copy</button>
          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Add</button>
        </div>
      </div>
      <div className="space-y-2">
        <div
          className={`flex items-center justify-between py-2 px-3 bg-white rounded-md border ${
            patient.reports.drugPrescription ? 'border-green-300 bg-green-50' : 'border-gray-200'
          }`}
        >
          <span className="text-sm text-gray-700">Drug prescription</span>
          {patient.reports.drugPrescription && <span className="text-xs text-green-600">✓</span>}
        </div>
        <div
          className={`flex items-center justify-between py-2 px-3 bg-white rounded-md border ${
            patient.reports.clinicalData ? 'border-green-300 bg-green-50' : 'border-gray-200'
          }`}
        >
          <span className="text-sm text-gray-700">Clinical data</span>
          {patient.reports.clinicalData && <span className="text-xs text-green-600">✓</span>}
        </div>
        <div
          className={`flex items-center justify-between py-2 px-3 bg-white rounded-md border ${
            patient.reports.suggestedTreatment ? 'border-green-300 bg-green-50' : 'border-gray-200'
          }`}
        >
          <span className="text-sm text-gray-700">Suggested treatment</span>
          {patient.reports.suggestedTreatment && <span className="text-xs text-green-600">✓</span>}
        </div>
      </div>
    </div>
  );
}
