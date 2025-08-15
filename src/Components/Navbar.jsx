import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userRole, setUserRole] = useState(null);

  // Fetch user role
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`)
        .then((res) => setUserRole(res.data.role))
        .catch();
    }
  }, [user, axiosSecure]);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-amber-600 border-b-4 border-amber-600 pb-1 font-semibold text-lg'
      : 'hover:text-amber-600 transition';

  const handleSignOut = async () => {
    try {
      await signOutUser();
      await axiosSecure.get('/logout');
      // localStorage.removeItem('access-token');
      Swal.fire('Success', 'Logged out successfully', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to log out', 'error');
    }
  };


  return (
    <nav className="bg-gradient-to-r from-red-700 via-black to-red-700 shadow-md px-6 py-4 relative z-50 sticky top-0" role="navigation" aria-label="Main navigation">
      <div className="w-11/12 max-w-screen-2xl mx-auto flex justify-between items-center ">
        {/* Logo */}
        <div className='flex gap-2 items-center'>
          <img src="/logo3.png" alt="logo" className='w-12 h-12' />
          <Link to="/" className="text-4xl font-bold text-amber-100" aria-label="ScholarX Home">ScholarHub</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-white font-medium text-lg">
          <li><NavLink to="/" className={navLinkClass} aria-label="Home">Home</NavLink></li>
          <li><NavLink to="/all-scholarships" className={navLinkClass} aria-label="all-scholarship">All Scholarships</NavLink></li>

          {user && (
            <>
              {userRole === 'user' && (
                <li>
                  <NavLink to="/dashboard/user" className={navLinkClass} aria-label="User Dashboard">
                    User Dashboard
                  </NavLink>
                </li>
              )}
              {userRole === 'moderator' && (
                <li>
                  <NavLink to="/dashboard/moderator" className={navLinkClass} aria-label="Moderator Dashboard">
                    Moderator Dashboard
                  </NavLink>
                </li>
              )}
              {userRole === 'admin' && (
                <li>
                  <NavLink to="/dashboard/admin" className={navLinkClass} aria-label="Admin Dashboard">
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
            </>
          )}


          {user ? (
            <>
              {/* Profile Picture with Tooltip */}
              <li className="relative group">
                <img
                  className="w-10 h-10 rounded-full border-2 border-amber-500 object-cover cursor-pointer"
                  src={user.photoURL}
                  alt="User profile"
                  aria-label="User profile"
                />
                <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 -mb-2 bg-amber-600 text-white px-3 py-1 rounded shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  {user.displayName}
                </div>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition cursor-pointer"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/signin"
                className="bg-amber-600 text-white px-5 py-2 rounded hover:bg-amber-700 transition"
                aria-label="Sign in"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden cursor-pointer text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="
        md:hidden 
        absolute top-full inset-x-0    /* position right below the nav */
        flex flex-col gap-4 px-6 py-4 
        text-black font-medium text-lg
        bg-white
      "
          >
            {user && (
              <li className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full border-2 border-amber-500 object-cover"
                  src={user.photoURL}
                  alt="User profile"
                />
                <span>{user.displayName}</span>
              </li>
            )}
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/all-scholarships" className={navLinkClass}>All Scholarships</NavLink></li>
            {userRole === 'user' && (
              <li><NavLink to="/dashboard/user" className={navLinkClass}>User Dashboard</NavLink></li>
            )}
            {userRole === 'moderator' && (
              <li><NavLink to="/dashboard/moderator" className={navLinkClass}>Moderator Dashboard</NavLink></li>
            )}
            {userRole === 'admin' && (
              <li><NavLink to="/dashboard/admin" className={navLinkClass}>Admin Dashboard</NavLink></li>
            )}
            {user ? (
              <li>
                <button
                  onClick={handleSignOut}
                  className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                >
                  Sign Out
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/signin"
                  className="bg-amber-600 text-white px-5 py-2 rounded hover:bg-amber-700 transition"
                >
                  Sign In
                </Link>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;