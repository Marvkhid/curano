'use client';

import Image from 'next/image';
import React from 'react';
import ControlButton from './ui/ControlButton';
import IconButton from './ui/IconButton';
import { formatDuration } from './utils';

interface VideoCallSectionProps {
  cameraOff: boolean;
  setCameraOff: (val: boolean) => void;
  muted: boolean;
  setMuted: (val: boolean) => void;
  timer: number;
  hangup: () => void;
}

export default function VideoCallSection({
  cameraOff,
  setCameraOff,
  muted,
  setMuted,
  timer,
  hangup,
}: VideoCallSectionProps) {
  return (
    <div className="md:col-span-2 rounded-lg overflow-hidden bg-gray-900 flex flex-col">
      <div className="relative flex-1 bg-black">
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

        {/* Name badge + timer */}
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

        {/* Controls overlay */}
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <ControlButton
            onClick={() => setMuted(!muted)}
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
            onClick={() => setCameraOff(!cameraOff)}
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
            type="button"
            className="bg-red-600 text-white px-3 py-2 rounded-full shadow hover:scale-105 transition"
            title="Hang up"
          >
            Hang up
          </button>
        </div>
      </div>

      {/* Lower controls */}
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
            <IconButton onClick={() => alert('Toggle screen share (demo)')}>Share</IconButton>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Meeting ID: <span className="font-mono">#16:56</span>
        </div>
      </div>
    </div>
  );
}
