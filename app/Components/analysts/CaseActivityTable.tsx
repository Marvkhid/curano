// CaseActivityTable.tsx

'use client';

import React, { useState } from 'react';
import { Search, Download, Share2 } from 'lucide-react';
import { CaseActivity } from './type';

interface CaseActivityTableProps {
  caseActivities: CaseActivity[];
}

const CaseActivityTable: React.FC<CaseActivityTableProps> = ({ caseActivities }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Latest case activity log</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by case id"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Patient
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Case
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Cancer type
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Stage
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Age
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {caseActivities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">{activity.patient}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{activity.caseNumber}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{activity.cancerType}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{activity.stage}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{activity.age}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{activity.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-3">
          {caseActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">{activity.patient}</p>
                  <p className="text-sm text-gray-500">{activity.caseNumber}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-400">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Type:</span> {activity.cancerType}
                </div>
                <div>
                  <span className="text-gray-500">Stage:</span> {activity.stage}
                </div>
                <div>
                  <span className="text-gray-500">Age:</span> {activity.age}
                </div>
                <div>
                  <span className="text-gray-500">Date:</span> {activity.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Pg 1 of 10</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-teal-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseActivityTable;
