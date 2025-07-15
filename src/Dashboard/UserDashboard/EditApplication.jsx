import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [application, setApplication] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axiosSecure.get(`/application/${id}`).then(res => {
      setApplication(res.data);
      setFormData(res.data);
    });
  }, [id, axiosSecure]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // শুধু এই দুইটা field পাঠাও
    const updated = {
      address: formData.address,
      degree: formData.degree,
    };

    axiosSecure.patch(`/update-application/${id}`, updated)
      .then(() => {
        Swal.fire('Success', 'Application updated', 'success');
        navigate('/dashboard/my-applications');
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        Swal.fire('Error', 'Failed to update', 'error');
      });
  }




  if (!application) return <p className="text-center text-gray-500">Loading application...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-red-800 text-center">Edit Application</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Address</label>
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Degree</label>
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            name="degree"
            value={formData.degree || ''}
            onChange={handleChange}
            placeholder="Degree"
          />
        </div>
        <button
          className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-md transition duration-300"
          type="submit"
        >
          Update Application
        </button>
      </form>
    </div>
  );
};

export default EditApplication;
