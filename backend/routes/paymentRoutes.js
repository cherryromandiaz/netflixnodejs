const express = require('express');
const router = express.Router();
const { createCustomer, createSubscription } = require('../services/payment');

router.post('/create-customer', async (req, res) => {
  const { email } = req.body;
  try {
    const customer = await createCustomer(email);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-subscription', async (req, res) => {
  const { customerId, paymentMethodId, priceId } = req.body;
  try {
    const subscription = await createSubscription(customerId, paymentMethodId, priceId);
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
