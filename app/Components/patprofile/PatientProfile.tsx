'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockPatients } from './mockPatients';
import PatientTableHeader from './PatientTableHeader';
import PatientRow from './PatientRow';

const PatientProfile = () => {
  const [expandedId, setExpandedId] = useState<number | null>(4);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Patient profile</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by case id"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>

          {/* Table Header */}
          <PatientTableHeader />

          {/* Patient Rows */}
          <div className="divide-y divide-gray-200">
            {mockPatients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                isExpanded={expandedId === patient.id}
                onToggle={() => toggleExpand(patient.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
