const stripe = require('stripe')(
  'sk_test_51NBYdsSDNpU8To2o6lJ2CWDGYjDSmELolftvGVAERSRMw61920NFcBNNQk9E2VZlYBoMfjv8ohKiqhLU7xiNEFdb00zLbyUmbI',
);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello bro how are you');
});

app.post('/payment-sheet', async (req, res) => {
  const {amount, currency} = req.body;
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2022-11-15'},
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

app.listen(8080, () => {
  console.log('running on http://localhost:8080');
});
