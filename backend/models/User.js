const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  address: String,
  latitude: String,
  longitude: String
});

module.exports = mongoose.model('User', userSchema);
