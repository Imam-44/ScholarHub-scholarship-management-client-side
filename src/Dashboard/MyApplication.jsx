import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/my-applications/${user.email}`)
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire(
          'Error',
          error.response?.data?.message || 'Failed to fetch applications',
          'error'
        );
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

  const handleEdit = (application) => {
    if (application.applicationStatus !== 'pending') {
      Swal.fire(
        'Cannot Edit',
        'You cannot edit the application because it is processing or completed.',
        'warning'
      );
      return;
    }
    navigate(`/applications/edit/${application._id}`);
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/applications/cancel/${id}`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire('Canceled!', 'Your application has been canceled.', 'success');
              setApplications((prev) =>
                prev.map((app) =>
                  app._id === id ? { ...app, applicationStatus: 'rejected' } : app
                )
              );
            } else {
              Swal.fire('Error', res.data.message || 'Failed to cancel', 'error');
            }
          })
          .catch(() => {
            Swal.fire('Error', 'Failed to cancel application', 'error');
          });
      }
    });
  };

  const handleDetails = (application) => {
    navigate(`/applications/details/${application._id}`);
  };

  const handleAddReview = (application) => {
    navigate(`/applications/review/${application._id}`);
  };

  if (loading) return <p className="text-center mt-10 text-lg font-semibold">Loading your applications...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-800">🎓 My Scholarship Applications</h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600">You have no scholarship applications yet.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm text-gray-800">
            <thead className="bg-gradient-to-r from-red-700 to-red-900 text-white">
              <tr>
                <th className="px-4 py-3 text-left">University</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-left">Feedback</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Degree</th>
                <th className="px-4 py-3 text-center">Fees</th>
                <th className="px-4 py-3 text-center">Service</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app._id} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3">{app.universityName || 'N/A'}</td>
                  <td className="px-4 py-3">{app.address || 'N/A'}</td>
                  <td className="px-4 py-3">{app.applicationFeedback || 'No feedback yet'}</td>
                  <td className="px-4 py-3">{app.subjectCategory || 'N/A'}</td>
                  <td className="px-4 py-3">{app.degree || 'N/A'}</td>
                  <td className="px-4 py-3 text-center">${app.applicationFees || 0}</td>
                  <td className="px-4 py-3 text-center">${app.serviceCharge || 0}</td>
                  <td className="px-4 py-3 text-center capitalize font-medium">
                    {app.status === 'rejected' ? (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                        Rejected
                      </span>
                    ) : app.status === 'pending' ? (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                        Pending
                      </span>
                    ) : app.status === 'completed' ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                        Completed
                      </span>
                    ) : app.status ? (
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                        {app.status}
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="grid grid-cols-2 gap-2 w-[140px]">
                      <button
                        onClick={() => handleDetails(app)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleEdit(app)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleCancel(app._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleAddReview(app)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                      >
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
