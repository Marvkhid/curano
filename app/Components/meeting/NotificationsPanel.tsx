'use client';

import React from 'react';

interface NotificationsPanelProps {
  notificationsOpen: boolean;
  setNotificationsOpen: (val: boolean) => void;
}

const notifications = [
  { id: 1, text: 'Appointment with Dr Marcus and team', time: '35 minutes ago' },
  { id: 2, text: 'Appointment with Dr Marcus and team', time: '2 hours ago' },
  { id: 3, text: 'New message from Dr Lovina', time: 'Just now' },
];

export default function NotificationsPanel({
  notificationsOpen,
  setNotificationsOpen,
}: NotificationsPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-3 sm:p-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm sm:text-base">Notifications</h3>
          {notifications.length > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-500 text-white text-[10px] sm:text-xs font-medium flex-shrink-0">
              {notifications.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          aria-expanded={notificationsOpen}
          aria-controls="notifications-list"
          className="
            inline-flex items-center justify-center
            min-w-[44px] min-h-[36px]
            px-2 sm:px-3 py-1
            text-xs sm:text-sm text-gray-500
            hover:text-gray-800 hover:bg-gray-100
            rounded-md
            touch-manipulation select-none
            active:scale-95 transition-all duration-150
          "
        >
          {notificationsOpen ? 'Close' : 'Open'}
        </button>
      </div>

      {/* Body */}
      <div
        id="notifications-list"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
      >
        {notificationsOpen ? (
          <ul className="space-y-2 list-none m-0 p-0">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Dot indicator */}
                <span className="mt-1.5 w-2 h-2 rounded-full bg-red-400 flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-700 leading-snug break-words">
                    {n.text}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs sm:text-sm text-gray-400 py-1">
            No new notifications — tap Open to view
          </p>
        )}
      </div>
    </div>
  );
}