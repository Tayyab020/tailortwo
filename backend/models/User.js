const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  isTailor: { type: Boolean },
  address: { type: String },
  phoneNumber: { type: String },
  availabilityTimeFrom: { type: String },
  availabilityTimeTo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');
