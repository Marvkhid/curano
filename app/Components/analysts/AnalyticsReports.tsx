'use client';

import React, { useState } from 'react';
import { TabType } from './type';
import { caseActivities, doctors, allCountryRates, chartData } from './data';
import UsersChart from './UsersChart';
import CaseActivityTable from './CaseActivityTable';
import CancerRateCard from './CancerRateCard';
import TopContributorsCard from './TopContributorsCard';

const AnalyticsReports = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Total Users');

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Analytics & Reports</h1>
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-purple-600">📊</span>
              Add AI
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              ➕ Add
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              🔄 Reminders & History
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              📄 ECM
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              📋 Request Log
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              ⚙️ Assign case
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <UsersChart chartData={chartData} activeTab={activeTab} onTabChange={setActiveTab} />
            <CaseActivityTable caseActivities={caseActivities} />
          </div>

          <div className="space-y-6">
            <CancerRateCard allCountryRates={allCountryRates} />
            <TopContributorsCard doctors={doctors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
