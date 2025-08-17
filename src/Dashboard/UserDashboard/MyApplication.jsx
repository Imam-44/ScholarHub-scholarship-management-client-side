import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const MyApplications = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      setFetching(true);
      axiosSecure.get(`/my-applications/${user.email}`)
        .then(res => setApplications(res.data))
        .catch(() => {
          Swal.fire('Error', 'Failed to fetch your applications', 'error');
          setApplications([]);
        })
        .finally(() => setFetching(false));
    }
  }, [loading, user?.email, axiosSecure]);

  if (loading || fetching) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-rose-700">🎓 My Applications</h2>
      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white shadow rounded-lg text-sm">
            <thead className="bg-gradient-to-r from-rose-800 to-rose-600 text-white">
              <tr>
                <th>University</th>
                <th>Address</th>
                <th>Feedback</th>
                <th>Category</th>
                <th>Degree</th>
                <th>Fees</th>
                <th>Service</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id}>
                  <td>{app.universityName}</td>
                  <td>{app.universityCountry}, {app.universityCity}</td>
                  <td>{app.feedback || 'N/A'}</td>
                  <td>{app.subjectCategory}</td>
                  <td>{app.degree}</td>
                  <td>${app.applicationFees}</td>
                  <td>${app.serviceCharge}</td>
                  <td>{app.status}</td>
                  <td>
                    <button onClick={() => setSelectedReview(app)}>Review</button>
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
