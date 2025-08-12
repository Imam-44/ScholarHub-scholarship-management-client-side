import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import useAxiosSecure from '../hooks/useAxiosSecure';

// Star rating component for visual
const StarRating = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 inline-block ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.975c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.285-3.975a1 1 0 00-.364-1.118L2.04 9.402c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.975z" />
      </svg>
    ));
  return <div>{stars}</div>;
};

const ScholarshipDetails = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/scholarship/${id}`)
      .then(res => setScholarship(res.data))
    

    // Fetch reviews for this scholarship
    axiosSecure
      .get(`/api/reviews?scholarshipId=${id}`)
      .then(res => setReviews(res.data))
      .catch();
  }, [id]);

  const handleApplyClick = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/apply-scholarship/check`, {
        params: { email: user.email, scholarshipId: scholarship._id }
      });

      if (res.data.alreadyApplied) {
        return Swal.fire({
          icon: 'info',
          title: 'Already Applied',
          text: 'You have already applied for this scholarship.',
        });
      }

      navigate(`/checkout/${scholarship._id}`);
    } catch (error) {
    
      Swal.fire('Error', 'Failed to check application status.', error);
    }
  };

  if (!scholarship) return <p className="text-center mt-20 text-lg">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl hover:shadow-amber-600/60 overflow-hidden grid md:grid-cols-3 gap-8 p-6 md:p-10">
        <div className="flex justify-center items-start md:items-center">
          <img
            src={scholarship.universityImage}
            alt="University"
            className="w-full h-[400px] object-cover bg-gray-100 rounded-lg shadow-sm p-3"
          />
        </div>

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

          <button
            onClick={handleApplyClick}
            className="mt-4 inline-block bg-gradient-to-r from-amber-500 to-amber-700 hover:from-red-950 hover:to-red-900 text-white px-6 py-2 rounded-xl shadow hover:shadow-lg shadow-red-950 transition duration-300 cursor-pointer"
          >
            Apply for Scholarship
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-16">
        <h3 className="text-2xl font-semibold mb-6 text-rose-700 text-center">🎖️ Reviews</h3>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet for this scholarship.</p>
        ) : (
          <Swiper
            modules={[ Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="reviews-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.reviewerImage || 'https://i.ibb.co/37b3WQC/default-user.png'}
                      alt={review.reviewerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-rose-600"
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-rose-700">{review.reviewerName}</h4>
                      <p className="text-gray-500 text-sm">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <StarRating rating={parseInt(review.rating)} />
                  <p className="mt-3 text-gray-700 flex-grow">{review.comment}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </div>
  );
};

export default ScholarshipDetails;
