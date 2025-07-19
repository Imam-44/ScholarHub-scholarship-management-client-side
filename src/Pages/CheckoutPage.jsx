import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../Components/CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutPage = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/scholarship/${id}`)
      .then(res => setScholarship(res.data))
   
  }, [id]);

  if (!scholarship) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto  px-4 py-10">
      <Elements stripe={stripePromise}>
        <CheckoutForm scholarship={scholarship} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
