'use client';

import React from 'react';
import { User } from './types';

interface AddUserModalProps {
  isOpen: boolean;
  newUser: User;
  onClose: () => void;
  onAdd: () => void;
  onChange: (field: keyof User, value: string | number) => void;
}

export default function AddUserModal({
  isOpen,
  newUser,
  onClose,
  onAdd,
  onChange,
}: AddUserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <h2 className="text-lg font-semibold mb-4 text-center">Add New User</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="border rounded-md p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Gender"
            value={newUser.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            className="border rounded-md p-2 text-sm"
          />
          <input
            type="number"
            placeholder="Age"
            value={newUser.age || ''}
            onChange={(e) => onChange('age', parseInt(e.target.value))}
            className="border rounded-md p-2 text-sm"
          />
          <input
            type="number"
            placeholder="Patients"
            value={newUser.patients || ''}
            onChange={(e) => onChange('patients', parseInt(e.target.value))}
            className="border rounded-md p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Date (dd-mm-yyyy)"
            value={newUser.date}
            onChange={(e) => onChange('date', e.target.value)}
            className="border rounded-md p-2 text-sm"
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={onAdd}
              className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600"
            >
              Add
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 border px-3 py-2 text-sm rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
