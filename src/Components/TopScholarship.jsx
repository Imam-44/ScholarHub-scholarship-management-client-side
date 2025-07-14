import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdSchool } from 'react-icons/md';
import ScholarshipCard from './ScholarshipCard';

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
        {scholarships.map(scholarship => (
           <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
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
