import { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import EditScholarshipModal from '../ModeratorDashboard/EditScholarshipModal ';
import ScholarshipDetailsModal from '../ModeratorDashboard/ScholarshipDetailsModal ';



const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axiosSecure.get('/scholarship').then(res => setScholarships(res.data.scholarships));
  }, [axiosSecure]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This scholarship will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarship/${id}`).then(() => {
          Swal.fire('Deleted!', 'Scholarship has been deleted.', 'success');
          setScholarships(prev => prev.filter(s => s._id !== id));
        });
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-8">🎓 Manage Scholarships</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-red-100 text-red-800 font-semibold text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Scholarship</th>
              <th className="px-4 py-3 text-left">University</th>
              <th className="px-4 py-3 text-left">Subject Category</th>
              <th className="px-6 py-3 text-left">Degree</th>
              <th className="px-6 py-3 text-left">Fees</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {scholarships.map(s => (
              <tr key={s._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-4">{s.scholarshipName}</td>
                <td className="px-4 py-4">{s.universityName}</td>
                <td className="px-4 py-4">{s.subjectCategory}</td>
                <td className="px-6 py-4">{s.degree}</td>
                <td className="px-6 py-4">${s.applicationFees}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button
                    onClick={() => setSelected(s)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => setSelected({ ...s, edit: true })}
                    className="text-green-600 hover:text-green-800 transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

           {/*  Details Modal */}
      {selected && !selected.edit && (
        <ScholarshipDetailsModal
          scholarship={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {/* Edit Modal */}
      {selected && selected.edit && (
        <EditScholarshipModal
          scholarship={selected}
          onClose={() => setSelected(null)}
          onUpdate={updated => {
            setScholarships(prev =>
              prev.map(s => (s._id === updated._id ? updated : s))
            );
            setSelected(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageScholarships;
