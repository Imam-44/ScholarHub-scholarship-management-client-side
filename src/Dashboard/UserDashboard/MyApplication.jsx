import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
 const navigate = useNavigate()
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/my-applications/${user.email}`)
      .then(res => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to fetch your applications', 'error');
        setLoading(false);
      });
  }, [user?.email, axiosSecure]);

const handleDetails = (application) => {
  Swal.fire({
    title: `<span style="color: #fbbf24; font-size: 24px;">🎓 ${application.scholarshipName}</span>`,
    html: `
      <div style="
        text-align: left; 
        color: #fff; 
        background-color: #450a0a; 
        padding: 20px; 
        border-radius: 10px;
        font-family: 'Segoe UI', sans-serif;
      ">

        <h3 style="color: #fbbf24; margin-bottom: 10px;">🏛 University Info</h3>
        <p><strong>University:</strong> ${application.universityName}</p>
        <p><strong>Address:</strong> ${application.universityCity}, ${application.universityCountry}</p>
        <p><strong>Scholarship Category:</strong> ${application.scholarshipCategory}</p>

        <h3 style="color: #fbbf24; margin-top: 15px;">📘 Application Info</h3>
        <p><strong>Subject Category:</strong> ${application.subjectCategory}</p>
        <p><strong>Degree:</strong> ${application.degree}</p>
        <p><strong>Status:</strong> ${application.status}</p>
        <p><strong>Application Fees:</strong> $${application.applicationFees}</p>
        <p><strong>Service Charge:</strong> $${application.serviceCharge}</p>
        <p><strong>Date:</strong> ${new Date(application.date).toLocaleDateString()}</p>

        <h3 style="color: #fbbf24; margin-top: 15px;">👤 Applicant Info</h3>
        <p><strong>Name:</strong> ${application.userName}</p>
        <p><strong>Email:</strong> ${application.userEmail}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Gender:</strong> ${application.gender}</p>
        <p><strong>Address:</strong> ${application.address}</p>
        <p><strong>SSC:</strong> ${application.ssc}</p>
        <p><strong>HSC:</strong> ${application.hsc}</p>
        <p><strong>Study Gap:</strong> ${application.studyGap}</p>

        ${application.photo ? `
          <div style="margin-top: 10px; text-align: center;">
            <img src="${application.photo}" alt="User Image" 
              style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 2px solid #fbbf24;" />
          </div>
        ` : ''}
      </div>
    `,
    background: '#1f2937', // Tailwind gray-800 background
    confirmButtonColor: '#fbbf24', // Amber confirm button
    confirmButtonText: 'Close',
    width: 650,
  });
};


  const handleEdit = (application) => {
    if (application.status !== 'pending') {
      Swal.fire('Cannot Edit', 'Application is already processing or completed.', 'warning');
    } else {
      
      navigate(`/dashboard/applications/edit/${application._id}`)
    }
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/application-status/${id}`, { status: 'rejected' })
          .then(res => {
            if (res.data.modifiedCount > 0) {
              Swal.fire('Cancelled', 'Your application has been cancelled.', 'success');
              setApplications(applications.map(app => app._id === id ? { ...app, status: 'rejected' } : app));
            }
          });
      }
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;
    const date = form.date.value;

    const review = {
      rating,
      comment,
      date,
      scholarshipName: selectedReview.scholarshipName,
      subjectCategory: selectedReview.subjectCategory,
      universityName: selectedReview.universityName,
      universityId: selectedReview.universityId,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      reviewerImage: user.photoURL || '',
    };

    const res = await axiosSecure.post('/reviews', review);
    if (res.data.insertedId) {
      Swal.fire('Review Submitted', 'Thank you for your feedback!', 'success');
      setSelectedReview(null);
    }
  };

  if (loading) {
    return <div className="text-center text-lg mt-10">Loading your applications...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-rose-700">🎓 My applications</h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white shadow rounded-lg text-sm">
            <thead className="bg-gradient-to-r from-rose-800 to-rose-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">University</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Feedback</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Degree</th>
                <th className="py-3 px-4 text-center">Fees</th>
                <th className="py-3 px-4 text-center">Service</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={app._id} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-4">{app.universityName}</td>
                  <td className="py-3 px-4">{app.universityCountry } , {app.universityCity}</td>
                  <td className="py-3 px-4">{app.feedback || 'N/A'}</td>
                  <td className="py-3 px-4">{app.subjectCategory}</td>
                  <td className="py-3 px-4">{app.degree}</td>
                  <td className="py-3 px-4 text-center">${app.applicationFees}</td>
                  <td className="py-3 px-4 text-center">${app.serviceCharge}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`text-xs font-semibold px-2 py-1 rounded 
                      ${app.status === 'pending' && 'bg-yellow-100 text-yellow-700'}
                      ${app.status === 'processing' && 'bg-blue-100 text-blue-700'}
                      ${app.status === 'completed' && 'bg-green-100 text-green-700'}
                      ${app.status === 'rejected' && 'bg-red-100 text-red-700'}`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => handleDetails(app)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleEdit(app)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleCancel(app._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setSelectedReview(app)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded cursor-pointer"
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

      {/* Review Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              type="button"
              onClick={() => setSelectedReview(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Give a Review</h2>
            <input
              type="number"
              name="rating"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
              className="w-full mb-3 border p-2 rounded"
              required
            />
            <textarea
              name="comment"
              placeholder="Your comment"
              className="w-full mb-3 border p-2 rounded"
              required
            ></textarea>
            <input
              type="date"
              name="date"
              className="w-full mb-4 border p-2 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
