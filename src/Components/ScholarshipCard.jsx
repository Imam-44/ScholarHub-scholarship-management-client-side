import React from 'react';
import { Link } from 'react-router-dom';

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="bg-gradient-to-br from-red-900 via-red-950 to-black text-white rounded-2xl shadow-xl hover:shadow-amber-500/50 transition duration-300 p-6  border border-red-800">
      {/* University Logo */}
      <div className="flex justify-center mb-4">
        <div className="w-full h-[250px]  rounded-xl shadow-lg border-2 border-amber-500">
          <img
            src={scholarship.universityLogo}
            alt="University Logo"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Scholarship Title */}
      <h3 className="text-xl font-bold text-center text-amber-400 mb-2">
        {scholarship.scholarshipName}
      </h3>

      {/* University Info */}
      <p className="text-center text-sm text-amber-100 mb-1">
        🎓 {scholarship.universityName}, {scholarship.universityCity}, {scholarship.universityCountry}
      </p>

      {/* Degree & Subject */}
      <p className="text-sm text-center text-amber-200 mb-1">
        🎯 {scholarship.degree} • {scholarship.subjectCategory}
      </p>

      {/* Category & Rating */}
      <div className="text-sm text-center text-yellow-400 mb-3 space-x-2">
        <p>📂scholarship Category: {scholarship.scholarshipCategory}</p>
        <p>⭐ Rating: {scholarship.rating || 'N/A'} / 5</p>
      </div>

      {/* Fees & Deadline */}
      <div className="bg-black/10 p-4 rounded-xl space-y-1 text-sm text-amber-100 border border-red-800">
        <p><strong>💰 Stipend:</strong> {scholarship.stipend || 'Not mentioned'}</p>
        <p><strong>📥 App Fee:</strong> ${scholarship.applicationFees || 0}</p>
        <p><strong>⏳ Deadline:</strong> {scholarship.applicationDeadline}</p>
      </div>

      {/* View Details Button */}
      <div className="text-center mt-5">
        <Link to={`/scholarship/${scholarship._id}`}>
          <button className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-red-800 text-white rounded-xl shadow-lg hover:shadow-red-500/60 transition duration-300 cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
