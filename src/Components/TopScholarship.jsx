import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdSchool } from 'react-icons/md';

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/top-scholarship`)
      .then(res => setScholarships(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <div className="text-center max-w-3xl mx-auto my-20">
        <h2 className="text-4xl font-bold text-black mb-2"><MdSchool className="inline text-black mr-2" size={40} /> Top Scholarships for You</h2>
        <p className="text-gray-700/90 text-md">
          Discover the best hand-picked scholarships offering great value — low application fees and freshly posted opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map(sch => (
          <div
            key={sch._id}
            className="bg-red-950 text-white rounded-2xl shadow-lg hover:shadow-red-950/70 transition duration-300 p-6 border border-red-900"
          >
            <div className="flex justify-center mb-4">
              <img
                src={sch.universityLogo}
                alt="University Logo"
                className="h-400px w-auto object-cover rounded-md bg-amber-600 p-2"
              />
            </div>

            <h3 className="text-xl font-semibold text-center">{sch.scholarshipName}</h3>
            <p className="text-center text-amber-100 mb-1">{sch.universityName}, {sch.universityCity}</p>
            <p className="text-sm text-center text-amber-200">{sch.degree} • {sch.subjectCategory}</p>

            <div className="mt-4 text-center space-y-1 text-sm">
              <p><span className="font-semibold">Stipend:</span> {sch.stipend}</p>
              <p><span className="font-semibold">App. Fee:</span> ${sch.applicationFees}</p>
              <p><span className="font-semibold">Deadline:</span> {sch.applicationDeadline}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/all-scholarship">
          <button className="px-6 py-4 bg-red-950/90 text-white font-semibold rounded-lg hover:bg-amber-900 transition cursor-pointer">
            View All Scholarships
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopScholarships;
