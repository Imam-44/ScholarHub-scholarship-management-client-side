import React from 'react';
import { FaPlus, FaTasks, FaUsers } from 'react-icons/fa';
import { MdAdminPanelSettings, MdReviews } from 'react-icons/md';
import { Link } from 'react-router';

const AdminMenu = () => {
  return (
     <>
         <div>
        <h3 className="text-sm text-gray-400 uppercase mb-2">Admin</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard/my-profile" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <MdAdminPanelSettings /> Admin Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-scholarship" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaPlus /> Add Scholarship
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-applied-scholarships" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaTasks /> Manage Applications
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-users" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaUsers /> Manage Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-reviews" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <MdReviews /> Manage Reviews
            </Link>
          </li>
        </ul>
      </div>
     </>
  );
};

export default AdminMenu;