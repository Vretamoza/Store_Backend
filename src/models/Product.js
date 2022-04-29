const mongoose = require('mongoose')
const User = require('./User')

const Product = new mongoose.Schema({
  display_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  }
})

module.exports = mongoose.model('Product', Product)
