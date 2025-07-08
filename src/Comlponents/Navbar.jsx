import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="w-11/12 max-w-screen-2xl mx-auto flex justify-between  items-center">
        {/* Logo */}
        <Link to="/" className="text-4xl font-bold text-amber-600">🎓ScholarX</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium text-lg">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-scholarship">All Scholarship</Link></li>
          <li><Link to="/user-dashboard">User Dashboard</Link></li>
          <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>

          <li className='ml-0 md:ml-10'>
            <Link
              to="/signin"
              className="bg-amber-600 text-white px-5 py-2 rounded hover:bg-amber-800 transition"
            >
              Sign In
            </Link>
          </li>
         
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
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
            className="md:hidden flex flex-col gap-4 px-6 pt-4 pb-6 bg-gray-100 text-gray-800 font-medium"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all-scholarship">All Scholarship</Link></li>
            <li><Link to="/user-dashboard">User Dashboard</Link></li>
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>

            <li>
              <Link
                to="/signin"
                className="bg-red-950 text-white px-10 py-2 rounded hover:bg-red-800 transition"
              >
                Login
              </Link>
            </li>
            
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
