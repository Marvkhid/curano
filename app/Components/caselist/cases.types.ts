export interface CaseData {
  id: string;
  patient: string;
  caseNumber: string;
  cancerType: string;
  stage: string;
  age: number;
  date: string;
}

export interface DataFieldProps {
  label: string;
  value: string;
  highlight?: 'red' | 'orange';
}

export interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}
