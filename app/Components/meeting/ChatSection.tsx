'use client';

import Image from 'next/image';
import React from 'react';
import { Message } from './types';
import { formatTime } from './utils';

interface ChatSectionProps {
  messages: Message[];
  messageText: string;
  setMessageText: (val: string) => void;
  sendMessage: () => void;
  isTyping: boolean;
}

export default function ChatSection({
  messages,
  messageText,
  setMessageText,
  sendMessage,
  isTyping,
}: ChatSectionProps) {
  return (
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
                  m.author === 'You' ? 'bg-green-50 text-gray-900' : 'bg-gray-100 text-gray-900'
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
          onClick={sendMessage}
          type="button"
          className="px-3 py-2 bg-green-600 text-white rounded-md hover:shadow-md transition"
          title="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
}
