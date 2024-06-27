const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  tailor: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  customer: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  description: { type: String },
  visitMode: { type: String, required: true, enum: ['shop', 'home'] },
  deliveryMode: { type: String, required: true, enum: ['pickup', 'home'] },
  address: { type: String },
  phoneNumber: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema, 'appointments');
