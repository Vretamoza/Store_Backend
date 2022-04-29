const express = require('express')
const router = express.Router()
const User = require('../models/User')
const tokens = require('../utils/Token')

router.post('/login', async (req, res) => {
  const {username, password} = req.body
  const user = await User.findOne({username: username})
  if (!user) {
    res.status(400).json({message: 'User not found'})
  }
  else {
    const match = await user.matchPassword(password)
    if (match) {
      res.status(200).json(user)
      tokens.push(user._id)
    }
    else {
      res.status(400).json({message: 'Wrong password'})
    }
  }
})

router.post('/prev-login', async (req, res) => {
  const {user_id} = req.body
  const token = tokens.find(user_id)
  res.json({_id: token})
})


router.post('/register', async (req, res) => {
  const {display_name, username, password} = req.body

  const user = await User.findOne({username: username})
  if(user){
    res.status(400).json({error: 'User already exists'})
  }else{
    const newUser = new User({ display_name, username, password})
    console.log(newUser.matchPassword)
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save();
    res.json({_id: newUser._id, success: 'User created'})
  }
})

router.get('/', async (req, res) => {
  const {user_id} = req.query
  const user = await User.findOne({_id: user_id})
  if(!user){
    res.status(404).json({error: 'User not found'})
  }else{
    res.json(user)
  }
})

module.exports = router
