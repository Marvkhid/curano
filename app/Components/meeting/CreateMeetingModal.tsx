'use client';

import React from 'react';

interface CreateMeetingModalProps {
  createModalOpen: boolean;
  setCreateModalOpen: (val: boolean) => void;
  newMeeting: { title: string; time: string; dateISO: string };
  setNewMeeting: React.Dispatch<
    React.SetStateAction<{ title: string; time: string; dateISO: string }>
  >;
  createMeeting: () => void;
}

export default function CreateMeetingModal({
  createModalOpen,
  setCreateModalOpen,
  newMeeting,
  setNewMeeting,
  createMeeting,
}: CreateMeetingModalProps) {
  if (!createModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Create Meeting</h3>
          <button
            onClick={() => setCreateModalOpen(false)}
            type="button"
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Close modal"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">Title</label>
            <input
              value={newMeeting.title}
              onChange={(e) => setNewMeeting((s) => ({ ...s, title: e.target.value }))}
              placeholder="Meeting title"
              className="border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">Date</label>
            <input
              type="date"
              value={newMeeting.dateISO}
              onChange={(e) => setNewMeeting((s) => ({ ...s, dateISO: e.target.value }))}
              className="border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-600 mb-1">Time</label>
            <input
              value={newMeeting.time}
              onChange={(e) => setNewMeeting((s) => ({ ...s, time: e.target.value }))}
              placeholder="e.g. 10:00AM"
              className="border px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-green-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setCreateModalOpen(false)}
              type="button"
              className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={createMeeting}
              type="button"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}