'use client';

import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import CaseTableRow from './CaseTableRow';
import CaseMobileCard from './CaseMobileCard';
import { mockCases } from './mockCases';

const PatientCaseList: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>('3');

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Case list</h1>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <ArrowRight className="w-4 h-4" />
            Ask AI-Transcribing
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by case id"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cancer Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockCases.map((caseItem) => (
                  <CaseTableRow
                    key={caseItem.id}
                    caseItem={caseItem}
                    isExpanded={expandedRow === caseItem.id}
                    onToggle={() => toggleRow(caseItem.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {mockCases.map((caseItem) => (
              <CaseMobileCard
                key={caseItem.id}
                caseItem={caseItem}
                isExpanded={expandedRow === caseItem.id}
                onToggle={() => toggleRow(caseItem.id)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">10</span> of 50
            </div>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors">
                &lt;
              </button>
              <button className="px-3 py-1 text-sm bg-teal-500 text-white rounded">1</button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors">
                2
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors">
                3
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors">
                4
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors">
                5
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCaseList;
