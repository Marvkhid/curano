'use client';

import React, { useState } from 'react';
import { Plus, Edit, Download, Share2 } from 'lucide-react';
import DataField from './DataField';
import ActionButton from './ActionButton';

const ExpandedCaseView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'structured' | 'clinical' | 'treatment'>('structured');

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex overflow-x-auto">
          {( ['structured', 'clinical', 'treatment'] as const ).map((tab) => {
            const label =
              tab === 'structured'
                ? 'Structured patient data'
                : tab === 'clinical'
                ? 'Clinical data'
                : 'Suggested treatment';
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`min-w-max px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-gray-900 border-b-2 border-blue-600 bg-gray-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 lg:divide-x divide-gray-200 bg-white">
        {/* Structured Patient Data */}
        <div className="p-4 sm:p-6">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">
            Structured patient data
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <DataField label="Name" value="Joshua White" />
            <DataField label="Age" value="54" />
            <DataField label="Diagnosis" value="Breast cancer" />
            <DataField label="Stage" value="IIA" />
            <DataField label="ER Status" value="Positive" highlight="red" />
            <DataField label="Surgery" value="Pending" highlight="orange" />
          </div>
        </div>

        {/* Clinical Data */}
        <div className="p-4 sm:p-6">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">
            Clinical data
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed">
              Patient presented with stage 2 breast cancer. Biopsy confirmed.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Suggested Treatment */}
        <div className="p-4 sm:p-6">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 sm:mb-4">
            Suggested treatment
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed">
              Patient presented with stage 2 breast cancer. Biopsy confirmed.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-3 sm:p-4 bg-white">
        <div className="flex flex-wrap gap-2 justify-end sm:justify-start md:justify-end">
          <ActionButton icon={<Plus className="w-4 h-4" />} label="Add" />
          <ActionButton icon={<Edit className="w-4 h-4" />} label="Edit" />
          <ActionButton icon={<Download className="w-4 h-4" />} label="Exports" />
          <ActionButton icon={<Share2 className="w-4 h-4" />} label="Share" />
        </div>
      </div>
    </div>
  );
};

export default ExpandedCaseView;