const mongoose = require('mongoose')
const User = require('./User')
const Product = require('./Product')

const Cart = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  items: [{
    _id: {type: mongoose.Schema.Types.ObjectId, required: true},
    product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post'}
  }]
})

module.exports = mongoose.model('Cart', Cart)
