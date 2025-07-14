// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import { FaUser, FaFileAlt, FaStar, FaUsers, FaPlus, FaTasks, FaClipboardCheck } from 'react-icons/fa';
import { MdAdminPanelSettings, MdReviews } from 'react-icons/md';
import UserMenu from './Menu/UserMenu';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white p-6 shadow-lg rounded-r-3xl">
      <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>

       {/* user menu  */}
         <UserMenu/>
      {/* Moderator/Admin Section */}
      <div>
        <h3 className="text-sm text-gray-400 uppercase mb-2">Moderator / Admin</h3>
        <ul className="space-y-2 mb-6">
          <li>
            <Link to="/dashboard/manage-scholarships" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaTasks /> Manage Scholarships
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-reviews" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <MdReviews /> All Reviews
            </Link>
          </li>
          <li>
            <Link to="/dashboard/all-applied-scholarships" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaClipboardCheck /> All Applied Scholarships
            </Link>
          </li>
        </ul>
      </div>

      {/* Admin Section */}
      <div>
        <h3 className="text-sm text-gray-400 uppercase mb-2">Admin</h3>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard/admin-profile" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <MdAdminPanelSettings /> Admin Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-scholarship" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaPlus /> Add Scholarship
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-applications" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaTasks /> Manage Applications
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-users" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <FaUsers /> Manage Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-reviews" className="flex items-center gap-3 hover:bg-gray-700 px-3 py-2 rounded-xl">
              <MdReviews /> Manage Reviews
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
