import React from 'react';
import { FaClipboardCheck, FaTasks } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';
import { Link } from 'react-router';

const ModeratorMenu = () => {
  return (
     <>
         <div>
        <h3 className="text-sm text-gray-400 uppercase mb-2">Moderator</h3>
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
     </>
  );
};

export default ModeratorMenu;