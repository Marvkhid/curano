'use client';

import React from 'react';
import Image from 'next/image';
import { User } from './types';

interface UserRowProps {
  user: User;
  onDelete: (id: number) => void;
}

export default function UserRow({ user, onDelete }: UserRowProps) {
  return (
    <tr className="
      border-t hover:bg-gray-50 transition-colors
      block md:table-row
      mb-4 md:mb-0
    ">
      {/* Name */}
      <td className="
        p-3 flex items-center gap-3
        md:table-cell
        before:content-['Name'] before:block before:text-xs before:text-gray-500 md:before:hidden
      ">
        <Image
          src="/marcus.png"
          alt="user avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        {user.name}
      </td>

      {/* Gender */}
      <td className="
        p-3 md:table-cell
        before:content-['Gender'] before:block before:text-xs before:text-gray-500 md:before:hidden
      ">
        {user.gender}
      </td>

      {/* Age */}
      <td className="
        p-3 md:table-cell
        before:content-['Age'] before:block before:text-xs before:text-gray-500 md:before:hidden
      ">
        {user.age}yo
      </td>

      {/* Patients */}
      <td className="
        p-3 md:table-cell
        before:content-['Patients'] before:block before:text-xs before:text-gray-500 md:before:hidden
      ">
        {user.patients}
      </td>

      {/* Date */}
      <td className="
        p-3 md:table-cell
        before:content-['Date'] before:block before:text-xs before:text-gray-500 md:before:hidden
      ">
        {user.date}
      </td>

      {/* Action */}
      <td className="
        p-3 text-right md:text-center md:table-cell
      ">
        <button
          onClick={() => onDelete(user.id)}
          className="text-lg sm:text-xl text-red-500 hover:text-red-700"
        >
          🗑
        </button>
      </td>
    </tr>
  );
}