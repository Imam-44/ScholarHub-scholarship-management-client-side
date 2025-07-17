import React from 'react';
import { FaPlus, FaTasks, FaUsers } from 'react-icons/fa';
import { MdAdminPanelSettings, MdReviews } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
      <div>
        <h3 className="text-sm text-gray-400 uppercase mb-2">Admin</h3>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard/my-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <MdAdminPanelSettings /> Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-scholarship"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <FaPlus /> Add Scholarship
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-scholarships"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <FaTasks /> Manage Scholarships
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-applied-scholarships"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <FaTasks /> Manage Applications
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <FaUsers /> Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-reviews"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <MdReviews /> Manage Reviews
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
