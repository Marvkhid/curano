import React from 'react';

const DataField: React.FC<{
  label: string;
  value: string;
  highlight?: 'red' | 'orange';
}> = ({ label, value, highlight }) => (
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

export default DataField;
