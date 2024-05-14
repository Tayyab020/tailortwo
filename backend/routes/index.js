const express = require('express');
const authController = require('../controller/authController');
const blogController = require('../controller/blogController');
const commentController = require('../controller/commentController');
const auth = require('../middlewares/auth');

const router = express.Router();
router.get('/',(req, res) => {
    console.log("working")
    res.status(200).json(
        {
            message : "working"
        }
    )
});

// user

// register
router.post('/register', authController.register);

// login
router.post('/login', authController.login);

// logout
router.post('/logout', auth, authController.logout)

// refresh
router.get('/refresh', authController.refresh);

// blog

// create
router.post('/blog', auth, blogController.create);
// router.post('/blog', blogController.create);

// get all

// router.get('/blog/all', auth, blogController.getAll);
router.get('/blog/all', blogController.getAll);

// get blog by id

router.get('/blog/:id', auth, blogController.getById);

// router.get('/blog/:id',  blogController.getById);

// update
router.put('/blog', auth, blogController.update);

// delete
router.delete('/blog/:id', auth, blogController.delete);

// comment
// create 
router.post('/comment', auth, commentController.create);

// get 
router.get('/comment/:id', auth, commentController.getById);

module.exports = router;