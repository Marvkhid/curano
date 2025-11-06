'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type Message = {
  id: number;
  author: string;
  text: string;
  time: string;
};

type SchItem = {
  id: number;
  dateISO: string; // ISO date string e.g. 2025-11-02
  time: string; // "10:00AM"
  title: string;
  room?: string;
};

export default function MeetingsPage(): React.JSX.Element {
  // call / ui state
  const [muted, setMuted] = useState<boolean>(false);
  const [cameraOff, setCameraOff] = useState<boolean>(false);
  const [callActive, setCallActive] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(0); // seconds
  const timerRef = useRef<number | null>(null);

  // messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const pendingReplyRef = useRef<number | null>(null);

  // schedule (persisted)
  const [schedule, setSchedule] = useState<SchItem[]>([]);

  // Load from memory on mount (no localStorage)
  useEffect(() => {
    // Initial data can be set here if needed
  }, []);

  // timer
  useEffect(() => {
    if (callActive) {
      timerRef.current = window.setInterval(
        () => setTimer((t) => t + 1),
        1000
      ) as unknown as number;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [callActive]);

  // calendar state
  const today = new Date();
  const [calendarDate, setCalendarDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDateISO, setSelectedDateISO] = useState<string>(() => isoDate(today));
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  // modal for create meeting
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [newMeeting, setNewMeeting] = useState<{ title: string; time: string; dateISO: string }>({
    title: '',
    time: '10:00AM',
    dateISO: selectedDateISO,
  });

  /* ---------- helpers ---------- */
  function isoDate(d: Date): string {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10);
  }

  function formatDuration(totalSeconds: number): string {
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const ss = String(totalSeconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  }

  function formatTime(d: Date): string {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  /* ---------- messages ---------- */
  function sendMessage(): void {
    const text = messageText.trim();
    if (!text) return;
    const m: Message = {
      id: Date.now(),
      author: 'You',
      text,
      time: formatTime(new Date()),
    };
    setMessages((s) => [...s, m]);
    setMessageText('');

    scheduleFakeReply(text);
  }

  // reply logic: smarter than always "Okay"
  function scheduleFakeReply(userText: string): void {
    // cancel any pending reply to avoid stacking multiples too quickly
    if (pendingReplyRef.current) {
      clearTimeout(pendingReplyRef.current);
      pendingReplyRef.current = null;
    }

    // decide reply content
    const lower = userText.toLowerCase();
    let reply = 'Okay.';
    if (lower.includes('?')) {
      reply = "Great question — I'll check and get back to you with details.";
    } else if (/\b(issue|problem|error|help)\b/.test(lower)) {
      reply = 'I see — can you share a screenshot or more context?';
    } else if (/\b(yes|sure|ok|thanks|thank)\b/.test(lower)) {
      reply = 'Got it — thanks!';
    } else if (userText.length < 8) {
      const variants = ['Noted 👍', 'On it.', 'Thanks for that.', 'Nice.'];
      reply = variants[Math.floor(Math.random() * variants.length)];
    } else {
      const variants = [
        "Sounds good — I'll action that.",
        "Understood. I'll follow up shortly.",
        "Thanks — I'll confirm the details.",
      ];
      reply = variants[Math.floor(Math.random() * variants.length)];
    }

    // small simulated typing delay
    setIsTyping(true);
    pendingReplyRef.current = window.setTimeout(() => {
      setIsTyping(false);
      const m: Message = {
        id: Date.now() + 1,
        author: 'Dr Lovina',
        text: reply,
        time: formatTime(new Date()),
      };
      setMessages((s) => [...s, m]);
      pendingReplyRef.current = null;
    }, 900 + Math.min(1500, userText.length * 30)) as unknown as number;
  }

  /* ---------- create meeting modal actions ---------- */
  function openCreateModal(preselectedDateISO?: string): void {
    setNewMeeting((s) => ({ ...s, dateISO: preselectedDateISO || selectedDateISO }));
    setCreateModalOpen(true);
  }

  function createMeeting(): void {
    const title = newMeeting.title.trim() || 'New Meeting';
    const sch: SchItem = {
      id: Date.now(),
      dateISO: newMeeting.dateISO,
      time: newMeeting.time,
      title,
      room: 'Room ' + (Math.random() > 0.5 ? 'A' : 'B'),
    };
    setSchedule((s) =>
      [...s, sch].sort((a, b) => a.dateISO.localeCompare(b.dateISO) || a.time.localeCompare(b.time))
    );
    setCreateModalOpen(false);
    setNewMeeting({ title: '', time: '10:00AM', dateISO: selectedDateISO });
  }

  function deleteMeeting(id: number): void {
    setSchedule((s) => s.filter((it) => it.id !== id));
  }

  /* ---------- hangup ---------- */
  function hangup(): void {
    setCallActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  /* ---------- calendar nav ---------- */
  function prevMonth(): void {
    setCalendarDate((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  }
  function nextMonth(): void {
    setCalendarDate((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  }

  /* ---------- small UI components build-in (typed) ---------- */
  function ControlButtonComp(props: {
    children: React.ReactNode;
    onClick: () => void;
    active?: boolean;
    label?: string;
  }) {
    const { children, onClick, active, label } = props;
    return (
      <button
        onClick={onClick}
        title={label}
        className={`rounded-md px-2 py-1 bg-white/90 hover:bg-white text-sm shadow transform transition-all ${
          active ? 'ring-2 ring-green-400 scale-105' : ''
        }`}
        type="button"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5">{children}</div>
        </div>
      </button>
    );
  }

  function IconButton(props: { children: React.ReactNode; onClick?: () => void }) {
    const { children, onClick } = props;
    return (
      <button
        onClick={onClick}
        type="button"
        className="px-2 py-1 border rounded-md text-sm text-gray-700 hover:shadow-sm transition"
      >
        {children}
      </button>
    );
  }

  /* ---------- render ---------- */
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main area: Video + chat */}
        <section className="col-span-8 bg-white rounded-2xl shadow p-3 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-2 pb-3">
            <h2 className="text-lg font-semibold">Meetings</h2>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">Connected</div>
              <button
                onClick={() => setNotificationsOpen((s) => !s)}
                type="button"
                className="px-3 py-1 rounded-md border bg-white text-sm"
              >
                {notificationsOpen ? 'Hide' : 'Notifications'}
              </button>
            </div>
          </header>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Video area */}
            <div className="md:col-span-2 rounded-lg overflow-hidden bg-gray-900 flex flex-col">
              <div className="relative flex-1 bg-black">
                {/* simulated video / image */}
                {!cameraOff ? (
                  <Image
                    src="/stefan.png"
                    alt="participant"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full block"
                    style={{ maxHeight: 460 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-xl">
                    Camera Off
                  </div>
                )}

                {/* name badge + timer */}
                <div className="absolute left-4 bottom-4 bg-white/95 rounded-xl px-3 py-2 flex items-center gap-3 shadow transform transition-all">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/nathan.png"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Dr Mash Lorem</div>
                    <div className="text-xs text-gray-600">Surgeon, breast cancer</div>
                  </div>
                  <div className="ml-4 text-sm text-red-600 font-mono">{formatDuration(timer)}</div>
                </div>

                {/* controls overlay */}
                <div className="absolute right-4 top-4 flex items-center gap-2">
                  <ControlButtonComp
                    onClick={() => setMuted((m) => !m)}
                    active={muted}
                    label={muted ? 'Unmute' : 'Mute'}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M9 9v6h4l5 5V4l-5 5H9z" />
                    </svg>
                  </ControlButtonComp>

                  <ControlButtonComp
                    onClick={() => setCameraOff((c) => !c)}
                    active={!cameraOff}
                    label={cameraOff ? 'Turn on' : 'Camera'}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="7" width="15" height="10" rx="2" ry="2" />
                      <path d="M21 7v10" />
                    </svg>
                  </ControlButtonComp>

                  <button
                    onClick={hangup}
                    type="button"
                    className="bg-red-600 text-white px-3 py-2 rounded-full shadow hover:scale-105 transition"
                    title="Hang up"
                  >
                    Hang up
                  </button>
                </div>
              </div>

              {/* lower player controls */}
              <div className="border-t px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-700">Mic</div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      defaultValue={muted ? 0 : 70}
                      className="w-36"
                      onChange={() => {}}
                      aria-label="microphone volume"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <IconButton onClick={() => alert('Toggle recording (demo)')}>Rec</IconButton>
                    <IconButton onClick={() => alert('Toggle screen share (demo)')}>
                      Share
                    </IconButton>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  Meeting ID: <span className="font-mono">#16:56</span>
                </div>
              </div>
            </div>

            {/* Chat area */}
            <div className="md:col-span-1 flex flex-col bg-white rounded-lg shadow">
              <div className="px-4 py-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src="/nathan.png"
                      alt="avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">Dr Lovina</div>
                    <div className="text-xs text-green-500">Online</div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{formatTime(new Date())}</div>
              </div>

              <div className="flex-1 p-3 overflow-auto" style={{ minHeight: 200 }}>
                <div className="space-y-3">
                  {messages.length === 0 && (
                    <div className="text-sm text-gray-400">No messages yet — say hello 👋</div>
                  )}
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.author === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`${
                          m.author === 'You'
                            ? 'bg-green-50 text-gray-900'
                            : 'bg-gray-100 text-gray-900'
                        } px-3 py-2 rounded-lg max-w-[80%] shadow-sm`}
                      >
                        <div className="text-xs text-gray-500">
                          {m.author} • {m.time}
                        </div>
                        <div className="mt-1 whitespace-pre-wrap">{m.text}</div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-3 py-2 rounded-lg flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-500 animate-pulse" />
                        <div className="h-2 w-2 rounded-full bg-gray-500 animate-pulse" />
                        <div className="h-2 w-2 rounded-full bg-gray-500 animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-3 py-2 border-t flex items-center gap-2">
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-md px-3 py-2 text-sm"
                  aria-label="Chat message"
                />
                <button
                  onClick={() => sendMessage()}
                  type="button"
                  className="px-3 py-2 bg-green-600 text-white rounded-md hover:shadow-md transition"
                  title="Send message"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Right sidebar: Notifications and schedule */}
        <aside className="col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Notifications</h3>
              <button
                className="text-sm text-gray-500"
                onClick={() => setNotificationsOpen((s) => !s)}
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
                <div
                  key={s.id}
                  className="flex items-center justify-between border rounded-md px-3 py-2"
                >
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

          <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-500">Calendar</div>
              <div className="text-xs text-gray-400">
                {calendarDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
              </div>
            </div>

            {/* Calendar controls */}
            <div className="flex items-center justify-between mb-2 gap-2">
              <button
                onClick={prevMonth}
                type="button"
                className="px-2 py-1 rounded border text-sm"
              >
                ◀
              </button>
              <div className="flex-1 grid grid-cols-7 gap-1 text-[12px] text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={`${d}-${i}`} className="text-xs text-gray-400">
                    {d}
                  </div>
                ))}
              </div>
              <button
                onClick={nextMonth}
                type="button"
                className="px-2 py-1 rounded border text-sm"
              >
                ▶
              </button>
            </div>

            {/* calendar grid */}
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
        </aside>
      </div>

      {/* Create Meeting Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg w-full max-w-md p-5 shadow-lg transform transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Create Meeting</h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                type="button"
                className="text-gray-500"
              >
                ✖
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs text-gray-600">Title</label>
              <input
                value={newMeeting.title}
                onChange={(e) => setNewMeeting((s) => ({ ...s, title: e.target.value }))}
                placeholder="Meeting title"
                className="border px-3 py-2 rounded"
              />

              <label className="text-xs text-gray-600">Date</label>
              <input
                type="date"
                value={newMeeting.dateISO}
                onChange={(e) => setNewMeeting((s) => ({ ...s, dateISO: e.target.value }))}
                className="border px-3 py-2 rounded"
              />

              <label className="text-xs text-gray-600">Time</label>
              <input
                value={newMeeting.time}
                onChange={(e) => setNewMeeting((s) => ({ ...s, time: e.target.value }))}
                placeholder="e.g. 10:00AM"
                className="border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setCreateModalOpen(false)}
                  type="button"
                  className="px-3 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  onClick={createMeeting}
                  type="button"
                  className="px-3 py-2 rounded bg-green-600 text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Utilities outside component ---------- */

function formatReadableDate(iso: string): string {
  try {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return iso;
  }
}

function renderCalendar(
  calendarDate: Date
): { date: Date | null; day: number | null; iso: string; isCurrentMonth: boolean }[] {
  // Returns an array of 42 cells (6 weeks) each { date: Date | null, day:number|null, iso, isCurrentMonth }
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay(); // 0-6
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevDays = new Date(year, month, 0).getDate(); // days in previous month
  const cells: { date: Date | null; day: number | null; iso: string; isCurrentMonth: boolean }[] =
    [];

  // 6 weeks * 7 = 42 cells
  for (let i = 0; i < 42; i++) {
    const idx = i - firstWeekday + 1;
    if (idx <= 0) {
      // prev month days
      const day = prevDays + idx;
      const d = new Date(year, month - 1, day);
      cells.push({ date: d, day, iso: d.toISOString().slice(0, 10), isCurrentMonth: false });
    } else if (idx > daysInMonth) {
      // next month
      const day = idx - daysInMonth;
      const d = new Date(year, month + 1, day);
      cells.push({ date: d, day, iso: d.toISOString().slice(0, 10), isCurrentMonth: false });
    } else {
      // current month
      const day = idx;
      const d = new Date(year, month, day);
      cells.push({ date: d, day, iso: d.toISOString().slice(0, 10), isCurrentMonth: true });
    }
  }
  return cells;
}
