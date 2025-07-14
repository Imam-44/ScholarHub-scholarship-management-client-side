
import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from '../Dashboard/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Left */}
      <div className="w-64">
        <Sidebar/>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
