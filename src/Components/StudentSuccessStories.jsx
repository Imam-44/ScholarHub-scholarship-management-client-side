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
    <div className="bg-gradient-to-br from-red-900 via-red-950 to-black py-16 px-6 md:px-12 my-16 rounded-3xl shadow-2xl">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
          <FaUserGraduate className="text-amber-400" size={30} />
          Successful Students
        </h2>
        <p className="text-amber-100 mt-3 max-w-2xl mx-auto text-lg">
          Real stories from students who achieved their scholarship goals through our platform.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {successStories.map((student, idx) => (
          <div
            key={idx}
            className="bg-black/20 backdrop-blur-md border border-red-800 rounded-2xl shadow-md hover:shadow-amber-500/30 transition duration-300 p-6 text-center hover:scale-[1.02]"
          >
            <img
              src={student.image}
              alt={student.university}
              className="w-24 h-24 object-contain mx-auto mb-4 bg-white p-2 rounded-xl shadow-md"
            />
            <p className="italic text-amber-100 mb-4 text-sm">"{student.quote}"</p>
            <h3 className="font-bold text-lg text-amber-400">{student.name}</h3>
            <p className="text-sm text-amber-200">
              {student.university}, {student.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSuccessStories;
