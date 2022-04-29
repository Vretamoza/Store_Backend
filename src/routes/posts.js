const express = require('express')
const Product = require('../models/Product')
const router = express.Router()
const User = require('../models/Product')


router.get('/', async (req, res) => {
  const {user_id, post_id} = req.query
  if(user_id){
    const posts = await Product.find({owner_id: user_id})
    res.json(posts)
  }
  if(post_id){
    const post = await Product.findById(post_id)
    if(!post){
      res.status(404).json({error: 'Post not found'})
    }else{
      res.json(post)
    }
  }
})

router.post('/', async (req, res) => {
  const {owner_id, display_name, description, price, img_url} = req.body
  const product = await Product.findOne({display_name: display_name})
  if(product){
    res.status(400).json({error: 'Product already exists'})
  }else{
    const newProduct = new Product({owner_id, display_name, description, price, img_url})
    await newProduct.save()
    res.json({_id: newProduct._id, success: 'Product created'})
  }
})

router.get('/recent', async (req, res) => {
  const recentPosts = await Product.find().limit(10)
  res.json(recentPosts)
})

module.exports = router
