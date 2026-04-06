'use client';

import React from 'react';
import { Patient } from '../types';

interface ReportsSectionProps {
  patient: Patient;
}

const REPORT_ITEMS: { label: string; key: keyof Patient['reports'] }[] = [
  { label: 'Drug prescription',  key: 'drugPrescription'  },
  { label: 'Clinical data',      key: 'clinicalData'      },
  { label: 'Suggested treatment', key: 'suggestedTreatment' },
];

export default function ReportsSection({ patient }: ReportsSectionProps) {
  return (
    <div className="flex-1 w-full min-w-0">

      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Reports
        </h3>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            type="button"
            className="
              inline-flex items-center justify-center
              min-h-[32px] sm:min-h-[36px]
              px-2 sm:px-3
              text-[10px] sm:text-xs text-gray-600
              hover:text-gray-900 hover:bg-gray-100
              rounded-md
              touch-manipulation select-none active:scale-95
              transition-all duration-150
            "
          >
            Copy
          </button>
          <button
            type="button"
            className="
              inline-flex items-center justify-center
              min-h-[32px] sm:min-h-[36px]
              px-2 sm:px-3
              text-[10px] sm:text-xs text-blue-600 font-medium
              hover:text-blue-800 hover:bg-blue-50
              rounded-md
              touch-manipulation select-none active:scale-95
              transition-all duration-150
            "
          >
            + Add
          </button>
        </div>
      </div>

      {/* Report items */}
      <ul className="space-y-1.5 sm:space-y-2 list-none m-0 p-0">
        {REPORT_ITEMS.map(({ label, key }) => {
          const checked = Boolean(patient.reports[key]);
          return (
            <li
              key={key}
              className={`
                flex items-center justify-between
                py-2 px-2.5 sm:px-3
                rounded-md border
                transition-colors
                ${checked
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-white'
                }
              `}
            >
              <span className="text-xs sm:text-sm text-gray-700 leading-snug">
                {label}
              </span>
              {checked && (
                <span
                  aria-label="Completed"
                  className="
                    inline-flex items-center justify-center
                    w-4 h-4 sm:w-5 sm:h-5
                    rounded-full bg-green-100
                    text-green-600 text-[10px] sm:text-xs
                    flex-shrink-0 ml-2
                  "
                >
                  ✓
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}