'use client';

import React from 'react';
import { SchItem } from './types';
import { formatReadableDate } from './utils';

interface SchedulePanelProps {
  schedule: SchItem[];
  setSchedule: React.Dispatch<React.SetStateAction<SchItem[]>>;
  selectedDateISO: string;
  openCreateModal: (dateISO?: string) => void;
  deleteMeeting: (id: number) => void;
}

export default function SchedulePanel({
  schedule,
  setSchedule,
  selectedDateISO,
  openCreateModal,
  deleteMeeting,
}: SchedulePanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-3 sm:p-4 flex-1 flex flex-col w-full min-h-0">

      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <h3 className="font-semibold text-sm sm:text-base">Upcoming schedule</h3>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => openCreateModal()}
            className="
              inline-flex items-center justify-center
              min-h-[36px] px-2 sm:px-3
              text-xs sm:text-sm text-green-600
              hover:bg-green-50 rounded-md
              touch-manipulation select-none
              active:scale-95 transition-all duration-150
            "
          >
            + Create
          </button>
          <button
            type="button"
            onClick={() =>
              setSchedule((s) => [
                ...s,
                {
                  id: Date.now(),
                  dateISO: selectedDateISO,
                  time: '4:00PM',
                  title: 'New Meeting',
                  room: 'Room A',
                },
              ])
            }
            className="
              inline-flex items-center justify-center
              min-h-[36px] px-2 sm:px-3
              text-xs sm:text-sm text-gray-500
              hover:bg-gray-100 rounded-md
              touch-manipulation select-none
              active:scale-95 transition-all duration-150
            "
          >
            Quick add
          </button>
        </div>
      </div>

      {/* Schedule list */}
      <div className="flex-1 overflow-y-auto overscroll-contain space-y-2 sm:space-y-3 min-h-0 pr-0.5">
        {schedule.length === 0 ? (
          <p className="text-xs sm:text-sm text-gray-400 py-2">
            No scheduled meetings
          </p>
        ) : (
          <ul className="space-y-2 sm:space-y-3 list-none m-0 p-0">
            {schedule.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between border rounded-md px-2 sm:px-3 py-2 gap-2 hover:bg-gray-50 transition-colors"
              >
                {/* Left: accent + info */}
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-1.5 sm:w-2 h-8 sm:h-10 rounded bg-blue-400 flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate">{s.title}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                      {formatReadableDate(s.dateISO)} • {s.time}
                    </p>
                  </div>
                </div>

                {/* Right: room + delete */}
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <span className="text-[10px] sm:text-xs text-gray-400 hidden xs:inline whitespace-nowrap">
                    {s.room || 'Room A'}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteMeeting(s.id)}
                    aria-label={`Delete meeting: ${s.title}`}
                    title="Delete meeting"
                    className="
                      inline-flex items-center justify-center
                      min-w-[36px] min-h-[36px]
                      text-red-500 text-sm
                      rounded hover:bg-red-50
                      touch-manipulation select-none
                      active:scale-95 transition-all duration-150
                    "
                  >
                    ✖
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer CTA */}
      <div className="mt-3 flex-shrink-0">
        <button
          type="button"
          onClick={() => openCreateModal(selectedDateISO)}
          className="
            w-full
            inline-flex items-center justify-center
            min-h-[44px]
            bg-green-600 hover:bg-green-700
            text-white text-sm sm:text-base font-medium
            py-2 rounded-md
            touch-manipulation select-none
            active:scale-95
            hover:shadow-md transition-all duration-150
          "
        >
          Create Meeting
        </button>
      </div>
    </div>
  );
}