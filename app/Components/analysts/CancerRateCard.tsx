'use client';

import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
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
    if (selectedCountry === 'all') {
      return allCountryRates.slice(0, 5);
    }
    return allCountryRates.filter((c) => c.countryCode === selectedCountry);
  }, [selectedCountry, allCountryRates]);

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
  );
};

export default CancerRateCard;
