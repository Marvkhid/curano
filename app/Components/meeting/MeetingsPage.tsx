'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Message, SchItem } from './types';
import { formatTime, isoDate } from './utils';
import VideoCallSection from './VideoCallSection';
import ChatSection from './ChatSection';
import NotificationsPanel from './NotificationsPanel';
import SchedulePanel from './SchedulePanel';
import CalendarPanel from './CalendarPanel';
import CreateMeetingModal from './CreateMeetingModal';

export default function MeetingsPage(): React.JSX.Element {
  // Call/UI state
  const [muted, setMuted] = useState<boolean>(false);
  const [cameraOff, setCameraOff] = useState<boolean>(false);
  const [callActive, setCallActive] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  // Messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const pendingReplyRef = useRef<number | null>(null);

  // Schedule
  const [schedule, setSchedule] = useState<SchItem[]>([]);

  // Calendar
  const today = new Date();
  const [calendarDate, setCalendarDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDateISO, setSelectedDateISO] = useState<string>(() => isoDate(today));
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  // Modal
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [newMeeting, setNewMeeting] = useState<{
    title: string;
    time: string;
    dateISO: string;
  }>({
    title: '',
    time: '10:00AM',
    dateISO: selectedDateISO,
  });

  // Timer effect
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

  // Send message
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

  // Fake reply logic
  function scheduleFakeReply(userText: string): void {
    if (pendingReplyRef.current) {
      clearTimeout(pendingReplyRef.current);
      pendingReplyRef.current = null;
    }

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

  // Meeting modal
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

  function hangup(): void {
    setCallActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function prevMonth(): void {
    setCalendarDate((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  }

  function nextMonth(): void {
    setCalendarDate((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
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
                type="button"
                className="px-3 py-1 rounded-md border bg-white text-sm"
              >
                {notificationsOpen ? 'Hide' : 'Notifications'}
              </button>
            </div>
          </header>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <VideoCallSection
              cameraOff={cameraOff}
              setCameraOff={setCameraOff}
              muted={muted}
              setMuted={setMuted}
              timer={timer}
              hangup={hangup}
            />

            <ChatSection
              messages={messages}
              messageText={messageText}
              setMessageText={setMessageText}
              sendMessage={sendMessage}
              isTyping={isTyping}
            />
          </div>
        </section>

        {/* Right sidebar: Notifications and schedule */}
        <aside className="col-span-4 flex flex-col gap-4">
          <NotificationsPanel
            notificationsOpen={notificationsOpen}
            setNotificationsOpen={setNotificationsOpen}
          />

          <SchedulePanel
            schedule={schedule}
            setSchedule={setSchedule}
            selectedDateISO={selectedDateISO}
            openCreateModal={openCreateModal}
            deleteMeeting={deleteMeeting}
          />

          <CalendarPanel
            calendarDate={calendarDate}
            selectedDateISO={selectedDateISO}
            setSelectedDateISO={setSelectedDateISO}
            setNewMeeting={setNewMeeting}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />
        </aside>
      </div>

      <CreateMeetingModal
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
        newMeeting={newMeeting}
        setNewMeeting={setNewMeeting}
        createMeeting={createMeeting}
      />
    </div>
  );
}
