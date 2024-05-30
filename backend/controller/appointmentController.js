// const Joi = require('joi');
// const Appointment = require('../models/appointment');
// const AppointmentDTO = require('../dto/appointment');
// // const { mongodbIdPattern } = require('../utils/constants');


// const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

// const appointmentSchema = Joi.object({
//   date: Joi.date().required(),
//   time: Joi.string().required(),
//   tailor: Joi.string().regex(mongodbIdPattern).required(),
//   customer: Joi.string().regex(mongodbIdPattern).required(),
//   description: Joi.string().optional(),
// });

// const appointmentController = {







//   async create(req, res, next) {
//     const { error } = appointmentSchema.validate(req.body);

//     if (error) {
//       return next(error);
//     }

//     const { date, time, tailor, customer, description } = req.body;

//     try {
//       const appointment = new Appointment({
//         userId: customer,
//         date,
//         time,
//         description,
//       });

//       await appointment.save();

//       const appointmentDto = new AppointmentDTO(appointment);
//       res.status(201).json({ appointment: appointmentDto });
//     } catch (err) {
//       next(err);
//     }
//   },

//   async getAll(req, res, next) {
//     try {
//       const appointments = await Appointment.find().populate('userId', 'username');
//       const appointmentsDto = appointments.map(appointment => new AppointmentDTO(appointment));
//       res.status(200).json({ appointments: appointmentsDto });
//     } catch (err) {
//       next(err);
//     }
//   },

//   async getById(req, res, next) {
//     const { id } = req.params;

//     if (!mongodbIdPattern.test(id)) {
//       return res.status(400).json({ message: 'Invalid appointment ID' });
//     }

//     try {
//       const appointment = await Appointment.findById(id).populate('userId', 'username email');

//       if (!appointment) {
//         return res.status(404).json({ message: 'Appointment not found' });
//       }

//       const appointmentDto = new AppointmentDTO(appointment);
//       res.status(200).json({ appointment: appointmentDto });
//     } catch (err) {
//       next(err);
//     }
//   },

//   async update(req, res, next) {
//     const updateAppointmentSchema = Joi.object({
//       date: Joi.date().required(),
//       time: Joi.string().required(),
//       tailor: Joi.string().regex(mongodbIdPattern).required(),
//       customer: Joi.string().regex(mongodbIdPattern).required(),
//       description: Joi.string().optional(),
//       appointmentId: Joi.string().regex(mongodbIdPattern).required(),
//     });

//     const { error } = updateAppointmentSchema.validate(req.body);

//     if (error) {
//       return next(error);
//     }

//     const { date, time, tailor, customer, description, appointmentId } = req.body;

//     try {
//       const appointment = await Appointment.findByIdAndUpdate(
//         appointmentId,
//         { date, time, tailor, customer, description },
//         { new: true }
//       );

//       if (!appointment) {
//         return res.status(404).json({ message: 'Appointment not found' });
//       }

//       const appointmentDto = new AppointmentDTO(appointment);
//       res.status(200).json({ appointment: appointmentDto });
//     } catch (err) {
//       next(err);
//     }
//   },

//   async delete(req, res, next) {
//     const { id } = req.params;

//     if (!mongodbIdPattern.test(id)) {
//       return res.status(400).json({ message: 'Invalid appointment ID' });
//     }

//     try {
//       const appointment = await Appointment.findByIdAndDelete(id);

//       if (!appointment) {
//         return res.status(404).json({ message: 'Appointment not found' });
//       }

//       res.status(200).json({ message: 'Appointment deleted successfully' });
//     } catch (err) {
//       next(err);
//     }
//   },
// };

// module.exports = appointmentController;

const Appointment = require('../models/appointment');
const AppointmentDTO = require('../dto/appointment');
const User = require('../models/user');
const Joi = require('joi');

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const appointmentController = {
    async create(req, res, next) {
        const appointmentSchema = Joi.object({
            date: Joi.date().required(),
            time: Joi.string().required(),
            tailor: Joi.string().regex(mongodbIdPattern).required(),
            customer: Joi.string().regex(mongodbIdPattern).required(),
            description: Joi.string().optional()
        });

        const { error } = appointmentSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { date, time, tailor, customer, description } = req.body;

        try {
            const appointment = new Appointment({
                date, time, tailor, customer, description
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
            const { tailorId } = req.params; // Get the tailorId from the request parameters
            const appointments = await Appointment.find({ tailor: tailorId }).populate('tailor').populate('customer');
            const appointmentsDto = appointments.map(appt => new AppointmentDTO(appt));
            return res.status(200).json({ appointments: appointmentsDto });
        } catch (error) {
            return next(error);
        }
    }
    
};

module.exports = appointmentController;
