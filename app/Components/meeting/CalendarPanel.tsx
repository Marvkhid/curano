'use client';

import React from 'react';
import { renderCalendar } from './utils';

interface CalendarPanelProps {
  calendarDate: Date;
  selectedDateISO: string;
  setSelectedDateISO: (val: string) => void;
  setNewMeeting: React.Dispatch<
    React.SetStateAction<{ title: string; time: string; dateISO: string }>
  >;
  prevMonth: () => void;
  nextMonth: () => void;
}

export default function CalendarPanel({
  calendarDate,
  selectedDateISO,
  setSelectedDateISO,
  setNewMeeting,
  prevMonth,
  nextMonth,
}: CalendarPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-gray-500">Calendar</div>
        <div className="text-xs text-gray-400">
          {calendarDate.toLocaleString(undefined, {
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>

      {/* Calendar controls */}
      <div className="flex items-center justify-between mb-2 gap-2">
        <button onClick={prevMonth} type="button" className="px-2 py-1 rounded border text-sm">
          ◀
        </button>

        <div className="flex-1 grid grid-cols-7 gap-1 text-[12px] text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={`${d}-${i}`} className="text-xs text-gray-400">
              {d}
            </div>
          ))}
        </div>

        <button onClick={nextMonth} type="button" className="px-2 py-1 rounded border text-sm">
          ▶
        </button>
      </div>

      {/* Calendar grid */}
      <div className="mt-2 grid grid-cols-7 gap-1 text-[12px]">
        {renderCalendar(calendarDate).map((cell) => (
          <button
            key={cell.iso}
            onClick={() => {
              if (cell.date) {
                setSelectedDateISO(cell.iso);
                setNewMeeting((s) => ({ ...s, dateISO: cell.iso }));
              }
            }}
            type="button"
            className={`p-2 rounded text-center transition ${
              cell.isCurrentMonth ? '' : 'opacity-50'
            } ${cell.iso === selectedDateISO ? 'bg-green-50 ring-1 ring-green-200' : ''}`}
          >
            {cell.day}
          </button>
        ))}
      </div>
    </div>
  );
}
