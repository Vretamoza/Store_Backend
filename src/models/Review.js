const mongoose = require('mongoose')
const User = require('./User')
const Product = require('./Product')

Review = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product
  },
  rating: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Review', Review)
