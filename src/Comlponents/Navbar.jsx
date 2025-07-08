import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {user} = useAuth()

  const navLinkClass = ({ isActive }) => 
    isActive
    ? 'text-amber-600 border-b-4 border-amber-600 pb-1 font-semibold text-lg'
    : ''
  

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="w-11/12 max-w-screen-2xl mx-auto flex justify-between  items-center">
        {/* Logo */}
        <Link to="/" className="text-4xl font-bold text-amber-600">🎓ScholarX</Link>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex items-center gap-6 text-gray-700 font-medium text-lg">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/all-scholarship" className={navLinkClass}>All Scholarship</NavLink></li>
          <li><NavLink to="/user-dashboard" className={navLinkClass}>User Dashboard</NavLink></li>
          <li><NavLink to="/admin-dashboard" className={navLinkClass}>Admin Dashboard</NavLink></li>

          <li className=''>
            <Link
              to="/signin"
              className="bg-amber-600 text-white px-5 py-2 rounded hover:bg-amber-800 transition"
            >
              Sign In
            </Link>
          </li>
         
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="xl:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden flex flex-col gap-4 px-6 pt-4 pb-6 bg-gray-100 text-gray-800 font-medium"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all-scholarship">All Scholarship</Link></li>
            <li><Link to="/user-dashboard">User Dashboard</Link></li>
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>

            <li>
              <Link
                to="/signin"
                className="bg-amber-600 text-white px-10 py-2 rounded hover:bg-amber-800 transition"
              >
                Sign In
              </Link>
            </li>
            
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
