import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditScholarshipModal = ({ scholarship, onClose, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState(scholarship);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'applicationFees' ? Number(value) : value,
    }));
  };


  const handleSubmit = e => {
    e.preventDefault();

    const { _id, ...updateData } = formData;

    axiosSecure.patch(`/scholarship/${_id}`, updateData)
      .then(() => {
        Swal.fire('Success', 'Scholarship updated successfully', 'success');
        onUpdate({ ...formData, edit: false });
      })
      .catch((error) => {
        console.error('upddate failed:', error);
        Swal.fire('Error', 'Update failed', 'error');
      })

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <h3 className="text-xl font-bold mb-4">Edit Scholarship</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            name="scholarshipName"
            value={formData.scholarshipName}
            onChange={handleChange}
            placeholder="Scholarship Name"
          />
          <input
            className="w-full border p-2 rounded"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            placeholder="University Name"
          />
          <input
            className="w-full border p-2 rounded"
            name="scholarshipCategory"
            value={formData.subjectCategory}
            onChange={handleChange}
            placeholder="Category"
          />
          <input
            className="w-full border p-2 rounded"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Degree"
          />
          <input
            className="w-full border p-2 rounded"
            name="applicationFees"
            type="number"
            value={formData.applicationFees}
            onChange={handleChange}
            placeholder="Application Fees"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditScholarshipModal;
