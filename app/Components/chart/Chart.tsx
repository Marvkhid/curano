"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Download, Share2, User, ChevronDown } from "lucide-react";

// Chart data
const data = [
  { month: "Jan", newPatients: 10, oldPatients: 120 },
  { month: "Feb", newPatients: 60, oldPatients: 200 },
  { month: "Mar", newPatients: 140, oldPatients: 300 },
  { month: "Apr", newPatients: 230, oldPatients: 250 },
  { month: "May", newPatients: 220, oldPatients: 180 },
  { month: "Jun", newPatients: 180, oldPatients: 100 },
  { month: "Jul", newPatients: 200, oldPatients: 150 },
  { month: "Aug", newPatients: 150, oldPatients: 180 },
  { month: "Sep", newPatients: 170, oldPatients: 200 },
  { month: "Oct", newPatients: 260, oldPatients: 150 },
  { month: "Nov", newPatients: 340, oldPatients: 80 },
  { month: "Dec", newPatients: 400, oldPatients: 10 },
];

interface CaseLog {
  id: number;
  patient: string;
  caseId: string;
  cancerType: string;
  stage: string;
  age: number;
  date: string;
}

interface Contributor {
  id: number;
  name: string;
  role: string;
  status: "Available" | "Absent";
  image: string;
}

