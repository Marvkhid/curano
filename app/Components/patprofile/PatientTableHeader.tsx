'use client';

import React from 'react';

export default function PatientTableHeader() {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
      <div className="col-span-2">NAME</div>
      <div className="col-span-1">GENDER</div>
      <div className="col-span-1">AGE</div>
      <div className="col-span-2">DIAGNOSIS</div>
      <div className="col-span-2">STATUS</div>
      <div className="col-span-1">BLOOD</div>
      <div className="col-span-2">LAST VISIT</div>
      <div className="col-span-1"></div>
    </div>
  );
}
