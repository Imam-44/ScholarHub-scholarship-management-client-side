import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axiosSecure.get('/scholarship')
      .then(res => {
        if (Array.isArray(res.data.scholarships)) {
          setScholarships(res.data.scholarships);
        } else {
          setScholarships([]);
          console.error('Scholarships response is not array', res.data);
        }
      })
      .catch(console.error);
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Scholarship will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b91c1c', // red-950
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarship/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            setScholarships(prev => prev.filter(s => s._id !== id));
            Swal.fire('Deleted!', 'Scholarship has been deleted.', 'success');
          }
        });
      }
    });
  };

  const handleEditClick = (scholarship) => {
    const { _id, ...rest } = scholarship;
    setSelectedScholarship(scholarship);
    setFormData(rest);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id } = selectedScholarship;
      await axiosSecure.patch(`/scholarship/${_id}`, formData);
      Swal.fire({ icon: 'success', title: 'Update Successful' });

      const res = await axiosSecure.get('/scholarship');
      setScholarships(res.data.scholarships);
      setShowEditModal(false);
      setSelectedScholarship(null);
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire({ icon: 'error', title: 'Update Failed', text: error.message });
    }
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-bold text-center text-red-950 mb-8">Manage Scholarships</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 rounded shadow-sm bg-white text-sm">
          <thead className="bg-gradient-to-r from-amber-400 to-amber-300 text-red-950">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">University</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Degree</th>
              <th className="px-4 py-3 text-left">Fees</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((scholarship, idx) => (
              <tr key={scholarship._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2">{scholarship.scholarshipName}</td>
                <td className="px-4 py-2">{scholarship.universityName}</td>
                <td className="px-4 py-2">{scholarship.subjectCategory}</td>
                <td className="px-4 py-2">{scholarship.degree}</td>
                <td className="px-4 py-2">${scholarship.applicationFees}</td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedScholarship(scholarship);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-700 hover:text-blue-900 cursor-pointer"
                      aria-label="Details"
                      title="Details"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditClick(scholarship)}
                      className="text-amber-600 hover:text-amber-800 cursor-pointer"
                      aria-label="Edit"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(scholarship._id)}
                      className="text-red-950 hover:text-red-800 cursor-pointer"
                      aria-label="Delete"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedScholarship && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-red-950">Scholarship Details</h3>
            <p><strong>Name:</strong> {selectedScholarship.name}</p>
            <p><strong>University:</strong> {selectedScholarship.universityName}</p>
            <p><strong>Category:</strong> {selectedScholarship.subjectCategory}</p>
            <p><strong>Degree:</strong> {selectedScholarship.degree}</p>
            <p><strong>Fees:</strong> ${selectedScholarship.applicationFees}</p>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="mt-6 px-4 py-2 bg-red-950 text-white rounded hover:bg-amber-400 hover:text-red-950 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
          >
            <h3 className="text-xl font-semibold text-red-950 text-center">Edit Scholarship</h3>
            <input
              type="text"
              placeholder="ScholarshipName"
              value={formData.scholarshipName || ''}
              onChange={e => setFormData({ ...formData, scholarshipName: e.target.value })}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <input
              type="text"
              placeholder="University"
              value={formData.universityName || ''}
              onChange={e => setFormData({ ...formData, universityName: e.target.value })}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.subjectCategory || ''}
              onChange={e => setFormData({ ...formData, subjectCategory: e.target.value })}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <input
              type="text"
              placeholder="Degree"
              value={formData.degree || ''}
              onChange={e => setFormData({ ...formData, degree: e.target.value })}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <input
              type="number"
              placeholder="Fees"
              value={formData.applicationFees || ''}
              onChange={e => setFormData({ ...formData, applicationFees: parseFloat(e.target.value) })}
              className="w-full border border-amber-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-950 text-white rounded hover:bg-amber-400 hover:text-red-950 cursor-pointer transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
