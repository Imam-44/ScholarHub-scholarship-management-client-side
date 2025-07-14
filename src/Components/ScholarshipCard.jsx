import React from 'react';
import { Link } from 'react-router-dom';

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="bg-red-950 text-white rounded-2xl shadow-lg hover:shadow-red-950/70 transition duration-300 p-6 border border-red-900">
      <div className="flex justify-center mb-4">
        <img
          src={scholarship.universityLogo}
          alt="University Logo"
          className="h-400px w-auto object-cover rounded-md bg-amber-600 p-2"
        />
      </div>

      <h3 className="text-xl font-semibold text-center">{scholarship.scholarshipName}</h3>
      <p className="text-center text-amber-100 mb-1">
        {scholarship.universityName}, {scholarship.universityCity}
      </p>
      <p className="text-sm text-center text-amber-200">
        {scholarship.degree} • {scholarship.subjectCategory}
      </p>
      <p className="text-sm text-center text-amber-300">{scholarship.category}</p>
      <p className="text-sm text-center text-yellow-400">Rating: {scholarship.rating} / 5</p>

      <div className="mt-4 text-center space-y-1 text-sm">
        <p>
          <span className="font-semibold">Stipend:</span> {scholarship.stipend}
        </p>
        <p>
          <span className="font-semibold">App. Fee:</span> ${scholarship.applicationFees}
        </p>
        <p>
          <span className="font-semibold">Deadline:</span> {scholarship.applicationDeadline}
        </p>
      </div>

      <div className="text-center mt-4">
        <Link to={`/scholarship/${scholarship._id}`}>
          <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
