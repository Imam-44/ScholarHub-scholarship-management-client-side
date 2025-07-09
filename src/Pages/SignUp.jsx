import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const SignUp = () => {
  const { createUser, setUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;

    try {
      const result = await createUser(email, password);
      const createdUser = result.user;

      await updateProfile(createdUser, {
        displayName: name,
        photoURL: photoUrl,
      });

      setUser({ ...createdUser, displayName: name, photoURL: photoUrl });

      Swal.fire({
        icon: 'success',
        title: 'Your account created successfully',
        showConfirmButton: false,
        timer: 1000,
      });

      navigate('/');
    } catch (error) {
      console.error('Registration Error:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8e1] via-[#ffecb3] to-[#ffd54f] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-amber-600">Sign Up</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-amber-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border border-amber-500 shadow-md px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-amber-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-amber-500 shadow-md px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-amber-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-amber-500 shadow-md px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1 font-medium text-amber-700">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              placeholder="Enter your photo URL"
              className="w-full border border-amber-500 shadow-md px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md shadow-lg transition cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?
          <Link to="/sign-in" className="text-amber-600 font-semibold ml-1 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
