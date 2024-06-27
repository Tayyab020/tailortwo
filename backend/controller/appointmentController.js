// backend/controllers/appointmentController.js

const Appointment = require('../models/appointment');
const AppointmentDTO = require('../dto/appointment');
const Joi = require('joi');

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const appointmentController = {
    async create(req, res, next) {
        const appointmentSchema = Joi.object({
            date: Joi.date().required(),
            time: Joi.string().required(),
            tailor: Joi.string().regex(mongodbIdPattern).required(),
            customer: Joi.string().regex(mongodbIdPattern).required(),
            description: Joi.string().optional(),
            visitMode: Joi.string().valid('shop', 'home').required(),
            deliveryMode: Joi.string().valid('pickup', 'home').required(),
            address: Joi.string().optional(),
            phoneNumber: Joi.string().optional(),
        });

        const { error } = appointmentSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { date, time, tailor, customer, description, visitMode, deliveryMode, address, phoneNumber } = req.body;

        try {
            const appointment = new Appointment({
                date,
                time,
                tailor,
                customer,
                description,
                visitMode,
                deliveryMode,
                address,
                phoneNumber,
            });

            const savedAppointment = await appointment.save();
            const appointmentDto = new AppointmentDTO(savedAppointment);

            return res.status(201).json({ appointment: appointmentDto });
        } catch (error) {
            return next(error);
        }
    },

    async getAll(req, res, next) {
        try {
            const { tailorId } = req.params;
            const appointments = await Appointment.find({ tailor: tailorId }).populate('tailor').populate('customer');
            const appointmentsDto = appointments.map(appt => new AppointmentDTO(appt));
            return res.status(200).json({ appointments: appointmentsDto });
        } catch (error) {
            return next(error);
        }
    },

    async getCustomerAppointments(req, res, next) {
      try {
        const { customerId } = req.params;
        const appointments = await Appointment.find({ customer: customerId }).populate('tailor').populate('customer');
        const appointmentsDto = appointments.map(appt => new AppointmentDTO(appt));
        return res.status(200).json({ appointments: appointmentsDto });
      } catch (error) {
        return next(error);
      }
    },
    
    async delete(req, res, next) {
        const { id } = req.params;

        if (!mongodbIdPattern.test(id)) {
            return res.status(400).json({ message: 'Invalid appointment ID' });
        }

        try {
            const appointment = await Appointment.findByIdAndDelete(id);

            if (!appointment) {
                return res.status(404).json({ message: 'Appointment not found' });
            }

            res.status(200).json({ message: 'Appointment deleted successfully' });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = appointmentController;
