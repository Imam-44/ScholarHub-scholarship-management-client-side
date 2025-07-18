import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';
import { FaBars, FaTimes } from 'react-icons/fa';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Mobile Header with toggle button */}
      <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 w-full fixed top-0 left-0 z-30">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 focus:outline-none cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="font-bold text-lg text-red-950">Dashboard</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:static md:shadow-none
    pt-16 md:pt-0
    overflow-y-auto
  `}
      >
        <Sidebar />
      </div>


      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 p-6 pt-20 md:pt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
