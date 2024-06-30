const express = require('express');
const authController = require('../controller/authController');
const blogController = require('../controller/blogController');
const appointmentController = require('../controller/appointmentController');
const auth = require('../middlewares/auth');

const router = express.Router();
router.get('/', (req, res) => {
    console.log("working");
    res.status(200).json({
        message: "working"
    });
});

// user

// register
router.post('/register', authController.register);

// login
router.post('/login', authController.login);

// logout
router.post('/logout', auth, authController.logout);

// reset password
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// refresh
router.get('/refresh', authController.refresh);

// update profile image
router.post('/updateProfileImage/:id', auth, authController.updateProfileImage);

// get profile img
router.get('/users/:userId/profile-image', auth, authController.getProfileImage);


router.put('/users/:id', auth, authController.updateUserDetails);
router.get('/users/:id', auth, authController.getUserDetails);




// blog
// create
router.post('/blog', auth, blogController.create);
// get all
// router.get('/blog/all', auth, blogController.getAll);
router.get('/blog/all', blogController.getAll);
// get blog by id
router.get('/blog/:id', auth, blogController.getById);
// update
router.put('/blog', auth, blogController.update);
// delete
router.delete('/blog/:id', auth, blogController.delete);



// appointments
router.post('/appointments', auth, appointmentController.create);
router.get('/appointment/:tailorId', auth, appointmentController.getAll);
router.get('/customer-appointments/:customerId', auth, appointmentController.getCustomerAppointments);
router.delete('/appointments/:id', auth, appointmentController.delete);



module.exports = router;