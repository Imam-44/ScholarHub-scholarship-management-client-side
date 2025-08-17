import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FiMoon, FiSun } from 'react-icons/fi';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/role/${user.email}`)
        .then((res) => setUserRole(res.data.role))
        .catch((error) => console.error('Error fetching user role:', error));
    }
  }, [user, axiosSecure]);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-amber-400 border-b-4 border-amber-400 pb-1 font-semibold text-lg'
      : 'hover:text-amber-500 transition';

  const handleSignOut = async () => {
    try {
      await signOutUser();
      await axiosSecure.get('/logout');
      Swal.fire('Success', 'Logged out successfully', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to log out', 'error');
    }
  };

  return (
    <nav
      className="bg-gradient-to-br from-black via-amber-950 to-black shadow-md px-6 py-4 relative z-50 sticky top-0"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="w-11/12 max-w-screen-2xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <img src="/logo3.png" alt="logo" className="w-12 h-12" />
          <Link to="/" className="text-4xl font-bold text-white" aria-label="ScholarHub Home">
            ScholarHub
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-white font-medium text-lg">
          <li>
            <NavLink to="/" className={navLinkClass} aria-label="Home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-scholarships" className={navLinkClass} aria-label="All Scholarships">
              All Scholarships
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" className={navLinkClass} aria-label="FAQ">
              FAQ
            </NavLink>
          </li>

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
                  className="w-10 h-10 rounded-full border-2 border-amber-400 object-cover cursor-pointer"
                  src={user.photoURL}
                  alt="User profile"
                  aria-label="User profile"
                />
                <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 -mb-2 bg-amber-400 text-white px-3 py-1 rounded shadow-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  {user.displayName}
                </div>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition cursor-pointer"
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </li>
              {/* Theme Toggle - Desktop */}
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" className="theme-controller" value="dark" />

                {/* sun icon */}
                <svg
                  className="swap-off h-10 w-10 fill-current text-amber-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-10 w-10 fill-current text-amber-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
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
        <button
          className="md:hidden cursor-pointer text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
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
      className="md:hidden absolute top-full inset-x-0 flex flex-col gap-4 px-6 py-4 text-black font-medium text-lg bg-white"
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
      <li>
        <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarships" className={navLinkClass} onClick={() => setIsOpen(false)}>
          All Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink to="/faq" className={navLinkClass} onClick={() => setIsOpen(false)}>
          FAQ
        </NavLink>
      </li>

      {userRole === 'user' && (
        <li>
          <NavLink to="/dashboard/user" className={navLinkClass} onClick={() => setIsOpen(false)}>
            User Dashboard
          </NavLink>
        </li>
      )}
      {userRole === 'moderator' && (
        <li>
          <NavLink to="/dashboard/moderator" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Moderator Dashboard
          </NavLink>
        </li>
      )}
      {userRole === 'admin' && (
        <li>
          <NavLink to="/dashboard/admin" className={navLinkClass} onClick={() => setIsOpen(false)}>
            Admin Dashboard
          </NavLink>
        </li>
      )}

      {user ? (
        <>
          <li>
            <button
              onClick={() => {
                handleSignOut();
                setIsOpen(false); // logout এ ক্লিক করলে menu বন্ধ
              }}
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
            >
              Sign Out
            </button>
          </li>
          {/* Theme Toggle - Mobile */}
          <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="dark" />
            {/* icons as before */}
          </label>
        </>
      ) : (
        <li>
          <Link
            to="/signin"
            className="bg-amber-600 text-white px-5 py-2 rounded hover:bg-amber-700 transition"
            onClick={() => setIsOpen(false)}
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