import React from 'react';
import { FaClipboardCheck, FaPlus, FaTasks } from 'react-icons/fa';
import { MdAdminPanelSettings, MdReviews } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const ModeratorMenu = () => {
  return (
    <>
      <div>
        <h3 className="text-sm text-gray-400 uppercase mb-2">Moderator</h3>
        <ul className="space-y-2 mb-6">
          <li>
            <NavLink
              to="/dashboard/my-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <MdAdminPanelSettings /> Moderator Profile
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
              to="/dashboard/all-reviews"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <MdReviews /> All Reviews
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
              <FaClipboardCheck /> All Applied Scholarships
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ModeratorMenu;
