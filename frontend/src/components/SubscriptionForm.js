import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      try {
        const customer = await axios.post('http://localhost:4000/api/create-customer', { email });
        const subscription = await axios.post('http://localhost:4000/api/create-subscription', {
          customerId: customer.data.id,
          paymentMethodId: paymentMethod.id,
          priceId: 'your-price-id', // Replace with your actual price ID from Stripe
        });
        console.log(subscription.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Subscribe
      </button>
    </form>
  );
};

export default SubscriptionForm;
