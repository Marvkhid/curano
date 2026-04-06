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
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
            Analytics & Reports
          </h1>

          {/* Button group: scrollable on mobile */}
          <div className="flex overflow-x-auto gap-2 py-2">
            {[
              { icon: '📊', label: 'Add AI' },
              { icon: '➕', label: 'Add' },
              { icon: '🔄', label: 'Reminders & History' },
              { icon: '📄', label: 'ECM' },
              { icon: '📋', label: 'Request Log' },
              { icon: '⚙️', label: 'Assign case' },
            ].map((btn) => (
              <button
                key={btn.label}
                className="flex-shrink-0 flex items-center gap-2 px-3 py-2 text-sm md:text-base text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <span>{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Charts & Table */}
          <div className="lg:col-span-2 space-y-6">
            <UsersChart chartData={chartData} activeTab={activeTab} onTabChange={setActiveTab} />
            <CaseActivityTable caseActivities={caseActivities} />
          </div>

          {/* Right Column: Cards */}
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