// src/pages/MyProfile.jsx
import React from 'react';
import useAuth from '../hooks/useAuth'; // Custom hook to get user data

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">👤 My Profile</h2>
      <img src={user?.image} alt="User" className="w-24 h-24 rounded-full mb-4" />
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      {user?.role !== 'user' && <p><strong>Role:</strong> {user?.role}</p>}
    </div>
  );
};

export default MyProfile;
