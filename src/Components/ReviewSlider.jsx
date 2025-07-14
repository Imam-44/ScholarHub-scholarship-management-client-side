import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ReviewSlider = ({ scholarshipId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/reviews/${scholarshipId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [scholarshipId]);

  if (reviews.length === 0) return <p className="text-gray-500">No reviews available yet.</p>;

  return (
    <Carousel showThumbs={false} infiniteLoop autoPlay showStatus={false}>
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-white rounded-xl p-6 shadow-md text-center">
          <img
            src={review.reviewerImage}
            alt="Reviewer"
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
          <h4 className="text-lg font-semibold">{review.reviewerName}</h4>
          <p className="text-sm text-gray-600">{review.date}</p>
          <p className="text-yellow-500 text-lg font-bold mt-2">⭐ {review.rating}/5</p>
          <p className="mt-2 italic text-gray-700">"{review.comment}"</p>
        </div>
      ))}
    </Carousel>
  );
};

export default ReviewSlider;
