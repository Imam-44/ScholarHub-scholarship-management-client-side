import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white bg-gradient-to-br from-red-950 via-amber-900 to-amber-700 px-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-9xl font-extrabold mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-center"
      >
        Page Not Found
      </motion.p>

      <p className="text-gray-300 mt-4 text-center max-w-xl">
        The scholarship page you are looking for doesn’t exist or has been removed.
      </p>

      <Link to="/" className="mt-8">
        <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 cursor-pointer px-6 rounded-lg shadow hover:shadow-lg transition duration-300">
          Go to Homepage
        </button>
      </Link>

      <img
        src="https://i.ibb.co/xKJ4qJb0/premium-photo-1682310096066-20c267e20605.jpg"
        alt="Scholarship Not Found"
        className="w-80 mt-10 rounded-2xl"
      />
    </div>
  );
};

export default NotFound;
