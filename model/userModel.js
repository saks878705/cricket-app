const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dob: Date,
  gender: String,
  country: String,
  state: String,
  city: String,
  image: String,
  wallet: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', userSchema);