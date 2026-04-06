'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockPatients } from './mockPatients';
import PatientTableHeader from './PatientTableHeader';
import PatientRow from './PatientRow';

const PatientProfile = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredPatients = mockPatients.filter((p) =>
    p.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">

          {/* Header */}
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 flex-shrink-0">
              Patient profile
            </h1>
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search by case id"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search by case id"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Table — desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <PatientTableHeader />
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <PatientRow
                      key={patient.id}
                      patient={patient}
                      isExpanded={expandedId === patient.id}
                      onToggle={() => toggleExpand(patient.id)}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      No patients match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards — mobile */}
          <div className="md:hidden divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <PatientRow
                  key={patient.id}
                  patient={patient}
                  isExpanded={expandedId === patient.id}
                  onToggle={() => toggleExpand(patient.id)}
                />
              ))
            ) : (
              <p className="px-4 py-10 text-center text-sm text-gray-400">
                No patients match your search.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientProfile;