const express = require('express')
const router = express.Router()
const History = require('../models/History')

router.get('/:user_id', async (req, res) => {
  const {user_id} = req.params
  const histories = await History.find({user_id})
  const items = histories.map(history => history.items).flat()
  res.json(items)
})

module.exports = router
