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

interface CaseMobileCardProps {
  caseItem: CaseData;
  isExpanded: boolean;
  onToggle: () => void;
}

const CaseMobileCard: React.FC<CaseMobileCardProps> = ({ caseItem, isExpanded, onToggle }) => {
  return (
    <div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-medium text-gray-900">{caseItem.patient}</p>
            <p className="text-sm text-gray-500">{caseItem.caseNumber}</p>
          </div>
          <button onClick={onToggle} className="text-gray-400 hover:text-gray-600">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Type: </span>
            <span className="text-gray-900">{caseItem.cancerType}</span>
          </div>
          <div>
            <span className="text-gray-500">Stage: </span>
            <span className="text-gray-900">{caseItem.stage}</span>
          </div>
          <div>
            <span className="text-gray-500">Age: </span>
            <span className="text-gray-900">{caseItem.age}</span>
          </div>
          <div>
            <span className="text-gray-500">Date: </span>
            <span className="text-gray-900">{caseItem.date}</span>
          </div>
        </div>
      </div>
      {isExpanded && <ExpandedCaseView />}
    </div>
  );
};

export default CaseMobileCard;
