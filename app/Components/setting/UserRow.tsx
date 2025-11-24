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
    <tr className="border-t hover:bg-gray-50 transition-colors">
      <td className="p-3 flex items-center gap-3">
        <Image
          src="/marcus.png"
          alt="user avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        {user.name}
      </td>
      <td className="p-3">{user.gender}</td>
      <td className="p-3">{user.age}yo</td>
      <td className="p-3">{user.patients}</td>
      <td className="p-3">{user.date}</td>
      <td className="p-3 text-center">
        <button
          onClick={() => onDelete(user.id)}
          className="text-xl text-red-500 hover:text-red-700"
        >
          🗑
        </button>
      </td>
    </tr>
  );
}
