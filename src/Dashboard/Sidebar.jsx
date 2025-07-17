
import UserMenu from './Menu/UserMenu';
import ModeratorMenu from './Menu/ModeratorMenu';
import AdminMenu from './Menu/AdminMenu';
import useRole from '../hooks/useRole';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router';

const Sidebar = () => {
  const [role, isLoading] = useRole();
  const [mounted, setMounted] = useState(false);

  useEffect(()=> {
    setMounted(true);
  }, []);

  if(isLoading || !mounted) {
    return <LoadingSpinner/>
  }
  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white p-6 shadow-lg rounded-r-3xl">
      <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
    

       {/* user menu  */}
        {role === 'user' &&  <UserMenu/>}
      {/* Moderator/Admin Section */}
      {role === 'moderator' &&  <ModeratorMenu/>}

      {/* Admin Section */}
       {role === 'admin' &&    <AdminMenu/>}
       <hr />
              {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white/80" aria-label="ScholarX Home">Back to home</Link>
    </div>
  );
};

export default Sidebar;
