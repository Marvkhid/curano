export type Message = {
  id: number;
  author: string;
  text: string;
  time: string;
};

export type SchItem = {
  id: number;
  dateISO: string;
  time: string;
  title: string;
  room?: string;
};

export type CalendarCell = {
  date: Date | null;
  day: number | null;
  iso: string;
  isCurrentMonth: boolean;
};
