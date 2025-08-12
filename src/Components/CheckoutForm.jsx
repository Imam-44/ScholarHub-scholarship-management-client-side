import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useRef } from 'react';

const CheckoutForm = ({ scholarship }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const fileInputRef = useRef();

  const initialFormState = {
    phone: '',
    photo: '',
    address: '',
    gender: '',
    degree: '',
    ssc: '',
    hsc: '',
    studyGap: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [clientSecret, setClientSecret] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const checkAlreadyApplied = async () => {
      try {
        const res = await axiosSecure.get('/api/apply-scholarship/check', {
          params: {
            email: user.email,
            scholarshipId: scholarship._id,
          },
        });

        if (res.data.alreadyApplied) {
          console.log('Already applied status:', res.data.alreadyApplied);

          setAlreadyApplied(true);
          toast.error('You have already applied for this scholarship!');
        }
      } catch (error) {
        console.error('Check failed', error);
      }
    };

    if (user?.email && scholarship?._id) {
      checkAlreadyApplied();
    }
  }, [user, scholarship]);



  useEffect(() => {
    if (scholarship?.applicationFees) {
      axiosSecure
        .post('/api/create-payment-intent', {
          amount: scholarship.applicationFees + scholarship.serviceCharge,
        })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [scholarship, axiosSecure]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formDataImage = new FormData();
    formDataImage.append('image', file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        { method: 'POST', body: formDataImage }
      );
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, photo: data.data.url }));
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      Swal.fire('Error', 'Image upload failed!', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (alreadyApplied) {
      return toast.error("You have already applied!");
    }

    // Validate SSC and HSC
    const ssc = parseFloat(formData.ssc);
    const hsc = parseFloat(formData.hsc);
    if (ssc < 1 || ssc > 5 || hsc < 1 || hsc > 5) {
      return Swal.fire(
        'Invalid Result',
        'SSC and HSC results must be between 1.0 and 5.0',
        'warning'
      );
    }

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      Swal.fire('Payment Error', error.message, 'error');
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName || 'Unknown',
          email: user.email,
        },
      },
    });

    if (confirmError) {
      Swal.fire('Payment Failed', confirmError.message, 'error');
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const application = {
        ...formData,
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName,
        universityCountry: scholarship.universityCountry,
        universityCity: scholarship.universityCity,
        scholarshipCategory: scholarship.scholarshipCategory,
        subjectCategory: scholarship.subjectCategory,
        userName: user.displayName,
        userEmail: user.email,
        userId: user._id,
        scholarshipId: scholarship._id,
        status: 'pending',
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge,
        date: new Date(),
      };

      await axiosSecure.post('/apply-scholarship', application);

      Swal.fire('Success!', 'Scholarship Applied Successfully!', 'success');
      setFormData(initialFormState);
      card.clear();
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-8 rounded-3xl shadow-md shadow-red-950/20 max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-red-950 mb-6 border-b-2 border-amber-600 pb-2">
        Applicant Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium text-red-950">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            required
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-2 rounded-lg border border-amber-600 focus:outline-none focus:border-red-950 shadow-sm transition duration-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-red-950">Upload Photo</label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="w-full px-4 py-2 border border-amber-600 rounded-lg shadow-sm cursor-pointer"
          />
          {uploading && <p className="text-sm text-amber-700 mt-1">Uploading...</p>}
          {formData.photo && (
            <img src={formData.photo} alt="Uploaded" className="mt-2 h-16 w-16 rounded-lg border" />
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-red-950">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            required
            onChange={handleChange}
            placeholder="Full Address"
            className="w-full px-4 py-2 rounded-lg border border-amber-600 focus:outline-none focus:border-red-950 shadow-sm transition duration-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-red-950">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-amber-600 focus:outline-none focus:border-red-950 shadow-sm transition duration-300"
          >
            <option value="" disabled>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-red-950">Applying Degree</label>
          <select
            name="degree"
            value={formData.degree}
            required
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-amber-600 focus:outline-none focus:border-red-950 shadow-sm transition duration-300"
          >
            <option value="" disabled>Choose Degree</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-red-950">SSC Result</label>
          <input
            type="number"
            name="ssc"
            value={formData.ssc}
            required
            onChange={handleChange}
            placeholder="SSC Result (1.0 - 5.0)"
            min="1"
            max="5"
            step="0.1"
            className="w-full px-4 py-2 rounded-lg border border-amber-600 focus:outline-none focus:border-red-950 shadow-sm transition duration-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-red-950">HSC Result</label>
          <input
            type="number"
            name="hsc"
            value={formData.hsc}
            required
            onChange={handleChange}
            placeholder="HSC Result (1.0 - 5.0)"
            min="1"
            max="5"
            step="0.1"
            className="w-full px-4 py-2 rounded-lg border border-amber-600 focus:outline-none focus:border-red-950 shadow-sm transition duration-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-red-950">Study Gap</label>
          <select
            name="studyGap"
            value={formData.studyGap}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-amber-600 focus:outline-none focus:border-red-950 shadow-sm transition duration-300"
          >
            <option value="" disabled>Study Gap (optional)</option>
            <option>None</option>
            <option>1 year</option>
            <option>2 years</option>
          </select>
        </div>
      </div>

      {/* Scholarship Summary */}
      <div className="mt-8 space-y-3 text-sm text-gray-700 bg-amber-50 p-5 rounded-lg shadow-inner">
        <p>
          <strong>Scholarship Name:</strong>{' '}
          <span className="text-red-950">{scholarship.scholarshipName}</span>
        </p>
        <p>
          <strong>University:</strong>{' '}
          <span className="text-red-950">{scholarship.universityName}</span>
        </p>
        <p>
          <strong>Category:</strong>{' '}
          <span className="text-red-950">{scholarship.scholarshipCategory}</span>
        </p>
        <p>
          <strong>Subject:</strong>{' '}
          <span className="text-red-950">{scholarship.subjectCategory}</span>
        </p>
        <p>
          <strong>Total Fee:</strong>{' '}
          <span className="text-red-950">
            ${(scholarship.applicationFees + scholarship.serviceCharge).toFixed(2)}
          </span>
        </p>
      </div>

      <div className="mt-6 p-4 border-2 border-amber-600 rounded-lg shadow-sm">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#7f1d1d',
                '::placeholder': { color: '#d97706' },
              },
              invalid: { color: '#b91c1c' },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={alreadyApplied}
        className={`w-full bg-gradient-to-r from-amber-600 to-red-950 hover:from-red-950 hover:to-amber-600 text-white py-3 rounded-xl shadow-lg transition duration-300 font-semibold ${alreadyApplied ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
      >
        {alreadyApplied ? 'Already Applied' : 'Submit & Pay'}
      </button>

    </form>
  );
};

export default CheckoutForm;
