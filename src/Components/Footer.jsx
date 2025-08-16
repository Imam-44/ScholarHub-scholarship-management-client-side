import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300 bg-gradient-to-br from-black via-red-950 to-black">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
        {/* Left side: logo & description */}
        <div className="md:max-w-96">
          <div className='flex gap-1 items-center'>
            <img src="../logo3.png" alt="" className='w-12 h-12'/>
            <h1 className="text-4xl text-white font-bold">ScholarHub</h1>
          </div>
          <p className="mt-6 text-sm">
            ScholarHub helps students explore scholarships, apply with ease, and achieve their study goals worldwide.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
              <FaLinkedinIn />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right side: unique menu */}
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Resources</h2>
            <ul className="text-sm space-y-2">
              <li><Link to="/all-scholarships">All-scholarship</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/webinars">Webinars</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5">Support</h2>
            <div className="text-sm space-y-2">
              <p>+880-1234-567890</p>
              <p>support@scholarhub.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <p className="pt-4 text-center text-sm pb-5">
        © {new Date().getFullYear()} ScholarHub. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
