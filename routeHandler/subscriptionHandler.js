const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const subscriptionSchema = require("../Schema/subscriptionSchema");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const verifyUser = require("../middleware/verifyUser");
const router = express.Router();
const Subscription = new mongoose.model("Subscription", subscriptionSchema);

router.get("/payment/:premium", verifyUser, async (req, res) => {
  const premium = req.params.premium * 100;
  const paymentIntents = await stripe.paymentIntents.create({
    amount: premium,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIntents.client_secret });
});

module.exports = router;
