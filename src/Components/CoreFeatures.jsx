// src/components/CoreFeatures.jsx
import React from 'react';
import { MdOutlineVerified, MdSearch, MdPayment, MdSupportAgent } from 'react-icons/md';

const features = [
  {
    icon: <MdOutlineVerified size={40} className="text-red-900" />,
    title: 'Verified Scholarships',
    description: 'All scholarships are checked and verified for authenticity and updated regularly.',
  },
  {
    icon: <MdSearch size={40} className="text-red-900" />,
    title: 'Advanced Search',
    description: 'Easily search scholarships by degree, university, or keywords with our smart filters.',
  },
  {
    icon: <MdPayment size={40} className="text-red-900" />,
    title: 'Secure Payments',
    description: 'Application fee payments are handled securely with integrated payment gateways.',
  },
  {
    icon: <MdSupportAgent size={40} className="text-red-900" />,
    title: 'Expert Support',
    description: 'Our team provides support and guidance for every step of the application process.',
  },
];

const CoreFeatures = () => {
  return (
    <div className="bg-gradient-to-br from-red-900 via-red-950 to-black py-16 px-6 md:px-12 my-12 rounded-2xl shadow-md">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-2">Our Core Features</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Explore key features designed to simplify your scholarship journey — from trusted listings to secure payments and expert support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="text-center bg-amber-50 hover:shadow-amber-300 rounded-xl p-6 shadow-sm transition"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-black">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreFeatures;
