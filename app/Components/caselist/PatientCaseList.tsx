'use client';

import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import CaseTableRow from './CaseTableRow';
import CaseMobileCard from './CaseMobileCard';
import { mockCases } from './mockCases';

const PAGES = [
  { label: '‹', value: 'prev', ariaLabel: 'Previous page' },
  { label: '1', value: '1',    ariaLabel: 'Page 1' },
  { label: '2', value: '2',    ariaLabel: 'Page 2' },
  { label: '3', value: '3',    ariaLabel: 'Page 3' },
  { label: '4', value: '4',    ariaLabel: 'Page 4' },
  { label: '5', value: '5',    ariaLabel: 'Page 5' },
  { label: '›', value: 'next', ariaLabel: 'Next page' },
];

const HEADINGS = ['Patient', 'Case', 'Cancer Type', 'Stage', 'Age', 'Date', ''];

const PatientCaseList: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery]  = useState<string>('');
  const [currentPage, setCurrentPage]  = useState<string>('1');

  const toggleRow = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const filteredCases = mockCases.filter((c) =>
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Case list
          </h1>
          <button
            type="button"
            className="
              inline-flex items-center gap-2
              px-3 sm:px-4 py-2
              bg-white border border-gray-300 rounded-lg
              text-sm sm:text-base font-medium text-gray-700
              hover:bg-gray-50
              touch-manipulation select-none active:scale-95
              transition-all duration-150 flex-shrink-0
            "
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Ask AI-Transcribing
          </button>
        </div>

        {/* ── Search ── */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by case id"
            aria-label="Search by case id"
            className="
              w-full pl-9 sm:pl-10 pr-4
              py-2 sm:py-2.5 md:py-3
              bg-white border border-gray-300 rounded-lg
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition
            "
          />
        </div>

        {/* ── Table container ── */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

          {/* Desktop table — md+ */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {HEADINGS.map((heading, i) => (
                    <th
                      key={`${heading}-${i}`}
                      scope="col"
                      className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCases.length > 0 ? (
                  filteredCases.map((caseItem) => (
                    <CaseTableRow
                      key={caseItem.id}
                      caseItem={caseItem}
                      isExpanded={expandedRow === caseItem.id}
                      onToggle={() => toggleRow(caseItem.id)}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      No cases match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards — below md */}
          <div className="md:hidden divide-y divide-gray-200">
            {filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => (
                <CaseMobileCard
                  key={caseItem.id}
                  caseItem={caseItem}
                  isExpanded={expandedRow === caseItem.id}
                  onToggle={() => toggleRow(caseItem.id)}
                />
              ))
            ) : (
              <p className="px-4 py-10 text-center text-sm text-gray-400">
                No cases match your search.
              </p>
            )}
          </div>

          {/* ── Pagination footer ── */}
          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-between items-center gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-600">
              Showing <span className="font-medium">10</span> of{' '}
              <span className="font-medium">50</span>
            </p>

            <nav aria-label="Pagination">
              <ul className="flex items-center gap-0.5 sm:gap-1 list-none m-0 p-0">
                {PAGES.map(({ label, value, ariaLabel }) => {
                  const isActive = value === currentPage;
                  const isNav = value === 'prev' || value === 'next';
                  return (
                    <li key={value}>
                      <button
                        type="button"
                        aria-label={ariaLabel}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => !isNav && setCurrentPage(value)}
                        className={`
                          inline-flex items-center justify-center
                          min-w-[32px] sm:min-w-[36px] min-h-[32px] sm:min-h-[36px]
                          px-2 sm:px-3 py-1
                          text-xs sm:text-sm rounded
                          touch-manipulation select-none active:scale-95
                          transition-all duration-150
                          ${isActive
                            ? 'bg-teal-500 text-white font-medium'
                            : 'text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCaseList;