class AppointmentDTO {
    constructor(appointment) {
      this._id = appointment._id;
      this.date = appointment.date;
      this.time = appointment.time;
      this.tailor = appointment.tailor;
      this.customer = appointment.customer;
      this.description = appointment.description;
      this.visitMode = appointment.visitMode;
      this.deliveryMode = appointment.deliveryMode;
      this.address = appointment.address;
      this.phoneNumber = appointment.phoneNumber;
    }
  }
  
  module.exports = AppointmentDTO;
  