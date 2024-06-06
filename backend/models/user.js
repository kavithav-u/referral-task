const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true },
  referralLink: { type: String, unique: true },
  referredBy: { type: String },
  referralCount: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
