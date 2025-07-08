import React from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { BsImageFill } from 'react-icons/bs';
import { Link } from 'react-router';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300/60 via-amber-500 to-yellow-700 px-4">
      <div className="bg-white/90 shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-amber-600 mb-1 text-center">Create an Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Sign up to get started</p>

        <form className="space-y-5">
          {/* Name */}
          <div className="flex items-center border border-amber-300/60 rounded-full h-12 px-4 gap-2">
            <FaUser className="text-amber-600 text-lg" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none bg-transparent placeholder-gray-500 text-sm"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-amber-300/60 rounded-full h-12 px-4 gap-2">
            <MdEmail className="text-amber-600 text-lg" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full outline-none bg-transparent placeholder-gray-500 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-amber-300/60 rounded-full h-12 px-4 gap-2">
            <RiLockPasswordLine className="text-amber-600 text-lg" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent placeholder-gray-500 text-sm"
              required
            />
          </div>

          {/* User Image Upload */}
          <div className="flex items-center border border-amber-300/60 rounded-full h-12 px-4 gap-2 cursor-pointer">
            <BsImageFill className="text-amber-600 text-lg" />
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:hidden"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-11 rounded-full text-white bg-amber-600 hover:opacity-90 transition-opacity font-medium"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to={'/signin'}
            className="text-amber-600 hover:underline">Sign In here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
