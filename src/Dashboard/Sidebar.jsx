import UserMenu from './Menu/UserMenu';
import ModeratorMenu from './Menu/ModeratorMenu';
import AdminMenu from './Menu/AdminMenu';
import useRole from '../hooks/useRole';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';  
import { FaHome } from 'react-icons/fa';

const Sidebar = () => {
  const [role, isLoading] = useRole();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white p-8 shadow-lg rounded-r-3xl flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-extrabold mb-10 text-center tracking-wide">Dashboard</h2>

        {/* User Menu */}
        {role === 'user' && <UserMenu />}

        {/* Moderator Menu */}
        {role === 'moderator' && <ModeratorMenu />}

        {/* Admin Menu */}
        {role === 'admin' && <AdminMenu />}
      </div>

      <div className="mt-10 border-t border-white/20 pt-6">
        <Link
          to="/"
          className="flex items-center justify-center space-x-2 text-white/90 hover:text-amber-400 transition-colors font-semibold text-lg"
          aria-label="ScholarX Home"
        >
          <FaHome className="text-amber-400" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
