import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllAppliedScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackId, setFeedbackId] = useState(null);
  const [sortBy, setSortBy] = useState('');

  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ['allApplications'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-applications');
      return res.data.applications;
    },
  });

  const sortedApplications = [...applications].sort((a, b) => {
  if (sortBy === 'appliedDate') {
    return new Date(b.date) - new Date(a.date);
  } else if (sortBy === 'deadline') {
    return new Date(b.scholarshipDeadline) - new Date(a.scholarshipDeadline);
  } else {
    return 0;
  }
});


  const handleDetails = (app) => setSelectedApp(app);
  const closeDetails = () => setSelectedApp(null);

  const handleFeedbackOpen = (app) => {
    setFeedbackId(app._id);
    setFeedbackText(app.feedback || '');
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axiosSecure.patch(`/application-feedback/${feedbackId}`, {
        feedback: feedbackText,
      });
      Swal.fire('Success', 'Feedback submitted successfully!', 'success');
      setFeedbackId(null);
      setFeedbackText('');
      refetch();
    } catch (error) {
      Swal.fire('Error', 'Failed to submit feedback', 'error');
    }
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/application-status/${id}`, {
          status: 'rejected',
        });
        Swal.fire('Cancelled', 'Application has been rejected.', 'success');
        refetch();
      } catch (error) {
        Swal.fire('Error', 'Failed to cancel application.', 'error');
      }
    }
  };

  // ✅ Loading Text
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px] text-xl font-semibold text-blue-600">
        🔄 Loading applications...
      </div>
    );
  }
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-slate-800">
        📋 All Application
      </h2>

      <div className="flex justify-center mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-400 px-4 py-2 rounded-md text-black"
        >
          <option value="">🔽 Sort By</option>
          <option value="appliedDate">📅 Applied Date</option>
          <option value="deadline">⏳ Scholarship Deadline</option>
        </select>
      </div>


      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border border-gray-200">
          <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Degree</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedApplications.map((app) => (
              <tr key={app._id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{app.userName}</td>
                <td className="px-4 py-2">{app.universityName}</td>
                <td className="px-4 py-2">{app.degree}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${app.status === 'pending'
                      ? 'bg-yellow-500'
                      : app.status === 'processing'
                        ? 'bg-blue-600'
                        : app.status === 'completed'
                          ? 'bg-green-600'
                          : 'bg-red-500'
                      }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDetails(app)}
                    className="px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white text-sm rounded cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleFeedbackOpen(app)}
                    className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded cursor-pointer"
                  >
                    Feedback
                  </button>
                  <button
                    onClick={() => handleCancel(app._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded cursor-pointer"
                  >
                    Cancel
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
            <button
              onClick={closeDetails}
              className="absolute top-2 right-3 text-gray-500 cursor-pointer hover:text-black text-lg"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4 text-slate-700">🎓 Application Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>University:</strong> {selectedApp.universityName}</p>
              <p><strong>Degree:</strong> {selectedApp.degree}</p>
              <p><strong>Category:</strong> {selectedApp.scholarshipCategory}</p>
              <p><strong>Applicant Email:</strong> {selectedApp.userEmail}</p>
              <p><strong>Applied On:</strong> {new Date(selectedApp.date).toDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">✏️ Provide Feedback</h3>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Write feedback (e.g. missing documents)..."
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setFeedbackId(null)}
                className="px-4 cursor-pointer py-1 bg-gray-300 hover:bg-gray-400 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="px-4 py-1 bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded text-sm"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppliedScholarships;
