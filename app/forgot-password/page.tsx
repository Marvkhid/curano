'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [seconds, setSeconds] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const name = 'John Doe'; // Replace with real data from context/props
  const email = 'john@example.com'; // Replace with real data from context/props
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('resend-timer');
      if (saved) {
        const savedTime = parseInt(saved);
        if (savedTime > 0) {
          setSeconds(savedTime);
          setResendEnabled(false);
        } else {
          setSeconds(60);
          setResendEnabled(true);
        }
      }
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleVerify();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      if (typeof window !== 'undefined') {
        localStorage.setItem('resend-timer', (seconds - 1).toString());
      }
      return () => clearTimeout(timer);
    } else {
      setResendEnabled(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('resend-timer', '0');
      }
    }
  }, [seconds]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9]$/.test(value)) {
      if (inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }
    } else {
      e.target.value = '';
    }
  };

  const handleResend = () => {
    if (!resendEnabled) return;
    setSeconds(60);
    setResendEnabled(false);
    toast.success('Verification code resent to your email!');

    inputsRef.current.forEach((input) => {
      if (input) input.value = '';
    });
    // Add resend logic if needed
  };

  const handleVerify = () => {
    const code = inputsRef.current.map((input) => input.value).join('');
    if (code.length !== 5) {
      toast.error('Please enter a 5-character code');
      return;
    }
    toast.success(`Code ${code} verified successfully!`);
    // Add verification logic here
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('/rectangle.png')" }}
    >
      <div className="absolute top-6 left-6">
        <Image src="/logo.png" alt="Logo" width={100} height={50} />
      </div>

      <div
        ref={containerRef}
        className=" bg-opacity-10 backdrop-blur-xl p-6 rounded-lg w-full max-w-md text-center shadow-xl"
      >
        <h2 className="text-white text-xl md:text-2xl font-bold mb-4">Enter your verification code</h2>
        <p className="text-white mb-1">Hi, {name},</p>
        <p className="text-white mb-4">
          We have sent a verification code to <span className="font-semibold">{email}</span>
        </p>

        <div className="flex justify-between gap-2 mb-4">
          {Array(5)
            .fill('')
            .map((_, index) => (
              <input
                key={index}
                maxLength={1}
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                onChange={(e) => handleInput(e, index)}
                className="w-12 h-12 md:w-14 md:h-14 text-center text-xl rounded border border-white bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                type="text"
                inputMode="text"
                pattern="[A-Za-z0-9]*"
              />
            ))}
        </div>

        <p className="text-red-500 text-lg mb-4">
          {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
        </p>

        <p className="text-white mb-8">
          Having issues?{' '}
          <span
            className={`text-red-500 font-semibold cursor-pointer ${
              resendEnabled ? '' : 'opacity-50 pointer-events-none'
            }`}
            onClick={handleResend}
          >
            Resend code
          </span>
        </p>

        <button
          onClick={handleVerify}
          className="bg-green-700 text-white py-2 px-8 rounded text-lg font-bold w-full hover:bg-green-800 transition"
        >
          Verify
        </button>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ForgotPasswordPage;
