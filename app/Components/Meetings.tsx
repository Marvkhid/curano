'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export default function MeetingsPage() {
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [callActive, setCallActive] = useState(true);
  const [timer, setTimer] = useState(0); // seconds
  const [messages, setMessages] = useState(
    () =>
      JSON.parse(localStorage.getItem('meet_messages') || '[]') as {
        id: number;
        author: string;
        text: string;
        time: string;
      }[]
  );
  const [messageText, setMessageText] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [schedule, setSchedule] = useState(() => [
    { id: 1, time: '10:00AM', title: 'Appointment with Dr Mash Lorem' },
    { id: 2, time: '11:00AM', title: 'Follow-up with Dr Lovina' },
    { id: 3, time: '1:00PM', title: 'Team brief' },
  ]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // simple call timer increment
    if (callActive) {
      timerRef.current = window.setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [callActive]);

  useEffect(() => {
    localStorage.setItem('meet_messages', JSON.stringify(messages));
  }, [messages]);

  function sendMessage() {
    if (!messageText.trim()) return;
    const m = {
      id: Date.now(),
      author: 'You',
      text: messageText.trim(),
      time: formatTime(new Date()),
    };
    setMessages((s) => [...s, m]);
    setMessageText('');
  }

  function receiveFakeReply() {
    // simulate a reply after 1s
    setTimeout(() => {
      const m = {
        id: Date.now() + 1,
        author: 'Dr Lovina',
        text: 'Okay',
        time: formatTime(new Date()),
      };
      setMessages((s) => [...s, m]);
    }, 1000);
  }

  function hangup() {
    setCallActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function toggleMute() {
    setMuted((m) => !m);
  }
  function toggleCamera() {
    setCameraOff((c) => !c);
  }

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
                <div className="absolute left-4 bottom-4 bg-white/90 rounded-xl px-3 py-2 flex items-center gap-3 shadow">
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
                  <ControlButton
                    onClick={toggleMute}
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
                  </ControlButton>
                  <ControlButton
                    onClick={toggleCamera}
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
                  </ControlButton>
                  <button
                    onClick={hangup}
                    className="bg-red-600 text-white px-3 py-2 rounded-full shadow"
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
                <div className="text-xs text-gray-400">3:45pm</div>
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
                        } px-3 py-2 rounded-lg max-w-[80%]`}
                      >
                        <div className="text-xs text-gray-500">
                          {m.author} • {m.time}
                        </div>
                        <div className="mt-1 whitespace-pre-wrap">{m.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-3 py-2 border-t flex items-center gap-2">
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                      receiveFakeReply();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-md px-3 py-2 text-sm"
                />
                <button
                  onClick={() => {
                    sendMessage();
                    receiveFakeReply();
                  }}
                  className="px-3 py-2 bg-green-600 text-white rounded-md"
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
              <button
                className="text-sm text-green-600"
                onClick={() =>
                  setSchedule((s) => [
                    ...s,
                    { id: Date.now(), time: '4:00PM', title: 'New Meeting' },
                  ])
                }
              >
                Add
              </button>
            </div>

            <div className="space-y-3 overflow-auto">
              {schedule.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between border rounded-md px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-10 rounded bg-blue-400" />
                    <div>
                      <div className="text-sm font-medium">{s.title}</div>
                      <div className="text-xs text-gray-500">{s.time}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {s.id % 2 === 0 ? 'Room A' : 'Room B'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-3">
              <button className="w-full bg-green-600 text-white py-2 rounded-md">
                Create Meeting
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <div className="text-xs text-gray-500">Calendar</div>
            <div className="mt-2 grid grid-cols-7 gap-1 text-[12px] text-center">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-2 rounded ${i === new Date().getDate() - 1 ? 'bg-green-50' : ''}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function formatDuration(totalSeconds: number) {
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function ControlButton({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`rounded-md px-2 py-1 bg-white/80 hover:bg-white text-sm shadow ${
        active ? 'ring-2 ring-green-400' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="w-5 h-5">{children}</div>
      </div>
    </button>
  );
}

function IconButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="px-2 py-1 border rounded-md text-sm text-gray-700">
      {children}
    </button>
  );
}
