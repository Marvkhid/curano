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
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 text-sm text-gray-900">{caseItem.patient}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{caseItem.caseNumber}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{caseItem.cancerType}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{caseItem.stage}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{caseItem.age}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{caseItem.date}</td>
        <td className="px-6 py-4 text-right">
          <button onClick={onToggle} className="text-gray-400 hover:text-gray-600">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={7} className="px-0 py-0">
            <ExpandedCaseView />
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default CaseTableRow;
