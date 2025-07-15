import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { FaEdit, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const {user } = useAuth()
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    reviewText: '',
    rating: ''
  });

  useEffect(() => {
    axiosSecure.get(`/my-reviews/${user.email}`).then(res => {
      setReviews(res.data);
    });
  }, [axiosSecure]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this review?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then(() => {
          setReviews(prev => prev.filter(r => r._id !== id));
          Swal.fire('Deleted!', 'Your review has been deleted.', 'success');
        });
      }
    });
  };

  const openEditModal = review => {
    setEditingReview(review);
    setFormData({ reviewText: review.reviewText, rating: review.rating });
    document.getElementById('edit-modal').showModal();
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = e => {
    e.preventDefault();
    axiosSecure.patch(`/reviews/${editingReview._id}`, formData).then(() => {
      setReviews(prev =>
        prev.map(r =>
          r._id === editingReview._id ? { ...r, ...formData } : r
        )
      );
      document.getElementById('edit-modal').close();
      Swal.fire('Success', 'Review updated successfully', 'success');
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-700">🌟 My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-xl">
            <thead className="bg-red-100 text-left">
              <tr>
                <th className="px-4 py-2">Scholarship</th>
                <th className="px-4 py-2">University</th>
                <th className="px-4 py-2">Comment</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review._id} className="border-b">
                  <td className="px-4 py-2">{review.scholarshipName}</td>
                  <td className="px-4 py-2">{review.universityName}</td>
                  <td className="px-4 py-2">{review.reviewText}</td>
                  <td className="px-4 py-2">
                    {new Date(review.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => openEditModal(review)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <dialog id="edit-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Review</h3>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <textarea
              className="w-full p-2 border rounded"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleFormChange}
              required
            />
            <input
              className="w-full p-2 border rounded"
              name="rating"
              value={formData.rating}
              onChange={handleFormChange}
              placeholder="Rating (1-5)"
              required
            />
            <div className="modal-action">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => document.getElementById('edit-modal').close()}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyReviews;
