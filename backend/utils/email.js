// utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "Tayyabhussain070@gmail.com",
    pass: "mcfm kxqw rtkl ofln",
  },
});

// utils/email.js
const sendResetEmail = (to, verificationCode) => {
    const mailOptions = {
      from: "Tayyabhussain070@gmail.com",
      to,
      subject: 'Password Reset Verification Code',
      html: `<p>Your password reset verification code is: <strong>${verificationCode}</strong></p>`,
    };
  
    return transporter.sendMail(mailOptions);
  };
  
  module.exports = { sendResetEmail };
  

module.exports = { sendResetEmail };
