'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { CountryRate } from './type';

interface CancerRateCardProps {
  allCountryRates: CountryRate[];
}

const CancerRateCard: React.FC<CancerRateCardProps> = ({ allCountryRates }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const availableCountries = useMemo(() => {
    return [
      { value: 'all', label: 'All Countries' },
      ...allCountryRates
        .map((c) => ({ value: c.countryCode, label: c.country }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [allCountryRates]);

  const filteredCountryRates = useMemo(() => {
    if (selectedCountry === 'all') return allCountryRates.slice(0, 5);
    return allCountryRates.filter((c) => c.countryCode === selectedCountry);
  }, [selectedCountry, allCountryRates]);

  const getFlagUrl = (countryCode: string) =>
    `https://flagcdn.com/48x36/${countryCode}.png`;

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setShowCountryDropdown(false);
  };

  const getSelectedCountryLabel = () =>
    availableCountries.find((c) => c.value === selectedCountry)?.label ?? 'All Countries';

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 w-full max-w-full">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Cancer rate</h2>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500">Sort by</span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCountryDropdown((s) => !s)}
              aria-expanded={showCountryDropdown}
              aria-haspopup="listbox"
              className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap touch-manipulation"
            >
              {getSelectedCountryLabel()}
              <ChevronDown className="w-3 h-3" aria-hidden="true" />
            </button>

            {showCountryDropdown && (
              <ul
                role="listbox"
                aria-label="Select country"
                className="absolute right-0 top-full mt-2 w-48 sm:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto list-none m-0 p-0"
              >
                {availableCountries.map((country) => (
                  <li
                    key={country.value}
                    role="option"
                    aria-selected={selectedCountry === country.value}
                  >
                    <button
                      type="button"
                      onClick={() => handleCountrySelect(country.value)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors touch-manipulation ${
                        selectedCountry === country.value
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {country.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Country rows */}
      <div className="space-y-4">
        {filteredCountryRates.map((country, index) => (
          <div key={index} className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Image
                  src={getFlagUrl(country.countryCode)}
                  alt={`${country.country} flag`}
                  width={48}
                  height={36}
                  className="w-8 h-6 object-cover rounded shadow-sm flex-shrink-0"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  unoptimized
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{country.rate}%</p>
                  <p className="text-xs text-gray-500 truncate">{country.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                {country.trend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500" aria-hidden="true" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" aria-hidden="true" />
                )}
                <span className={`text-sm font-medium ${country.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {country.trend > 0 ? '+' : ''}{country.trend}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="w-full bg-gray-100 rounded-full h-2"
              role="progressbar"
              aria-valuenow={country.rate}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(country.rate, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancerRateCard;