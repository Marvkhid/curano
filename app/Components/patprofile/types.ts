export interface Patient {
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
