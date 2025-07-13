// src/components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-t-amber-500 border-r-transparent border-b-amber-500 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-t-red-600 border-r-transparent border-b-red-600 border-l-transparent rounded-full animate-spin [animation-duration:2s]"></div>
        <div className="absolute inset-8 border-4 border-t-white border-r-transparent border-b-white border-l-transparent rounded-full animate-spin [animation-duration:3s]"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
