'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const bgContents = [
  {
    bg: '/oles.png',
    texts: [
      'Welcome to your centralized hub for',
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
    bg: '/anon.png',
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

const Signup = () => {
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
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      {/* LEFT SIDE (Background Section) */}
      <div
        className="relative w-full lg:w-1/2 h-80 sm:h-96 md:h-[28rem] lg:h-screen bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${bg})`,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Curano logo */}
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-10">
          <Image
            src="/Curano.png"
            alt="Curano Logo"
            width={80}
            height={40}
            className="object-contain lg:w-[100px] lg:h-[50px]"
          />
        </div>

        {/* Main content */}
        <div className="absolute inset-0 text-white px-4 py-6 sm:py-8 lg:px-6 lg:py-10 flex flex-col justify-between lg:justify-start lg:pt-48">
          {/* Welcome text - always visible */}
          <div className="flex-1 flex flex-col justify-center lg:justify-start lg:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold mb-2 sm:mb-3 lg:mb-4 text-white leading-tight">
              Welcome
            </h1>
            <div className="text-sm sm:text-base md:text-lg lg:text-3xl font-semibold lg:font-semibold">
              {texts.map((text, i) => (
                <p key={i} className="leading-snug lg:leading-snug">
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-gray-700 bg-opacity-90 p-3 sm:p-4 rounded-xl max-w-xs sm:max-w-sm lg:max-w-md">
            <div className="mb-3">
              {texts.map((text, i) => (
                <p key={i} className="text-xs sm:text-sm lg:text-lg leading-relaxed">
                  {text}
                </p>
              ))}
            </div>
            <div className="flex gap-2 sm:gap-3 items-center">
              <Image
                src={profile}
                alt="Doctor"
                width={32}
                height={32}
                className="rounded-xl sm:w-10 sm:h-10 lg:w-12 lg:h-12"
              />
              <div>
                <p className="font-semibold text-white text-xs sm:text-sm lg:text-base">
                  {profileName}
                </p>
                <p className="text-xs sm:text-xs lg:text-sm text-gray-300">{occupation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* DOT INDICATORS - Hidden on mobile, visible on lg+ */}
        <div className="hidden lg:flex gap-2 absolute bottom-3 sm:bottom-4 lg:bottom-6 left-6 z-10">
          {bgContents.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-blue-500 scale-110' : 'bg-white opacity-60'
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE (Signup Form) */}
      <div className="w-full lg:w-1/2 bg-gray-100 px-4 sm:px-6 md:px-10 py-6 lg:py-10 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-black">
            Create your account
          </h2>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Create/login on existing account
          </p>
          <p className="text-gray-500 text-center mb-6 text-sm sm:text-base">
            with your correct details
          </p>

          <form className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-white p-3 rounded border border-gray-200 text-black placeholder-gray-500 text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder="Hospital address"
              className="w-full bg-white p-3 rounded border border-gray-200 text-black placeholder-gray-500 text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-white p-3 rounded border border-gray-200 text-black placeholder-gray-500 text-sm sm:text-base"
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create Password"
                className="w-full bg-white p-3 rounded border border-gray-200 text-black placeholder-gray-500 text-sm sm:text-base"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>

            <label className="text-sm flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-500" />
                <span className="text-black">Agree to the</span>
              </div>
              <Link href="/terms" className="text-green-600 hover:underline">
                terms and conditions
              </Link>
            </label>

            <button
              type="submit"
              className="w-full bg-green-900 hover:bg-green-800 text-white cursor-pointer py-3 rounded-lg font-bold transition-colors"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-500 mb-6 text-sm">Or sign up with</p>

          <div className="flex justify-center gap-4 mb-6">
            <Link
              href="https://apple.com"
              target="_blank"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/apple.png"
                alt="Apple"
                width={40}
                height={40}
                className="border border-black p-2 rounded-full bg-white"
              />
            </Link>
            <Link
              href="https://play.google.com"
              target="_blank"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/googleplay.png"
                alt="Google Play"
                width={40}
                height={40}
                className="border border-black p-2 rounded-full bg-white"
              />
            </Link>
          </div>

          <p className="text-center text-gray-700 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
