import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = ({ scholarship }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    photo: '',
    address: '',
    gender: '',
    degree: '',
    ssc: '',
    hsc: '',
    studyGap: '',
  });

  // create payment intent
  useEffect(() => {
    if (scholarship?.applicationFees) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
          amount: scholarship.applicationFees + scholarship.serviceCharge,
        })
        .then(res => setClientSecret(res.data.clientSecret));
    }
  }, [scholarship]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      Swal.fire('Payment Error', error.message, 'error');
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      Swal.fire('Payment Failed', confirmError.message, 'error');
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      // build full application data
      const application = {
        ...formData,
        universityName: scholarship.universityName,
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

      // post to database
      await axios.post(
        `${import.meta.env.VITE_API_URL}/applied-scholarships`,
        application
      );

      Swal.fire('Success!', 'Scholarship Applied Successfully!', 'success');
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
    <input
      type="text"
      name="phone"
      required
      onChange={handleChange}
      placeholder="Phone Number"
      className="input input-bordered w-full rounded-lg border-2 border-amber-600 focus:border-red-950 shadow-sm transition-colors duration-300"
    />
    <input
      type="text"
      name="photo"
      required
      onChange={handleChange}
      placeholder="Photo URL"
      className="input input-bordered w-full rounded-lg border-2 border-amber-600 focus:border-red-950 shadow-sm transition-colors duration-300"
    />
    <input
      type="text"
      name="address"
      required
      onChange={handleChange}
      placeholder="Full Address"
      className="input input-bordered w-full rounded-lg border-2 border-amber-600 focus:border-red-950 shadow-sm transition-colors duration-300"
    />
    <select
      name="gender"
      required
      onChange={handleChange}
      className="select w-full rounded-lg border-2 border-amber-600 focus:border-red-950 shadow-sm transition-colors duration-300"
    >
      <option value="" disabled selected>
        Select Gender
      </option>
      <option>Male</option>
      <option>Female</option>
      <option>Others</option>
    </select>
    <select
      name="degree"
      required
      onChange={handleChange}
      className="select w-full rounded-lg border-2 border-amber-600 focus:border-red-950 shadow-sm transition-colors duration-300"
    >
      <option value="" disabled selected>
        Applying Degree
      </option>
      <option>Diploma</option>
      <option>Bachelor</option>
      <option>Masters</option>
    </select>
    <input
      type="text"
      name="ssc"
      required
      onChange={handleChange}
      placeholder="SSC Result"
      className="input input-bordered w-full rounded-lg border-2 border-amber-600 focus:border-red-950 shadow-sm transition-colors duration-300"
    />
    <input
      type="text"
      name="hsc"
      required
      onChange={handleChange}
      placeholder="HSC Result"
      className="input input-bordered w-full rounded-lg border-2 border-amber-600 focus:border-red-950 shadow-sm transition-colors duration-300"
    />
    <select
      name="studyGap"
      onChange={handleChange}
      className="select w-full rounded-lg border-2 border-amber-600 focus:border-red-950 shadow-sm transition-colors duration-300"
    >
      <option value="" disabled selected>
        Study Gap (optional)
      </option>
      <option>None</option>
      <option>1 year</option>
      <option>2 years</option>
    </select>
  </div>

  {/* Read-only fields */}
  <div className="mt-8 space-y-3 text-sm text-gray-700 bg-amber-50 p-5 rounded-lg shadow-inner">
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

  {/* Stripe Card Element */}
  <div className="mt-6 p-4 border-2 border-amber-600 rounded-lg shadow-sm">
    <CardElement
      options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#7f1d1d', // red-950 shade
            '::placeholder': {
              color: '#d97706', // amber-600 shade
            },
          },
          invalid: {
            color: '#b91c1c', // red-800
          },
        },
      }}
    />
  </div>

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-amber-600 to-red-950 hover:from-red-950 hover:to-amber-600 text-white py-3 rounded-xl shadow-lg transition duration-300 font-semibold"
    disabled={!stripe}
  >
    Submit & Pay
  </button>
</form>

  );
};

const CheckoutPage = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/scholarship/${id}`)
      .then(res => setScholarship(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!scholarship) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Elements stripe={stripePromise}>
        <CheckoutForm scholarship={scholarship} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
