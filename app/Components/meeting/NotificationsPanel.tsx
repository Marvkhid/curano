'use client';

import React from 'react';

interface NotificationsPanelProps {
  notificationsOpen: boolean;
  setNotificationsOpen: (val: boolean) => void;
}

export default function NotificationsPanel({
  notificationsOpen,
  setNotificationsOpen,
}: NotificationsPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Notifications</h3>
        <button
          className="text-sm text-gray-500"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          type="button"
        >
          {notificationsOpen ? 'Close' : 'Open'}
        </button>
      </div>

      {notificationsOpen ? (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">
            Appointment with Dr Marcus and team — 35 minutes ago
          </div>
          <div className="text-sm text-gray-600">
            Appointment with Dr Marcus and team — 2 hours ago
          </div>
          <div className="text-sm text-gray-600">New message from Dr Lovina</div>
        </div>
      ) : (
        <div className="text-sm text-gray-400">No new notifications (click to open)</div>
      )}
    </div>
  );
}
