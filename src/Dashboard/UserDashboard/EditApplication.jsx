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
    axiosSecure.get(`/applications/${id}`).then(res => {
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

    // backend-এ যেসব ফিল্ড আপডেট করার অনুমতি আছে, সেগুলো পাঠাচ্ছি
    const updated = {
      address: formData.address,
      degree: formData.degree,
      phone: formData.phone,
      photo: formData.photo || '',       // optional field, তাই fallback দেয়া হয়েছে
      gender: formData.gender || '',
      ssc: formData.ssc || '',
      hsc: formData.hsc || '',
      studyGap: formData.studyGap || '',
    };

    axiosSecure.patch(`/update-application/${id}`, updated)
      .then(() => {
        Swal.fire('Success', 'Application updated', 'success');
        navigate('/dashboard/my-applications');
      })
      .catch((err) => {
     
        Swal.fire('Error', 'Failed to update', 'error');
      });
  };

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
          <label className="block font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder="Phone Number"
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

        <div>
          <label className="block font-medium text-gray-700 mb-1">Photo URL (Optional)</label>
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            name="photo"
            value={formData.photo || ''}
            onChange={handleChange}
            placeholder="Photo URL"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Gender</label>
          <select
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">SSC Result</label>
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            name="ssc"
            value={formData.ssc || ''}
            onChange={handleChange}
            placeholder="SSC Result"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">HSC Result</label>
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            name="hsc"
            value={formData.hsc || ''}
            onChange={handleChange}
            placeholder="HSC Result"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Study Gap (in years)</label>
          <input
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            name="studyGap"
            value={formData.studyGap || ''}
            onChange={handleChange}
            placeholder="Study Gap"
            type="number"
            min="0"
          />
        </div>

        <button
          className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded-md transition duration-300 cursor-pointer"
          type="submit"
        >
          Update Application
        </button>
      </form>
    </div>
  );
};

export default EditApplication;
