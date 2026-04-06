'use client';

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="md:col-span-1 flex flex-col bg-white rounded-lg shadow min-h-0 h-full">
      {/* Header */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/nathan.png"
              alt="Dr Lovina avatar"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-sm sm:text-base truncate">Dr Lovina</div>
            <div className="text-xs text-green-500">Online</div>
          </div>
        </div>
        <div className="text-xs text-gray-400 flex-shrink-0 ml-2">{formatTime(new Date())}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-2 sm:p-3 overflow-y-auto overscroll-contain min-h-0">
        <div className="space-y-2 sm:space-y-3">
          {messages.length === 0 && (
            <div className="text-sm text-gray-400 text-center py-6">
              No messages yet — say hello 👋
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.author === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  px-3 py-2 rounded-lg shadow-sm
                  max-w-[85%] sm:max-w-[80%]
                  text-sm sm:text-base
                  ${m.author === 'You'
                    ? 'bg-green-50 text-gray-900'
                    : 'bg-gray-100 text-gray-900'
                  }
                `}
              >
                <div className="text-[10px] sm:text-xs text-gray-500">
                  {m.author} • {m.time}
                </div>
                <div className="mt-1 whitespace-pre-wrap break-words leading-relaxed">
                  {m.text}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-3 py-2.5 rounded-lg flex items-center gap-1.5">
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="px-2 sm:px-3 py-2 sm:py-2.5 border-t flex items-center gap-2 flex-shrink-0">
        <input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type a message..."
          aria-label="Chat message"
          className="
            flex-1 min-w-0
            border rounded-md
            px-3 py-2
            text-sm
            focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
            transition
          "
        />
        <button
          onClick={sendMessage}
          type="button"
          aria-label="Send message"
          title="Send message"
          className="
            inline-flex items-center justify-center
            min-w-[44px] min-h-[44px]
            sm:min-w-[auto] sm:min-h-[auto]
            px-3 sm:px-4 py-2
            bg-green-600 hover:bg-green-700
            text-white text-sm font-medium
            rounded-md
            touch-manipulation select-none
            active:scale-95
            hover:shadow-md transition-all duration-150
            flex-shrink-0
          "
        >
          <span className="hidden sm:inline">Send</span>
          <span className="sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}