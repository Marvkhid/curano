'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  Download,
  Share2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

interface CaseData {
  id: string;
  patient: string;
  caseNumber: string;
  cancerType: string;
  stage: string;
  age: number;
  date: string;
}

const PatientCaseList: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>('3');

  const cases: CaseData[] = [
    {
      id: '1',
      patient: 'Joshua White',
      caseNumber: '#1234',
      cancerType: 'Breast',
      stage: 'IIA',
      age: 54,
      date: '21/06/2025',
    },
    {
      id: '2',
      patient: 'Joshua White',
      caseNumber: '#1234',
      cancerType: 'Breast',
      stage: 'IIA',
      age: 54,
      date: '21/06/2025',
    },
    {
      id: '3',
      patient: 'Joshua White',
      caseNumber: '#1234',
      cancerType: 'Breast',
      stage: 'IIA',
      age: 54,
      date: '21/06/2025',
    },
    {
      id: '4',
      patient: 'Joshua White',
      caseNumber: '#0e101144',
      cancerType: 'Breast',
      stage: 'IIA',
      age: 54,
      date: '21/06/2025',
    },
    {
      id: '5',
      patient: 'Joshua White',
      caseNumber: '#1234',
      cancerType: 'Breast',
      stage: 'IIA',
      age: 54,
      date: '21/06/2025',
    },
    {
      id: '6',
      patient: 'Joshua White',
      caseNumber: '#1234',
      cancerType: 'Breast',
      stage: 'IIA',
      age: 54,
      date: '21/06/2025',
    },
    {
      id: '7',
      patient: 'Joshua White',
      caseNumber: '#1234',
      cancerType: 'Breast',
      stage: 'IIA',
      age: 54,
      date: '21/06/2025',
    },
  ];

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
                {cases.map((caseItem) => (
                  <React.Fragment key={caseItem.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">{caseItem.patient}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{caseItem.caseNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{caseItem.cancerType}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{caseItem.stage}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{caseItem.age}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{caseItem.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleRow(caseItem.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedRow === caseItem.id ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === caseItem.id && (
                      <tr>
                        <td colSpan={7} className="px-0 py-0">
                          <ExpandedCaseView />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">
            {cases.map((caseItem) => (
              <div key={caseItem.id}>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{caseItem.patient}</p>
                      <p className="text-sm text-gray-500">{caseItem.caseNumber}</p>
                    </div>
                    <button
                      onClick={() => toggleRow(caseItem.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedRow === caseItem.id ? (
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
                {expandedRow === caseItem.id && <ExpandedCaseView />}
              </div>
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

const ExpandedCaseView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('structured');

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('structured')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'structured'
                ? 'text-gray-900 border-b-2 border-blue-600 bg-gray-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Structured patient data
          </button>
          <button
            onClick={() => setActiveTab('clinical')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'clinical'
                ? 'text-gray-900 border-b-2 border-blue-600 bg-gray-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Clinical data
          </button>
          <button
            onClick={() => setActiveTab('treatment')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === 'treatment'
                ? 'text-gray-900 border-b-2 border-blue-600 bg-gray-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Suggested treatment
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 bg-white">
        {/* Structured Patient Data */}
        <div className="p-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Structured patient data
          </h3>
          <div className="space-y-4">
            <DataField label="Name" value="Joshua White" />
            <DataField label="Age" value="54" />
            <DataField label="Diagnosis" value="Breast cancer" />
            <DataField label="Stage" value="s IIA" />
            <DataField label="ER Status" value="Positive" highlight="red" />
            <DataField label="Surgery" value="Pending" highlight="orange" />
          </div>
        </div>

        {/* Clinical Data */}
        <div className="p-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Clinical data
          </h3>
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-900 leading-relaxed">
              Patient presented with stage 2 breast cancer. Biopsy confirmed
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </p>
          </div>
        </div>

        {/* Suggested Treatment */}
        <div className="p-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Suggested treatment
          </h3>
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-900 leading-relaxed">
              Patient presented with stage 2 breast cancer. Biopsy confirmed
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex flex-wrap gap-2 justify-end">
          <ActionButton icon={<Plus className="w-4 h-4" />} label="Add" />
          <ActionButton icon={<Edit className="w-4 h-4" />} label="Edit" />
          <ActionButton icon={<Download className="w-4 h-4" />} label="Exports" />
          <ActionButton icon={<Share2 className="w-4 h-4" />} label="Share" />
        </div>
      </div>
    </div>
  );
};

interface DataFieldProps {
  label: string;
  value: string;
  highlight?: 'red' | 'orange';
}

const DataField: React.FC<DataFieldProps> = ({ label, value, highlight }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500 mb-1">{label}</span>
    <span
      className={`text-sm font-medium ${
        highlight === 'red'
          ? 'text-red-600'
          : highlight === 'orange'
          ? 'text-orange-600'
          : 'text-gray-900'
      }`}
    >
      {value}
    </span>
  </div>
);

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label }) => (
  <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors border border-gray-200">
    {icon}
    <span>{label}</span>
  </button>
);

export default PatientCaseList;
