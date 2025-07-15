import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure()
  const [formData, setFormData] = useState({
    scholarshipId: id,
    scholarshipName: '',
    universityName: '',
    reviewText: '',
    rating: ''
  });


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/scholarship/${id}`)
      .then(res => {
        const data = res.data;
        // console.log(data);
        setFormData(prev => ({
          ...prev,
          scholarshipName: data.scholarshipName,
          universityName: data.universityName
        }));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        Swal.fire('Error', 'Failed to fetch scholarship info', 'error');
        setLoading(false);
      });
  }, [id]);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  console.log('Submitting Review:', formData);

  const handleSubmit = e => {
    e.preventDefault();
    axiosSecure.post('/reviews', formData)
      .then(() => {
        Swal.fire('Success', 'Review submitted', 'success');
        navigate('/dashboard/my-applications');
      })
      .catch(() => Swal.fire('Error', 'Failed to submit review', 'error'));
  };
  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading scholarship info...</p>;
  }
  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">Add a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Review</label>
          <textarea
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            name="reviewText"
            value={formData.reviewText}
            onChange={handleChange}
            placeholder="Write your review..."
            required
            rows={4}
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Rating (1 to 5)</label>
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            name="rating"
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Rating"
            required
          />
        </div>
        <button
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-md transition duration-300"
          type="submit"
        // disabled={!formData.scholarshipName || !formData.universityName}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
