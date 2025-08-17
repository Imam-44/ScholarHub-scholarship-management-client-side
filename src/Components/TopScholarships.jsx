import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdSchool } from 'react-icons/md';
import ScholarshipCard from './ScholarshipCard';
import LoadingSpinner from './LoadingSpinnerSecond';

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchTopScholarships = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/top-scholarship`);

        
        const scholarshipsWithRatings = await Promise.all(
          res.data.map(async (scholarship) => {
            try {
              const ratingRes = await axios.get(
                `${import.meta.env.VITE_API_URL}/reviews/average/${scholarship._id}`
              );
              return { ...scholarship, rating: ratingRes.data.average };
            } catch {
              return { ...scholarship, rating: null };
            }
          })
        );

        setScholarships(scholarshipsWithRatings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopScholarships();
  }, []);



  console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }


  return (
    <div className="max-w-9xl mx-auto my-12 px-4">
      <div className="text-center max-w-3xl mx-auto my-20">
        <h2 className="text-4xl font-bold text-base-content   mb-2">
          <MdSchool className="inline text-amber-400 mr-2" size={40} />  Top Scholarships for You
        </h2>
        <p className="text-base-content/70 text-md">
          Discover the best hand-picked scholarships offering great value — low application fees and freshly posted opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map(scholarship => (
          <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/all-scholarships">
          <button className="px-6 py-4 bg-gradient-to-r from-amber-600 to-red-900 hover:from-red-950 hover:to-red-900 shadow hover:shadow-lg shadow-red-950 transition duration-300 cursor-pointer text-white font-semibold rounded-lg">
            View All Scholarships
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopScholarships;
