// src/components/StudentSuccessStories.jsx
import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';

const successStories = [
  {
    name: 'Fatima Rahman',
    country: 'Bangladesh',
    university: 'Harvard University',
    quote: 'ScholarHub helped me get a full scholarship at my dream university with proper guidance.',
    image: 'https://i.ibb.co/7gH2ZYC/harvard-logo.png',
  },
  {
    name: 'Tanvir Ahmed',
    country: 'Bangladesh',
    university: 'University of Oxford',
    quote: 'I received an offer easily through this platform with a smooth application process.',
    image: 'https://upload.wikimedia.org/wikipedia/en/e/ee/Oxford_University_Circlet.svg',
  },
  {
    name: 'Raisa Chowdhury',
    country: 'Bangladesh',
    university: 'University of Tokyo',
    quote: 'The reviews and information here guided me to make the right decision.',
    image: 'https://upload.wikimedia.org/wikipedia/en/8/8e/University_of_Tokyo_Logo.svg',
  },
];

const StudentSuccessStories = () => {
  return (
    <div className="bg-amber-50 py-16 px-6 md:px-12 my-12 rounded-2xl shadow-inner">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-black flex items-center justify-center gap-2">
          <FaUserGraduate className="text-black" size={28} />
          Successful Students
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Real success stories from students who secured scholarships through our platform and fulfilled their academic dreams abroad.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {successStories.map((student, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-amber-400 transition duration-300 text-center"
          >
            <img
              src={student.image}
              alt={student.university}
              className="w-20 h-20 object-contain mx-auto mb-4"
            />
            <p className="italic text-gray-700 mb-4">"{student.quote}"</p>
            <h3 className="font-bold text-lg text-red-800">{student.name}</h3>
            <p className="text-sm text-gray-500">{student.university}, {student.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSuccessStories;
