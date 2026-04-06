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
      <table className="w-full border-collapse">
        
        {/* Hide header on mobile, show on desktop */}
        <thead className="hidden md:table-header-group bg-gray-100 text-left">
          <tr>
            <th className="p-3">User</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Age</th>
            <th className="p-3">Patients</th>
            <th className="p-3">Date</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody className="block md:table-row-group">
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={onDelete} />
          ))}

          {users.length === 0 && (
            <tr className="block md:table-row">
              <td
                colSpan={6}
                className="text-center py-6 text-gray-500 block md:table-cell"
              >
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}