const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const user = new mongoose.Schema({
  display_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})

user.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(15)
  const hash = bcrypt.hash(password, salt)
  return hash
}

user.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', user);
