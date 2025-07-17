// src/pages/MyProfile.jsx

import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth();

  const cards = [
    {
      icon: <FaEnvelope className="text-xl text-red-950" />,
      label: ' Email',
      value: user?.email,
    },
    {
      icon: <FaPhone className="text-xl text-red-950" />,
      label: ' Phone',
      value: '+8801234567890',
    },
    {
      icon: <FaMapMarkerAlt className="text-xl text-red-950" />,
      label: ' Address',
      value: 'Dhaka, Bangladesh',
    },
    {
      icon: <FaCalendarAlt className="text-xl text-red-950" />,
      label: ' Joined',
      value: new Date(user?.createdAt || Date.now()).toLocaleDateString(),
    },
  ];

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Profile Card */}
      <div className="bg-white shadow-xl rounded-3xl p-6 mb-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.photoURL || 'https://i.ibb.co/YRQM6nd/default-user.png'}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-red-950 shadow"
        />
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">{user?.displayName || 'User Name'}</h2>

          {user?.role && user.role !== 'user' && (
            <span className="inline-flex items-center gap-2 text-sm bg-amber-100 text-amber-600 px-4 py-1 rounded-full font-medium">
              <FaShieldAlt className="text-amber-600" /> Role: {user.role}
            </span>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 flex items-start gap-4 border-l-4 border-red-950"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            {card.icon}
            <div>
              <h4 className="text-gray-600 font-semibold mb-1">{card.label}</h4>
              <p className="text-gray-800">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyProfile;
