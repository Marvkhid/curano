'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  gender: string;
  age: number;
  patients: number;
  date: string;
}

const SettingsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Marcus Reed', gender: 'Male', age: 47, patients: 5, date: '03-04-2025' },
    { id: 2, name: 'Amelia Grant', gender: 'Female', age: 32, patients: 2, date: '08-06-2025' },
    { id: 3, name: 'Ethan Cole', gender: 'Male', age: 41, patients: 7, date: '15-02-2025' },
    { id: 4, name: 'Sophia Lane', gender: 'Female', age: 29, patients: 4, date: '22-09-2025' },
    { id: 5, name: 'Daniel Farms', gender: 'Male', age: 59, patients: 8, date: '20-04-2025' },
    { id: 6, name: 'Samuel Downhill', gender: 'Male', age: 44, patients: 1, date: '03-05-2025' },
    { id: 7, name: 'Elizabeth Gregg', gender: 'Female', age: 36, patients: 9, date: '14-01-2025' },
  ]);

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-800 relative">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-md p-4 flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Settings</h2>
        <nav className="flex flex-col gap-2">
          {['Users', 'Admin', 'About AI', 'Profile', 'History', 'Access Permission'].map((item) => (
            <details key={item} className="group">
              <summary className="cursor-pointer text-sm font-medium py-2 px-3 bg-gray-100 rounded-md group-open:bg-gray-200">
                {item}
              </summary>
              <div className="pl-4 text-sm text-gray-600">Details about {item}</div>
            </details>
          ))}
        </nav>

        <button
          onClick={() => setShowPopup(true)}
          className="mt-6 bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600"
        >
          + Add New User
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-x-auto">
        <header className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Users</h1>
          <div className="flex items-center gap-3">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Ask AI</button>
            <button className="bg-gray-100 px-3 py-2 rounded-md" onClick={handleSort}>
              Sort by Patients {sortAsc ? '▲' : '▼'}
            </button>
          </div>
        </header>

        {/* User Table */}
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
                <tr key={user.id} className="border-t hover:bg-gray-50 transition-colors">
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
                      onClick={() => handleDelete(user.id)}
                      className="text-xl text-red-500 hover:text-red-700"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
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
      </main>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <h2 className="text-lg font-semibold mb-4 text-center">Add New User</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="border rounded-md p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Gender"
                value={newUser.gender}
                onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                className="border rounded-md p-2 text-sm"
              />
              <input
                type="number"
                placeholder="Age"
                value={newUser.age || ''}
                onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value) })}
                className="border rounded-md p-2 text-sm"
              />
              <input
                type="number"
                placeholder="Patients"
                value={newUser.patients || ''}
                onChange={(e) => setNewUser({ ...newUser, patients: parseInt(e.target.value) })}
                className="border rounded-md p-2 text-sm"
              />
              <input
                type="text"
                placeholder="Date (dd-mm-yyyy)"
                value={newUser.date}
                onChange={(e) => setNewUser({ ...newUser, date: e.target.value })}
                className="border rounded-md p-2 text-sm"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleAddUser}
                  className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-500 border px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
