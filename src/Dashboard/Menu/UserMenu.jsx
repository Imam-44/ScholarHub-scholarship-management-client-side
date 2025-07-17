import React from 'react';
import { FaFileAlt, FaStar, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <>
      <div>
        <h3 className="text-sm text-gray-400 uppercase mb-2">User</h3>
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
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-applications"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <FaFileAlt /> My Application
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-reviews"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'hover:bg-gray-700 text-white'
                }`
              }
            >
              <FaStar /> My Reviews
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
