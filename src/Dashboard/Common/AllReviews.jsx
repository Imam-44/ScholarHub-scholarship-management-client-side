import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get('/reviews') // Ensure this route returns all reviews
      .then(res => setReviews(res.data))
      .catch(err => {
        console.error(err);
        Swal.fire('Error', 'Failed to load reviews', 'error');
      });
  }, [axiosSecure]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`)
          .then(() => {
            setReviews(prev => prev.filter(r => r._id !== id));
            Swal.fire('Deleted!', 'Review has been deleted.', 'success');
          })
          .catch(() => Swal.fire('Error', 'Failed to delete review', 'error'));
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">📝 All Reviews</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div key={review._id} className="bg-white shadow-lg rounded-lg p-5 border relative">
            <div className="mb-2">
              <h3 className="text-xl font-semibold text-indigo-800">{review.universityName}</h3>
              <p className="text-sm text-gray-500">{review.subjectCategory || 'N/A'}</p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <img src={review.reviewerImage} alt="Reviewer" className="w-10 h-10 rounded-full border" />
              <div>
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-3 text-sm">
              <p className="text-yellow-600 font-semibold">⭐ Rating: {review.rating}/5</p>
              <p className="mt-2 text-gray-700 italic">"{review.reviewText}"</p>
            </div>
            <button
              onClick={() => handleDelete(review._id)}
              className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              title="Delete Review"
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
