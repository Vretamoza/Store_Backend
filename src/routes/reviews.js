const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Product = require('../models/Product')
const Review = require('../models/Review');

router.post('/', async (req, res) => {
  const {user_id, product_id, rating, description} = req.body

  const user = await User.findOne({_id: user_id})
  if(!user) return res.status(404).json({error: 'User not found'})

  const product = await Product.findOne({_id: product_id})
  if(!product) return res.status(404).json({error: 'Product not found'})

  const review = new Review ({user_id, product_id, rating, description})

  await review.save()
  res.json({_id: review._id, success: 'Review Created'})
})

router.get('/', async (req, res) => {
  const { user_id, product_id } = req.query;
  if (user_id) {
      const review = await Review.find({ user_id });
      res.json(review);
  } else if (product_id) {
      const review = await Review.find({ product_id });
      res.json(review);
  }
});


module.exports = router
