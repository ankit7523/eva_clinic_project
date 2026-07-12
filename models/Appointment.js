// models/Appointment.js
const { Schema, model } = require('mongoose');


const AppointmentSchema = new Schema(
{
name: { type: String, required: true, trim: true, maxlength: 80 },
phone: { type: String, required: true, trim: true, maxlength: 20 },
email: { type: String, required: true, lowercase: true, trim: true },
city: { type: String, required: true, trim: true, maxlength: 80 },
state: { type: String, required: true, trim: true, maxlength: 80 },
source: { type: String, default: 'popup' }, // track submission source
},
{ timestamps: true }
);


module.exports = model('Appointment', AppointmentSchema);