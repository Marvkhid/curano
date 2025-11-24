'use client';

import React, { useState } from 'react';
import { User } from './types';
import { initialUsers } from './mockUsers';
import Sidebar from './Sidebar';
import Header from './Header';
import UsersTable from './UsersTable';
import AddUserModal from './AddUserModal';

const SettingsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [sortAsc, setSortAsc] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: '',
    gender: '',
    age: 0,
    patients: 0,
    date: '',
  });

  const handleSort = () => {
    const sorted = [...users].sort((a, b) =>
      sortAsc ? b.patients - a.patients : a.patients - b.patients
    );
    setUsers(sorted);
    setSortAsc(!sortAsc);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.gender || !newUser.age || !newUser.date) return;
    setUsers([...users, { ...newUser, id: users.length + 1, patients: newUser.patients || 0 }]);
    setNewUser({ id: 0, name: '', gender: '', age: 0, patients: 0, date: '' });
    setShowPopup(false);
  };

  const handleFieldChange = (field: keyof User, value: string | number) => {
    setNewUser({ ...newUser, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-800 relative">
      <Sidebar onAddUser={() => setShowPopup(true)} />

      <main className="flex-1 p-6 overflow-x-auto">
        <Header sortAsc={sortAsc} onSort={handleSort} />
        <UsersTable users={users} onDelete={handleDelete} />
      </main>

      <AddUserModal
        isOpen={showPopup}
        newUser={newUser}
        onClose={() => setShowPopup(false)}
        onAdd={handleAddUser}
        onChange={handleFieldChange}
      />
    </div>
  );
};

export default SettingsPage;
