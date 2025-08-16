import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';

const successStories = [
  {
    name: 'Fatima Rahman',
    country: 'Bangladesh',
    university: 'Harvard University',
    quote: 'ScholarHub helped me get a full scholarship at my dream university with proper guidance.',
    image: 'https://i.ibb.co/RTJhLZ6v/premium-photo-1661694306340-c816559efc7a.jpg',
  },
  {
    name: 'Tanvir Ahmed',
    country: 'Bangladesh',
    university: 'University of Oxford',
    quote: 'I received an offer easily through this platform with a smooth application process.',
    image: 'https://i.ibb.co/HfGMWmwk/premium-photo-1658506724186-63a705425f89.jpg',
  },
  {
    name: 'Raisa Chowdhury',
    country: 'Bangladesh',
    university: 'University of Tokyo',
    quote: 'The reviews and information here guided me to make the right decision.',
    image: 'https://i.ibb.co/wrZGfsTY/photo-1590070572368-74a1e6da0a34.jpg',
  },
];

const StudentSuccessStories = () => {
  return (
    <div id="student-success" className="bg-gradient-to-br from-red-900 via-red-950 to-black py-16 px-6 md:px-12 my-16 rounded-3xl shadow-2xl">
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
              className="w-30 h-30 object-cover mx-auto mb-4 bg-amber-600 p-0.5 rounded-xl shadow-md"
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
