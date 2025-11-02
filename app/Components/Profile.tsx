'use client';

import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface Patient {
  id: number;
  name: string;
  email: string;
  gender: string;
  age: string;
  diagnosis: string;
  status: 'Urgent' | 'Emergency' | 'Past Patient' | 'Treated';
  blood: string;
  lastVisit: string;
  contactNumber: string;
  dateOfBirth: string;
  memberSince: string;
  address: string;
  class: string;
  diagnosisCode: string;
  stage: string;
  erStatus: string;
  reports: {
    drugPrescription: boolean;
    clinicalData: boolean;
    suggestedTreatment: boolean;
  };
}

const PatientProfile = () => {
  const [expandedId, setExpandedId] = useState<number | null>(4);
  const [searchQuery, setSearchQuery] = useState('');

  const patients: Patient[] = [
    {
      id: 1,
      name: 'Joshua White',
      email: 'joshuaWK@gmail.com',
      gender: 'Male',
      age: '59yo',
      diagnosis: 'Prostate',
      status: 'Urgent',
      blood: '0+',
      lastVisit: '12-05-2025',
      contactNumber: '(201) 555-0124',
      dateOfBirth: '1 Jan, 1985',
      memberSince: '3 March, 2023',
      address: 'St Louis, NY',
      class: 'Class',
      diagnosisCode: 'ICD34',
      stage: 'IIA',
      erStatus: 'Positive',
      reports: {
        drugPrescription: true,
        clinicalData: true,
        suggestedTreatment: true,
      },
    },
    {
      id: 2,
      name: 'Joshua White',
      email: 'joshuaWK@gmail.com',
      gender: 'Male',
      age: '59yo',
      diagnosis: 'Prostate',
      status: 'Emergency',
      blood: '0+',
      lastVisit: '12-05-2025',
      contactNumber: '(201) 555-0124',
      dateOfBirth: '1 Jan, 1985',
      memberSince: '3 March, 2023',
      address: 'St Louis, NY',
      class: 'Class',
      diagnosisCode: 'ICD34',
      stage: 'IIA',
      erStatus: 'Positive',
      reports: {
        drugPrescription: false,
        clinicalData: false,
        suggestedTreatment: false,
      },
    },
    {
      id: 3,
      name: 'Joshua White',
      email: 'joshuaWK@gmail.com',
      gender: 'Male',
      age: '59yo',
      diagnosis: 'Prostate',
      status: 'Past Patient',
      blood: '0+',
      lastVisit: '12-05-2025',
      contactNumber: '(201) 555-0124',
      dateOfBirth: '1 Jan, 1985',
      memberSince: '3 March, 2023',
      address: 'St Louis, NY',
      class: 'Class',
      diagnosisCode: 'ICD34',
      stage: 'IIA',
      erStatus: 'Positive',
      reports: {
        drugPrescription: false,
        clinicalData: false,
        suggestedTreatment: false,
      },
    },
    {
      id: 4,
      name: 'Joshua White',
      email: 'joshuaWK@gmail.com',
      gender: 'Male',
      age: '59yo',
      diagnosis: 'Prostate',
      status: 'Treated',
      blood: '0+',
      lastVisit: '12-05-2025',
      contactNumber: '(201) 555-0124',
      dateOfBirth: '1 Jan, 1985',
      memberSince: '3 March, 2023',
      address: 'St Louis, NY',
      class: 'Class',
      diagnosisCode: 'ICD34',
      stage: 'IIA',
      erStatus: 'Positive',
      reports: {
        drugPrescription: true,
        clinicalData: true,
        suggestedTreatment: true,
      },
    },
    {
      id: 5,
      name: 'Joshua White',
      email: 'joshuaWK@gmail.com',
      gender: 'Male',
      age: '59yo',
      diagnosis: 'Prostate',
      status: 'Urgent',
      blood: '0+',
      lastVisit: '12-05-2025',
      contactNumber: '(201) 555-0124',
      dateOfBirth: '1 Jan, 1985',
      memberSince: '3 March, 2023',
      address: 'St Louis, NY',
      class: 'Class',
      diagnosisCode: 'ICD34',
      stage: 'IIA',
      erStatus: 'Positive',
      reports: {
        drugPrescription: false,
        clinicalData: false,
        suggestedTreatment: false,
      },
    },
    {
      id: 6,
      name: 'Joshua White',
      email: 'joshuaWK@gmail.com',
      gender: 'Male',
      age: '59yo',
      diagnosis: 'Prostate',
      status: 'Treated',
      blood: '0+',
      lastVisit: '12-05-2025',
      contactNumber: '(201) 555-0124',
      dateOfBirth: '1 Jan, 1985',
      memberSince: '3 March, 2023',
      address: 'St Louis, NY',
      class: 'Class',
      diagnosisCode: 'ICD34',
      stage: 'IIA',
      erStatus: 'Positive',
      reports: {
        drugPrescription: false,
        clinicalData: false,
        suggestedTreatment: false,
      },
    },
    {
      id: 7,
      name: 'Joshua White',
      email: 'joshuaWK@gmail.com',
      gender: 'Male',
      age: '59yo',
      diagnosis: 'Prostate',
      status: 'Past Patient',
      blood: '0+',
      lastVisit: '12-05-2025',
      contactNumber: '(201) 555-0124',
      dateOfBirth: '1 Jan, 1985',
      memberSince: '3 March, 2023',
      address: 'St Louis, NY',
      class: 'Class',
      diagnosisCode: 'ICD34',
      stage: 'IIA',
      erStatus: 'Positive',
      reports: {
        drugPrescription: false,
        clinicalData: false,
        suggestedTreatment: false,
      },
    },
    {
      id: 8,
      name: 'Joshua White',
      email: 'joshuaWK@gmail.com',
      gender: 'Male',
      age: '59yo',
      diagnosis: 'Prostate',
      status: 'Urgent',
      blood: '0+',
      lastVisit: '12-05-2025',
      contactNumber: '(201) 555-0124',
      dateOfBirth: '1 Jan, 1985',
      memberSince: '3 March, 2023',
      address: 'St Louis, NY',
      class: 'Class',
      diagnosisCode: 'ICD34',
      stage: 'IIA',
      erStatus: 'Positive',
      reports: {
        drugPrescription: false,
        clinicalData: false,
        suggestedTreatment: false,
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Urgent':
        return 'bg-[#FEF3C7] text-[#92400E]';
      case 'Emergency':
        return 'bg-[#FEE2E2] text-[#991B1B]';
      case 'Past Patient':
        return 'bg-[#E5E7EB] text-[#374151]';
      case 'Treated':
        return 'bg-[#D1FAE5] text-[#065F46]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Patient profile</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by case id"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>

          {/* Table Header */}
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

          {/* Patient Rows */}
          <div className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <div key={patient.id}>
                {/* Main Row */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center">
                  <div className="col-span-2 flex items-center gap-3">
                    <Image
                      src="/nathan.png"
                      alt={patient.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                  </div>
                  <div className="col-span-1 text-sm text-gray-600">{patient.gender}</div>
                  <div className="col-span-1 text-sm text-gray-600">{patient.age}</div>
                  <div className="col-span-2 text-sm text-gray-600">{patient.diagnosis}</div>
                  <div className="col-span-2">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </div>
                  <div className="col-span-1 text-sm text-gray-600">{patient.blood}</div>
                  <div className="col-span-2 text-sm text-gray-600">{patient.lastVisit}</div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => toggleExpand(patient.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {expandedId === patient.id ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === patient.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex gap-8">
                      {/* Personal Information */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <h3 className="text-sm font-semibold text-gray-700 uppercase">
                            Personal Information
                          </h3>
                          <span className="inline-flex px-2 py-1 rounded-md text-xs font-medium bg-[#D1FAE5] text-[#065F46]">
                            Active
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/nathan.png"
                              alt={patient.name}
                              width={40}
                              height={40}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {patient.name}
                              </div>
                              <div className="text-xs text-gray-500">{patient.email}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <div className="text-gray-500">Contact Number</div>
                              <div className="text-gray-900 font-medium">
                                {patient.contactNumber}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-500">Gender</div>
                              <div className="text-gray-900 font-medium">{patient.gender}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Date of Birth</div>
                              <div className="text-gray-900 font-medium">{patient.dateOfBirth}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Member Since</div>
                              <div className="text-gray-900 font-medium">{patient.memberSince}</div>
                            </div>
                            <div className="col-span-2">
                              <div className="text-gray-500">Address</div>
                              <div className="text-gray-900 font-medium">{patient.address}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase mb-4">
                          Description
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Class</span>
                            <span className="text-gray-900 font-medium">{patient.class}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Diagnosis</span>
                            <span className="text-gray-900 font-medium">
                              {patient.diagnosisCode}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500"></span>
                            <span className="text-gray-900 font-medium">Prostate</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Stage</span>
                            <span className="text-gray-900 font-medium">{patient.stage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">ER status</span>
                            <span className="text-gray-900 font-medium">{patient.erStatus}</span>
                          </div>
                        </div>
                      </div>

                      {/* Reports */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-gray-700 uppercase">Reports</h3>
                          <div className="flex gap-2">
                            <button className="text-xs text-gray-600 hover:text-gray-900">
                              copy
                            </button>
                            <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-200">
                            <span className="text-sm text-gray-700">Drug prescription</span>
                          </div>
                          <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-200">
                            <span className="text-sm text-gray-700">Clinical data</span>
                          </div>
                          <div className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-200">
                            <span className="text-sm text-gray-700">Suggested treatment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
