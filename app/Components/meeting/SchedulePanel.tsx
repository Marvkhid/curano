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
    <div className="bg-white rounded-2xl shadow p-4 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Upcoming schedule</h3>
        <div className="flex items-center gap-2">
          <button
            className="text-sm text-green-600"
            onClick={() => openCreateModal()}
            type="button"
          >
            Create
          </button>
          <button
            className="text-sm text-gray-500"
            onClick={() => {
              setSchedule((s) => [
                ...s,
                {
                  id: Date.now(),
                  dateISO: selectedDateISO,
                  time: '4:00PM',
                  title: 'New Meeting',
                  room: 'Room A',
                },
              ]);
            }}
            type="button"
          >
            Quick add
          </button>
        </div>
      </div>

      <div className="space-y-3 overflow-auto">
        {schedule.length === 0 && (
          <div className="text-sm text-gray-400">No scheduled meetings</div>
        )}
        {schedule.map((s) => (
          <div key={s.id} className="flex items-center justify-between border rounded-md px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-10 rounded bg-blue-400" />
              <div>
                <div className="text-sm font-medium">{s.title}</div>
                <div className="text-xs text-gray-500">
                  {formatReadableDate(s.dateISO)} • {s.time}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-400">{s.room || 'Room A'}</div>
              <button
                onClick={() => deleteMeeting(s.id)}
                type="button"
                className="text-red-500 text-sm px-2 py-1 rounded hover:bg-red-50 transition"
                title="Delete meeting"
              >
                ✖
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-3">
        <button
          className="w-full bg-green-600 text-white py-2 rounded-md hover:shadow-md transition"
          onClick={() => openCreateModal(selectedDateISO)}
          type="button"
        >
          Create Meeting
        </button>
      </div>
    </div>
  );
}
