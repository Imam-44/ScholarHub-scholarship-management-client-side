import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApplicationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/api/application/${id}`)
      .then((res) => setApplication(res.data))
      .catch((error) => {
       
        setApplication(null);
      });
  }, [id, axiosSecure]);

  if (!application) return <p className="text-center text-gray-500">Loading application details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-red-800 mb-6 text-center">Application Details</h2>
      <div className="space-y-4">
        <p><span className="font-semibold text-gray-700">🎓 University:</span> {application.universityName}</p>
        <p><span className="font-semibold text-gray-700">📘 Degree:</span> {application.degree}</p>
        <p><span className="font-semibold text-gray-700">📍 Address:</span> {application.address}</p>
        <p><span className="font-semibold text-gray-700">📄 Status:</span> <span className={`font-bold ${application.status === 'pending' ? 'text-yellow-600' : 'text-green-700'}`}>{application.status}</span></p>
        <p><span className="font-semibold text-gray-700">📝 Feedback:</span> {application.feedback || <span className="text-gray-500 italic">No feedback yet</span>}</p>
      </div>
    </div>
  );
};

export default ApplicationDetails;
