import React from 'react';
import { FaFileAlt, FaStar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router';

const UserMenu = () => {
  return (
     <>
           {/* User Section */}
      <div>
        <h3 className="text-sm text-gray-400 uppercase mb-2">User</h3>
        <ul className="space-y-2 mb-6">
          <li>
            <Link to="/dashboard/my-profile" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaUser /> My Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-applications" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaFileAlt /> My Application
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-reviews" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaStar /> My Reviews
            </Link>
          </li>
        </ul>
      </div>
     </>
  );
};

export default UserMenu;