const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true },
    tailor: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    customer: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema, 'appointments');
