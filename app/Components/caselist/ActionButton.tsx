import React from 'react';

const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
}> = ({ icon, label }) => (
  <button className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors border border-gray-200">
    {icon}
    <span>{label}</span>
  </button>
);

export default ActionButton;
