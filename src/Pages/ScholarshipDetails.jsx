import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewSlider from '../Components/ReviewSlider';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/scholarship/${id}`)
      .then(res => setScholarship(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!scholarship) return <p className="text-center mt-20 text-lg">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl hover:shadow-amber-600/60 overflow-hidden grid md:grid-cols-3 gap-8 p-6 md:p-10">
        {/* Left: University Logo */}
        <div className="flex justify-center items-start md:items-center">
          <img
            src={scholarship.universityLogo}
            alt="University"
            className="w-full h-[400px] object-cover bg-gray-100 rounded-lg shadow-sm p-3"
          />
        </div>

        {/* Right: Scholarship Details */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-3xl font-bold text-red-800">{scholarship.scholarshipName}</h2>
          <p className="text-gray-700 font-medium">
            {scholarship.universityName} — {scholarship.universityCity}, {scholarship.universityCountry}
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>🎓 <strong>Degree:</strong> {scholarship.degree}</p>
            <p>📂 <strong>Category:</strong> {scholarship.subjectCategory}</p>
            <p>📅 <strong>Deadline:</strong> {scholarship.applicationDeadline}</p>
            <p>📆 <strong>Posted:</strong> {scholarship.postDate}</p>
          </div>
          <div className="text-sm text-gray-700 space-y-1 pt-2">
          
            <p><strong>Stipend:</strong> {scholarship.stipend || 'Not specified'}</p>
            <p><strong>Application Fee:</strong> ${scholarship.applicationFees}</p>
            <p><strong>Service Charge:</strong> ${scholarship.serviceCharge || '0'}</p>
              <p><strong>Description:</strong> {scholarship.description}</p>
          </div>

          <button className="mt-4 inline-block bg-gradient-to-r from-amber-500 to-amber-700 text-white px-6 py-2 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer">
            Apply for Scholarship
          </button>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-14">
        <h3 className="text-2xl font-semibold mb-4">📢 Student Reviews</h3>
        <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
          <ReviewSlider scholarshipId={id} />
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
