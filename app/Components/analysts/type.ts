export interface CaseActivity {
  id: string;
  patient: string;
  caseNumber: string;
  cancerType: string;
  stage: string;
  age: string;
  date: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  status: 'Available' | 'Absent';
}

export interface CountryRate {
  country: string;
  countryCode: string;
  rate: number;
  trend: number;
}

export interface ChartData {
  month: string;
  value: number;
  x: number;
  y: number;
}

export type TabType = 'Total Users' | 'Total Projects' | 'Operating Status';
