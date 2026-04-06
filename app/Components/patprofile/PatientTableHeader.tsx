'use client';

import React from 'react';

const COLUMNS = [
  { label: 'Name',       span: 2 },
  { label: 'Gender',     span: 1 },
  { label: 'Age',        span: 1 },
  { label: 'Diagnosis',  span: 2 },
  { label: 'Status',     span: 2 },
  { label: 'Blood',      span: 1 },
  { label: 'Last Visit', span: 2 },
  { label: '',           span: 1 },
];

export default function PatientTableHeader() {
  return (
    <thead>
      <tr className="bg-gray-50 border-b border-gray-200">
        {COLUMNS.map((col, i) => (
          <th
            key={`${col.label}-${i}`}
            scope="col"
            className="
              px-4 lg:px-6 py-3
              text-left text-[10px] lg:text-xs
              font-medium text-gray-500
              uppercase tracking-wider
              whitespace-nowrap
            "
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}