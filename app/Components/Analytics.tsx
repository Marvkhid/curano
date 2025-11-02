'use client';

import React, { useState, useMemo } from 'react';
import { Search, Download, Share2, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';

interface CaseActivity {
  id: string;
  patient: string;
  caseNumber: string;
  cancerType: string;
  stage: string;
  age: string;
  date: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  status: 'Available' | 'Absent';
}

interface CountryRate {
  country: string;
  countryCode: string;
  rate: number;
  trend: number;
}

interface ChartData {
  month: string;
  value: number;
  x: number;
  y: number;
}

const AnalyticsReports = () => {
  const [activeTab, setActiveTab] = useState<'Total Users' | 'Total Projects' | 'Operating Status'>(
    'Total Users'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredPoint, setHoveredPoint] = useState<ChartData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const caseActivities: CaseActivity[] = [
    {
      id: '1',
      patient: 'Sarah Johnson',
      caseNumber: '#1234',
      cancerType: 'Breast',
      stage: 'IIA',
      age: '54',
      date: '21/09/2025',
    },
    {
      id: '2',
      patient: 'Michael Chen',
      caseNumber: '#1235',
      cancerType: 'Cervical',
      stage: 'IB',
      age: '47',
      date: '20/09/2025',
    },
    {
      id: '3',
      patient: 'Robert Williams',
      caseNumber: '#1236',
      cancerType: 'Prostate',
      stage: 'IIIA',
      age: '62',
      date: '19/09/2025',
    },
    {
      id: '4',
      patient: 'Emily Davis',
      caseNumber: '#1237',
      cancerType: 'Lung',
      stage: 'IIA',
      age: '58',
      date: '18/09/2025',
    },
    {
      id: '5',
      patient: 'James Martinez',
      caseNumber: '#1238',
      cancerType: 'Colorectal',
      stage: 'IIB',
      age: '51',
      date: '17/09/2025',
    },
    {
      id: '6',
      patient: 'Lisa Anderson',
      caseNumber: '#1239',
      cancerType: 'Ovarian',
      stage: 'IC',
      age: '45',
      date: '16/09/2025',
    },
    {
      id: '7',
      patient: 'David Thompson',
      caseNumber: '#1240',
      cancerType: 'Melanoma',
      stage: 'IIA',
      age: '39',
      date: '15/09/2025',
    },
    {
      id: '8',
      patient: 'Maria Garcia',
      caseNumber: '#1241',
      cancerType: 'Thyroid',
      stage: 'I',
      age: '43',
      date: '14/09/2025',
    },
    {
      id: '9',
      patient: 'John Wilson',
      caseNumber: '#1242',
      cancerType: 'Pancreatic',
      stage: 'IIA',
      age: '67',
      date: '13/09/2025',
    },
  ];

  const doctors: Doctor[] = [
    { id: 1, name: 'Dr. Sarah Mitchell', specialty: 'Medical Oncologist', status: 'Available' },
    { id: 2, name: 'Dr. James Patterson', specialty: 'Radiation Oncologist', status: 'Available' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Surgical Oncologist', status: 'Available' },
    { id: 4, name: 'Dr. Michael Chang', specialty: 'Hematologist', status: 'Absent' },
    { id: 5, name: 'Dr. Rachel Foster', specialty: 'Gynecologic Oncologist', status: 'Absent' },
    { id: 6, name: 'Dr. David Lee', specialty: 'Thoracic Surgeon', status: 'Absent' },
    { id: 7, name: 'Dr. Amanda Brooks', specialty: 'Pediatric Oncologist', status: 'Available' },
  ];

  const allCountryRates: CountryRate[] = useMemo(
    () => [
      { country: 'United States', countryCode: 'us', rate: 75, trend: 28.4 },
      { country: 'Pakistan', countryCode: 'pk', rate: 65, trend: -18.2 },
      { country: 'India', countryCode: 'in', rate: 85, trend: 23.8 },
      { country: 'Brazil', countryCode: 'br', rate: 70, trend: 25.8 },
      { country: 'Nigeria', countryCode: 'ng', rate: 45, trend: 11.9 },
      { country: 'United Kingdom', countryCode: 'gb', rate: 68, trend: 15.3 },
      { country: 'China', countryCode: 'cn', rate: 78, trend: 19.7 },
      { country: 'Japan', countryCode: 'jp', rate: 72, trend: -8.4 },
      { country: 'Germany', countryCode: 'de', rate: 81, trend: 22.1 },
      { country: 'Canada', countryCode: 'ca', rate: 77, trend: 18.9 },
      { country: 'Australia', countryCode: 'au', rate: 69, trend: 12.6 },
      { country: 'South Africa', countryCode: 'za', rate: 52, trend: -5.2 },
      { country: 'France', countryCode: 'fr', rate: 74, trend: 16.8 },
      { country: 'Mexico', countryCode: 'mx', rate: 58, trend: 9.3 },
      { country: 'South Korea', countryCode: 'kr', rate: 80, trend: 21.4 },
    ],
    []
  );

  const availableCountries = useMemo(() => {
    return [
      { value: 'all', label: 'All Countries' },
      ...allCountryRates
        .map((c) => ({ value: c.countryCode, label: c.country }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [allCountryRates]);

  const filteredCountryRates = useMemo(() => {
    if (selectedCountry === 'all') {
      return allCountryRates.slice(0, 5);
    }
    return allCountryRates.filter((c) => c.countryCode === selectedCountry);
  }, [selectedCountry, allCountryRates]);

  const chartData: ChartData[] = [
    { month: 'Jan', value: 245000, x: 80, y: 120 },
    { month: 'Feb', value: 198000, x: 160, y: 140 },
    { month: 'Mar', value: 267000, x: 240, y: 105 },
    { month: 'Apr', value: 225000, x: 320, y: 125 },
    { month: 'May', value: 289000, x: 400, y: 90 },
    { month: 'Jun', value: 302000, x: 480, y: 78 },
    { month: 'Jul', value: 324000, x: 560, y: 60 },
  ];

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

  const getInitials = (name: string) => {
    const parts = name.replace('Dr. ', '').split(' ');
    return parts
      .map((p) => p[0])
      .join('')
      .substring(0, 2);
  };

  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/48x36/${countryCode}.png`;
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setShowCountryDropdown(false);
  };

  const getSelectedCountryLabel = () => {
    const country = availableCountries.find((c) => c.value === selectedCountry);
    return country?.label || 'All Countries';
  };

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
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center gap-6 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('Total Users')}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === 'Total Users'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Total Users
                </button>
                <button
                  onClick={() => setActiveTab('Total Projects')}
                  className={`pb-3 text-sm font-medium transition-colors relative ${
                    activeTab === 'Total Projects'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Total Projects
                </button>
                <button
                  onClick={() => setActiveTab('Operating Status')}
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
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Cancer rate</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Sort by</span>
                  <div className="relative">
                    <button
                      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {getSelectedCountryLabel()}
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {showCountryDropdown && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                        {availableCountries.map((country) => (
                          <button
                            key={country.value}
                            onClick={() => handleCountrySelect(country.value)}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                              selectedCountry === country.value
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-700'
                            }`}
                          >
                            {country.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {filteredCountryRates.map((country, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getFlagUrl(country.countryCode)}
                          alt={country.country}
                          className="w-8 h-6 object-cover rounded shadow-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{country.rate}%</p>
                          <p className="text-xs text-gray-500">{country.country}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {country.trend > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            country.trend > 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {country.trend > 0 ? '+' : ''}
                          {country.trend}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${country.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Top contributors</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Sort by</span>
                  <select className="text-xs font-medium text-gray-700 border-0 focus:ring-0 cursor-pointer">
                    <option>Doctor</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-2 gap-4 pb-2 border-b border-gray-200">
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    Doctor&apos;s Name
                  </span>
                  <span className="text-xs font-medium text-gray-500 uppercase text-right">
                    Status
                  </span>
                </div>

                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {getInitials(doctor.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                        <p className="text-xs text-gray-500">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-end">
                      <span
                        className={`flex items-center gap-1.5 text-xs font-medium ${
                          doctor.status === 'Available' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            doctor.status === 'Available' ? 'bg-green-600' : 'bg-red-600'
                          }`}
                        />
                        {doctor.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReports;
