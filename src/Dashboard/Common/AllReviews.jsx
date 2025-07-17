import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); 
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get('/reviews')
      .then(res => {
        setReviews(res.data);
        setLoading(false); 
      })
      .catch(err => {
        console.error('Failed to fetch reviews:', err);
        setLoading(false);
      });
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b91c1c',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/admin/${id}`).then(() => {
          setReviews(prev => prev.filter(review => review._id !== id));
          Swal.fire('Deleted!', 'Review has been removed.', 'success');
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-950">🗂️ All Reviews</h2>

      {loading ? (
        <p className="text-center text-lg text-gray-700 font-medium py-10">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all duration-200"
            >
              <div className="mb-3">
                <h3 className="text-lg font-bold text-red-950">{review.universityName}</h3>
                <p className="text-sm text-gray-600">🎓 {review.subjectCategory}</p>
              </div>

              <div className="flex items-center gap-3 my-4">
                <img
                  src={review.reviewerImage || '/default-avatar.png'}
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-semibold text-red-950">{review.reviewerName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-yellow-600 font-semibold">⭐ Rating: {review.rating}</p>
                <p className="text-sm mt-2 text-gray-700">💬 {review.comment}</p>
              </div>

              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 bg-red-950 hover:bg-red-800 text-white py-1 px-4 rounded text-sm font-semibold transition-all"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
