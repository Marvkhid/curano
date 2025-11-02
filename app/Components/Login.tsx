'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const bgContents = [
  {
    bg: '/oles.png',
    texts: [
      'Login to your centralized hub for',
      'cancer case documentation, live tumor',
      'board collaboration, and AI-assisted',
      'clinical decision making',
    ],
    profile: '/marcus.png',
    profileName: 'Dr Marcus Ores',
    occupation: 'Senior Surgeon',
  },
  {
    bg: '/doc.png',
    texts: [
      'Join live tumor board discussions',
      'and make informed decisions with',
      'real-time AI insights and',
      'collaborative tools',
    ],
    profile: '/marcus.png',
    profileName: 'Dr Benjamin Cole',
    occupation: 'Immunologist',
  },
  {
    bg: '/green.png',
    texts: [
      'Access patient history and diagnostics',
      'in one place. Ensure clinical accuracy',
      'with smart suggestions and data-driven',
      'support tools',
    ],
    profile: '/tarzine.png',
    profileName: 'Dr Amelia Dane',
    occupation: 'Clinical Pathologist',
  },
];

const Login = () => {
  const [current, setCurrent] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgContents.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        setCurrent((prev) => (prev + 1) % bgContents.length);
      } else {
        setCurrent((prev) => (prev - 1 + bgContents.length) % bgContents.length);
      }
    }

    touchStartX.current = null;
  };

  const { bg, profile, texts, profileName, occupation } = bgContents[current];

  return (
    <div className="flex flex-col lg:flex-row-reverse p-4 md:p-6 bg-white min-h-screen">
      {/* RIGHT SIDE (Background Section) */}
      <div
        className="relative w-full lg:w-1/2 min-h-[480px] md:min-h-[600px] lg:min-h-auto bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${bg})` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

        {/* Curano logo in top-left of background */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
          <Image
            src="/Curano.png"
            alt="Curano Logo"
            width={80}
            height={40}
            className="object-contain"
          />
        </div>

        <div className="absolute inset-0 text-white px-4 md:px-6 py-6 md:py-10 flex flex-col justify-center lg:justify-start lg:pt-48 z-10">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-2 md:mb-4">
            Welcome Back
          </h1>

          <div className="text-base md:text-xl lg:text-3xl font-semibold mb-3 md:mb-4 space-y-1">
            {texts.map((text, i) => (
              <p key={i} className="leading-snug">
                {text}
              </p>
            ))}
          </div>

          <div className="bg-gray-700 bg-opacity-80 p-3 md:p-4 rounded-xl mt-1 md:mt-1 max-w-sm flex flex-col items-start text-left text-sm md:text-lg">
            <div className="mb-3 space-y-0.5">
              {texts.slice(0, 4).map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
            <div className="flex gap-3 items-center">
              <Image src={profile} alt="Doctor" width={40} height={40} className="rounded-xl" />
              <div>
                <p className="font-semibold text-white text-sm">{profileName}</p>
                <p className="text-xs text-gray-300">{occupation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* DOT INDICATORS */}
        <div className="hidden sm:flex gap-2 absolute bottom-1 left-6 z-10 mt-32 lg:mt-52">
          {bgContents.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-blue-500 scale-110' : 'bg-white opacity-60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* LEFT SIDE (Login Form) */}
      <div className="w-full lg:w-1/2 bg-gray-100 px-4 md:px-10 py-10 flex items-center justify-center relative">
        <div className="w-full max-w-md mt-20 lg:mt-0">
          <h2 className="text-2xl font-bold text-center mb-2 text-black">Login to your account</h2>
          <p className="text-gray-500 text-center">Please login your correct details to securely</p>
          <p className="text-gray-500 text-center mb-6">access your dashboard</p>

          <form className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Hospital name"
              className="w-full bg-white p-3 rounded text-black placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-white p-3 rounded text-black placeholder-gray-500"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create password"
                className="w-full bg-white p-3 rounded text-black placeholder-gray-500"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            <label className="text-sm flex items-center justify-between">
              <div className="gap-1 flex">
                <input type="checkbox" className="accent-green-500" />
                <span className="text-black">Remember me</span>
              </div>
              <Link href="/forgot-password" className="text-green-600">
                Forgot password?
              </Link>
            </label>

            <Link href="/dashboard">
              <button
                type="submit"
                className="w-full bg-green-900 text-white py-3 rounded-lg font-bold"
              >
                Join board
              </button>
            </Link>
          </form>

          <p className="text-center text-gray-500 mb-6">Or sign up with</p>
          <div className="flex justify-center gap-6 mb-6">
            <Link href="https://apple.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/apple.png"
                alt="Apple"
                width={40}
                height={40}
                className="border border-black p-2 rounded-full"
              />
            </Link>
            <Link href="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <Image
                src="/googleplay.png"
                alt="Google Play"
                width={40}
                height={40}
                className="border border-black p-2 rounded-full"
              />
            </Link>
          </div>

          <p className="text-center text-gray-700">
            Don&apos;t have an account?{' '}
            <Link href="/" className="text-green-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