export default function CaseDashboard() {
  const [caseLogs] = useState<CaseLog[]>([
    { id: 1, patient: "Joshua White", caseId: "#1234", cancerType: "Breast", stage: "IIA", age: 54, date: "21/05/2025" },
    { id: 2, patient: "Joshua White", caseId: "#1235", cancerType: "Cervical", stage: "IIA", age: 54, date: "21/05/2025" },
    { id: 3, patient: "Joshua White", caseId: "#1236", cancerType: "Prostate", stage: "IIA", age: 54, date: "21/05/2025" },
    { id: 4, patient: "Joshua White", caseId: "#1237", cancerType: "Breast", stage: "IIA", age: 54, date: "21/05/2025" },
    { id: 5, patient: "Joshua White", caseId: "#1238", cancerType: "Breast", stage: "IIA", age: 54, date: "21/05/2025" },
    { id: 6, patient: "Joshua White", caseId: "#1239", cancerType: "Breast", stage: "IIA", age: 54, date: "21/05/2025" },
    { id: 7, patient: "Joshua White", caseId: "#1240", cancerType: "Breast", stage: "IIA", age: 54, date: "21/05/2025" },
  ]);

  const [contributors] = useState<Contributor[]>([
    { id: 1, name: "Dr. Marcus Oris", role: "Medical Oncologist", status: "Available", image: "/marcus.png" },
    { id: 2, name: "Dr. Clara James", role: "Surgical Oncologist", status: "Available", image: "/marcus.png" },
    { id: 3, name: "Dr. David Hunt", role: "Radiation Oncologist", status: "Available", image: "/marcus.png" },
    { id: 4, name: "Dr. Grace Peters", role: "Hematologist", status: "Absent", image: "/marcus.png" },
    { id: 5, name: "Dr. Aden Marvel", role: "Optician", status: "Absent", image: "/marcus.png" },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profile & Diagnosis FLEXED together */}
        <div className="bg-white rounded-lg p-4 shadow-md flex flex-col gap-3 relative">
          {/* ✅ HEADER */}
          <div className="flex items-center gap-10 mb-2 text-sm text-gray-700">
            <h1 className="font-semibold text-base">New report</h1>

            <div className="flex items-center gap-1 text-gray-500">
              <span>Patient</span>
              <User size={14} />
            </div>

            <div className="flex items-center gap-1 text-gray-800 font-medium">
              Jennifer Willhite
              <ChevronDown size={14} />
            </div>
          </div>

          <div className="flex gap-4">
            {/* LEFT CARD */}
            <div className="flex flex-col items-start w-1/3 bg-white rounded-md shadow p-3">
              <Image
                src="/andrea.png"
                alt="Patient"
                width={46}
                height={46}
                className="rounded-full object-cover"
              />
              <h2 className="mt-2 text-base font-semibold">Jennifer Willhite</h2>
              <p className="text-xs text-gray-500">Jennifer234@gmail.com</p>

              <div className="mt-3 text-xs space-y-1 text-gray-700 text-left w-full">
                <p><strong>Age:</strong></p>
                <p><strong>Diagnosis:</strong></p>
                <p><strong>Next of Kin:</strong></p>
                <p><strong>Address:</strong></p>
              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div className="flex flex-col w-2/3 relative">
              <h3 className="font-semibold mb-1 text-gray-800 text-sm">Diagnosis:</h3>
              <p className="text-xs text-gray-600 leading-snug">
                Lorem ipsum dolor sit amet, consectetur voluptate
              </p>
              <p className="text-xs text-gray-600 mb-2">
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupida.
              </p>

              <div className="flex gap-6 mb-2">
                <div>
                  <p className="text-[10px] text-gray-500">Contractions</p>
                  <p className="font-bold text-base">8/h</p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500">Cancer growth</p>
                  <p className="font-bold text-base">26%</p>
                </div>
              </div>

              <Image
                src="/red-cancer.png"
                alt="Cancer Cell"
                width={220}
                height={220}
                className="absolute right-1 top-10 opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Tumor Board Activity Chart */}
        <div className="bg-white rounded-lg p-4 shadow-md flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-base">Tumor Board Activity Trends</h3>
            <div className="flex gap-3 text-xs items-center">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span> New
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span> Old
              </span>
            </div>
          </div>

          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="newPatients"
                  stroke="#0f766e"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="oldPatients"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main FLEX CONTAINER */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* LEFT SECTION (70%) */}
        <div className="w-full lg:w-[70%] bg-white rounded-2xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Latest case activity log</h3>

            <div className="w-56">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by case id"
                  className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </div>
            </div>
          </div>

          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-gray-500 font-normal text-sm">Patient</th>
                  <th className="py-3 px-4 text-gray-500 font-normal text-sm">Case</th>
                  <th className="py-3 px-4 text-gray-500 font-normal text-sm">Cancer type</th>
                  <th className="py-3 px-4 text-gray-500 font-normal text-sm">Stage</th>
                  <th className="py-3 px-4 text-gray-500 font-normal text-sm">Age</th>
                  <th className="py-3 px-4 text-gray-500 font-normal text-sm">Date</th>
                  <th className="py-3 px-4 text-gray-500 font-normal text-sm text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {caseLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 px-4 text-gray-700">{log.patient}</td>
                    <td className="py-3 px-4 text-gray-600">{log.caseId}</td>
                    <td className="py-3 px-4 text-gray-600">{log.cancerType}</td>
                    <td className="py-3 px-4 text-gray-600">{log.stage}</td>
                    <td className="py-3 px-4 text-gray-600">{log.age}</td>
                    <td className="py-3 px-4 text-gray-600">{log.date}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-3 text-gray-500">
                        <Download className="w-4 h-4 hover:text-blue-600 cursor-pointer" />
                        <Share2 className="w-4 h-4 hover:text-blue-600 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD VIEW */}
          <div className=" md:hidden flex flex-col gap-3">
            {caseLogs.map((log) => (
              <div key={log.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition p-3">
                <div className="flex justify-between items-start">
                  <div className="text-sm text-gray-700">
                    <div className="font-medium text-gray-800">{log.patient}</div>
                    <div className="text-xs text-gray-500">{log.cancerType} • {log.stage}</div>
                  </div>
                  <div className="text-sm text-gray-600">{log.date}</div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                  <div className="space-x-3">
                    <span className="text-gray-500">Case:</span>
                    <span className="text-blue-500 font-medium">{log.caseId}</span>
                    <span className="ml-2">Age: {log.age}</span>
                  </div>

                  <div className="inline-flex items-center gap-3 text-gray-500">
                    <Download className="w-4 h-4 hover:text-blue-600 cursor-pointer" />
                    <Share2 className="w-4 h-4 hover:text-blue-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION (30%) */}
        <div className="w-full lg:w-[30%] bg-white rounded-2xl shadow-md p-5 pb-12 h-fit">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Top contributors</h4>
          <div className="flex flex-col gap-3">
            {contributors.map((c) => (
              <div key={c.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <Image src={c.image} alt={c.name} width={40} height={40} className="rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      c.status === "Available" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <div className="text-sm text-gray-700">{c.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
