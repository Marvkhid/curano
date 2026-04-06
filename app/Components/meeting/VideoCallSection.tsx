'use client';

import React from 'react';

interface VideoCallSectionProps {
  callState: {
    cameraOff: boolean;
    setCameraOff: React.Dispatch<React.SetStateAction<boolean>>;
    muted: boolean;
    setMuted: React.Dispatch<React.SetStateAction<boolean>>;
    timer: number;
    hangup: () => void;
  };
}

export default function VideoCallSection({ callState }: VideoCallSectionProps) {
  const { cameraOff, setCameraOff, muted, setMuted, timer, hangup } = callState;

  // Format timer as MM:SS
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-gray-200 rounded-2xl flex-1 flex flex-col p-3 min-h-[250px]">
      {/* Video display */}
      <div className="flex-1 bg-black rounded-lg mb-3 flex items-center justify-center text-white">
        {cameraOff ? 'Camera is Off' : 'Video Stream'}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setCameraOff(!cameraOff)}
            className={`px-3 py-1 rounded-md font-medium text-white ${
              cameraOff ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {cameraOff ? 'Camera Off' : 'Camera On'}
          </button>

          <button
            onClick={() => setMuted(!muted)}
            className={`px-3 py-1 rounded-md font-medium text-white ${
              muted ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {muted ? 'Muted' : 'Unmuted'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-mono">{formatTimer(timer)}</span>
          <button
            onClick={hangup}
            className="px-3 py-1 rounded-md bg-red-600 text-white font-medium"
          >
            Hang Up
          </button>
        </div>
      </div>
    </div>
  );
}