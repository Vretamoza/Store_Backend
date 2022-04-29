const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const User = require('../models/User')
const Cart = require('../models/Cart')
const History = require('../models/History')
const mongoose  = require('mongoose')


router.get('/', async (req, res) => {
  const {user_id} = req.query
  const cart = await Cart.findOne({user_id})?? await Cart.create({user_id})
  if(!cart) return res.status(404).json({error: 'Cart not found'})
  res.json(cart.items)
})


router.post('/', async (req, res) => {
  const {product_id, user_id} = req.body

  const product = await Product.findOne({_id: product_id})
  if(!product) return res.status(404).json({error: 'Product not found'})

  const cart = await Cart.findOne({user_id})
  if(!cart) return res.status(404).json({error: 'Cart not found'})

  const newItem = {
    _id: new mongoose.Types.ObjectId(),
    product_id
  }

  const newCart = await Cart.findOneAndUpdate(
    {user_id},
    {$push: {items: newItem}},
    {new: true, upsert: true})
  return res.status(200).json(newCart)
})

router.delete('/', async (req, res) => {
  const {item_id} = req.query
  const item = await Cart.findOne({'items._id': item_id})
  if(!item) return res.status(404).json({error: 'Item not found'})

  const newCart = await Cart.findOneAndUpdate(
    {'items._id': item_id},
    {$pull: {items: {_id: item_id}}},
    {new: true})
  return res.json.status(200).json(newCart)
})

router.post('/buy', async (req, res) => {
  const {user_id} = req.body
  const cart = await Cart.findOne({user_id: user_id})
  if(!cart) return res.status(404).json({error: 'Cart not found'})

  await History.create({user_id, items: cart.items})

  const newCart = await Cart.findOneAndUpdate(
    {user_id},
    {$set: {items: []}},
    {new: true})
  return res.status(200).json(newCart)
})


module.exports = router
