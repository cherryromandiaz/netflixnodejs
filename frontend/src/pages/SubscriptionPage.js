import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SubscriptionForm from '../components/SubscriptionForm';

const stripePromise = loadStripe('your-publishable-key'); // Replace with your Stripe publishable key

const SubscriptionPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionForm />
    </Elements>
  );
};

export default SubscriptionPage;
