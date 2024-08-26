const Stripe = require('stripe');
const stripe = Stripe('your-secret-key'); // Replace with your actual Stripe secret key

const createCustomer = async (email) => {
  return await stripe.customers.create({ email });
};

const createSubscription = async (customerId, paymentMethodId, priceId) => {
  await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

  await stripe.customers.update(customerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    expand: ['latest_invoice.payment_intent'],
  });

  return subscription;
};

module.exports = { createCustomer, createSubscription };
