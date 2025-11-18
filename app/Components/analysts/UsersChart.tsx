'use client';

import React, { useState } from 'react';
import { ChartData, TabType } from './type';

interface UsersChartProps {
  chartData: ChartData[];
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const UsersChart: React.FC<UsersChartProps> = ({ chartData, activeTab, onTabChange }) => {
  const [hoveredPoint, setHoveredPoint] = useState<ChartData | null>(null);

  const generateSmoothPath = () => {
    if (chartData.length === 0) return '';

    let path = `M ${chartData[0].x} ${chartData[0].y}`;

    for (let i = 0; i < chartData.length - 1; i++) {
      const current = chartData[i];
      const next = chartData[i + 1];
      const midX = (current.x + next.x) / 2;

      path += ` Q ${midX} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
      path += ` T ${next.x} ${next.y}`;
    }

    return path;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex items-center gap-6 mb-6 border-b border-gray-200">
        <button
          onClick={() => onTabChange('Total Users')}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === 'Total Users'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Total Users
        </button>
        <button
          onClick={() => onTabChange('Total Projects')}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === 'Total Projects'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Total Projects
        </button>
        <button
          onClick={() => onTabChange('Operating Status')}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeTab === 'Operating Status'
              ? 'text-gray-900 border-b-2 border-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Operating Status
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <button className="px-3 py-1.5 text-xs font-medium bg-gray-900 text-white rounded-md">
          • Current Week
        </button>
        <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
          • Previous Week
        </button>
      </div>

      <div className="relative h-64 sm:h-80">
        <svg viewBox="0 0 600 250" className="w-full h-full">
          <text x="10" y="30" className="text-xs fill-gray-500">
            350k
          </text>
          <text x="10" y="90" className="text-xs fill-gray-500">
            250k
          </text>
          <text x="10" y="150" className="text-xs fill-gray-500">
            150k
          </text>
          <text x="10" y="210" className="text-xs fill-gray-500">
            0
          </text>

          <line x1="50" y1="30" x2="580" y2="30" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="50" y1="90" x2="580" y2="90" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="50" y1="150" x2="580" y2="150" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="50" y1="210" x2="580" y2="210" stroke="#E5E7EB" strokeWidth="1" />

          <path d={generateSmoothPath()} fill="none" stroke="#1F2937" strokeWidth="2.5" />

          <path
            d="M 50 130 L 580 60"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1.5"
            strokeDasharray="5,5"
          />

          {chartData.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="20"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredPoint(point)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredPoint?.month === point.month ? '6' : '4'}
                fill="white"
                stroke="#1F2937"
                strokeWidth="2"
                className="pointer-events-none transition-all"
              />
            </g>
          ))}

          {hoveredPoint && (
            <>
              <rect
                x={hoveredPoint.x - 45}
                y={hoveredPoint.y - 35}
                width="90"
                height="28"
                rx="6"
                fill="#1F2937"
              />
              <text
                x={hoveredPoint.x}
                y={hoveredPoint.y - 15}
                className="text-xs fill-white font-semibold"
                textAnchor="middle"
              >
                {hoveredPoint.value.toLocaleString()}
              </text>
            </>
          )}

          {chartData.map((point, index) => (
            <text
              key={index}
              x={point.x}
              y="235"
              className="text-xs fill-gray-500"
              textAnchor="middle"
            >
              {point.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default UsersChart;
