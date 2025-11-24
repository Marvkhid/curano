'use client';

import React from 'react';
import { User } from './types';
import UserRow from './UserRow';

interface UsersTableProps {
  users: User[];
  onDelete: (id: number) => void;
}

export default function UsersTable({ users, onDelete }: UsersTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full min-w-[600px]">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Age</th>
            <th className="p-3">Patients</th>
            <th className="p-3">Date</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={onDelete} />
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
