// checkoutSession.js
const express = require('express');
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    const { products } = req.body;
    console.log("Received products:", products); // Debugging log
  
    try {
      const lineItems = products.map((product) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.product.title, // Access nested title
          },
          unit_amount: Math.round(Number(product.product.price) * 100), // Convert price to integer cents
        },
        quantity: product.quantity,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/OrderSuccessPage`,
        cancel_url: `${process.env.CLIENT_URL}/NotFoundPage`,
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error); // Log the full error
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  });
  
  

module.exports = router;
