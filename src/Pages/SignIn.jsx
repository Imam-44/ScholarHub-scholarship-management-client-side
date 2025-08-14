import React from 'react';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { FaGoogle } from 'react-icons/fa'
import axios from 'axios';

const SignIn = () => {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const user = result.user;
      console.log("Firebase User:", result.user);
      // Server এ JWT generate
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: user.email });
      console.log("JWT Response:", data);

      // ✅ এখানে localStorage এ রাখবে
      localStorage.setItem('access-token', data.accessToken);
      localStorage.setItem('refresh-token', data.refreshToken);

      navigate('/');
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire('Error', 'Login failed', 'error');
    }
  };


  const handleGoogleSignIn = async () => {

    try {
      const result = await signInWithGoogle()
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: result.user.email });
      localStorage.setItem('access-token', data.accessToken);
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (err) {
      if (err) {
        toast.error(err.message)
      }
    }
  }
  return (
    <div className="bg-gradient-to-r from-amber-300 via-yellow-150 to-amber-900 min-h-screen flex items-center justify-center">
      <div className="w-11/12 max-w-screen-2xl mx-auto flex h-[700px] my-5 rounded-xl shadow-lg overflow-hidden bg-white/90">

        {/* Left Image */}
        <div className="w-full hidden md:inline-block">
          <img
            className="h-full w-full object-cover"
            src="https://i.ibb.co/jZMh3rfk/elegant-touching-reading-concentrated-sophisticated-optimized-400.jpg"
            alt="leftSideImage"
          />
        </div>

        {/* Right Form */}
        <div className="w-full flex flex-col items-center justify-center px-4">
          <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-amber-600 font-medium">Sign in</h2>
            <p className="text-sm text-amber-500/90 mt-3">
              Welcome back! Please sign in to continue
            </p>

            <button onClick={handleGoogleSignIn}
              type="button"
              className="w-full mt-8 bg-amber-500/10 flex items-center justify-center h-12 rounded-full cursor-pointer"
            > <FaGoogle className="text-amber-600" />
              <h2 className='ml-1'>Login With Google</h2>
            </button>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90"></div>
              <p className="w-full text-nowrap text-sm text-amber-500/90">
                or sign in with email
              </p>
              <div className="w-full h-px bg-amber-300/90"></div>
            </div>

            {/* Email Input */}
            <div className="flex items-center w-full bg-transparent border border-amber-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <MdEmail className="text-xl text-red-900" />
              <input
                type="email"
                name='email'
                placeholder="Email id"
                className="bg-transparent text-black placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center mt-6 w-full bg-transparent border border-amber-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <RiLockPasswordLine className="text-xl text-red-900" />
              <input
                type="password"
                name='password'
                placeholder="Password"
                className="bg-transparent text-black placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Remember & Forgot */}
            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
              <div className="flex items-center gap-2">
                <input className="h-5" type="checkbox" id="checkbox" />
                <label className="text-sm" htmlFor="checkbox">
                  Remember me
                </label>
              </div>
              <a className="text-sm underline" href="#">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-8 w-full h-11 rounded-full text-white bg-amber-600 hover:opacity-90 transition-opacity cursor-pointer"
            >
              Login
            </button>
            <p className="text-gray-500/90 text-sm mt-4">
              Don’t have an account?{" "}
              <Link to={'/signup'} className="text-amber-600 hover:underline" >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
