const mongoose = require('mongoose')
const User = require('./User')

const History = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  items: [{
    _id: {type: mongoose.Schema.Types.ObjectId, required: true},
    product_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
  }]
})

module.exports = mongoose.model('History', History)
