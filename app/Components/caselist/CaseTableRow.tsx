'use client';

import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import ExpandedCaseView from './ExpandedCaseView';

interface CaseData {
  id: string;
  patient: string;
  caseNumber: string;
  cancerType: string;
  stage: string;
  age: number;
  date: string;
}

interface CaseTableRowProps {
  caseItem: CaseData;
  isExpanded: boolean;
  onToggle: () => void;
}

const CaseTableRow: React.FC<CaseTableRowProps> = ({ caseItem, isExpanded, onToggle }) => {
  return (
    <React.Fragment>
      {/* Main row — visible on md+ */}
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{caseItem.patient}</td>
        <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{caseItem.caseNumber}</td>
        <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{caseItem.cancerType}</td>
        <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{caseItem.stage}</td>
        <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{caseItem.age}</td>
        <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{caseItem.date}</td>
        <td className="px-4 sm:px-6 py-3 text-right">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md touch-manipulation active:scale-95 transition-all"
          >
            {isExpanded
              ? <ChevronDown className="w-5 h-5" aria-hidden="true" />
              : <ChevronRight className="w-5 h-5" aria-hidden="true" />
            }
          </button>
        </td>
      </tr>

      {/* Expanded desktop panel — must be a valid <tr><td> */}
      {isExpanded && (
        <tr>
          <td colSpan={7} className="p-0 border-b border-gray-100">
            <ExpandedCaseView />
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default CaseTableRow;