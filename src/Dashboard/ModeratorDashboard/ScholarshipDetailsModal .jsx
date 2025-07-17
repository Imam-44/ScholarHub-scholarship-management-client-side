// src/components/ModeratorDashboard/ScholarshipDetailsModal.jsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ScholarshipDetailsModal = ({ scholarship, onClose }) => {
  if (!scholarship) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-xl w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center mb-4 text-red-700">
          🎓 {scholarship.scholarshipName}
        </h2>
        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>University:</strong> {scholarship.universityName}</p>
          <p><strong>Category:</strong> {scholarship.subjectCategory}</p>
          <p><strong>Degree:</strong> {scholarship.degree}</p>
          <p><strong>Fees:</strong> ${scholarship.applicationFees}</p>
          <p><strong>Location:</strong> {scholarship.location || 'N/A'}</p>
          <p><strong>Deadline:</strong> {scholarship.applicationDeadline || 'N/A'}</p>
          <p><strong>Description:</strong> {scholarship.description || 'No description provided.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailsModal;
