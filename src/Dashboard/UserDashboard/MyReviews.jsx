import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ loading state
  const [editingReview, setEditingReview] = useState(null);
  const [editData, setEditData] = useState({});


  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/my-reviews/${user.email}`)
        .then(res => {
          setReviews(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user, axiosSecure]);


  if (loading) {
    return <p className='text-center'>Loading your review...</p>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this review.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b91c1c',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then(() => {
          setReviews(reviews.filter(review => review._id !== id));
          Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
        });
      }
    });
  };

  const handleEditClick = (review) => {
    setEditingReview(review);
    setEditData({ ...review });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { rating, comment } = editData;
    const updated = {
      rating,
      comment,
      date: new Date().toISOString(),
    };

    axiosSecure.patch(`/reviews/${editingReview._id}`, updated)
      .then(() => {
        setReviews(prev =>
          prev.map(r => (r._id === editingReview._id ? { ...r, ...updated } : r))
        );
        Swal.fire('Success!', 'Review updated successfully.', 'success');
        setEditingReview(null);
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-950">📝 My Reviews</h2>

      {loading ? (
        <div className="text-center text-gray-500 py-10">
          <span className="loading loading-spinner loading-lg text-amber-500"></span>
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white shadow rounded-lg text-sm">
            <thead className="bg-gradient-to-r from-amber-400 to-amber-300 text-red-950">
              <tr>
                <th className="py-3 px-5 text-left">Scholarship</th>
                <th className="py-3 px-5 text-left">University</th>
                <th className="py-3 px-5 text-left">Comment</th>
                <th className="py-3 px-5 text-left">Date</th>
                <th className="py-3 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, idx) => (
                <tr key={review._id} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-5">{review.scholarshipName}</td>
                  <td className="py-3 px-5">{review.universityName}</td>
                  <td className="py-3 px-5 break-words max-w-xs">{review.comment}</td>
                  <td className="py-3 px-5">{new Date(review.date).toLocaleDateString()}</td>
                  <td className="py-3 px-5 text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleEditClick(review)}
                      className="bg-amber-400 hover:bg-amber-500 text-red-950 text-xs px-3 py-1 rounded cursor-pointer font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-950 hover:bg-red-800 text-white text-xs px-3 py-1 rounded cursor-pointer font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
          >
            <button
              type="button"
              onClick={() => setEditingReview(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-5 text-red-950 text-center">Edit Review</h2>

            <label className="block mb-1 font-semibold text-red-950">Rating (1-5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.1"      
              value={editData.rating || ''}
              onChange={handleEditChange}
              required
              className="w-full mb-4 p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            />


            <label className="block mb-1 font-semibold text-red-950">Comment</label>
            <textarea
              name="comment"
              value={editData.comment || ''}
              onChange={handleEditChange}
              required
              className="w-full mb-5 p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows={4}
            />

            <button
              type="submit"
              className="w-full bg-red-950 hover:bg-amber-400 hover:text-red-950 text-white hover:font-bold py-2 rounded transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
