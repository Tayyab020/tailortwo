const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
  try {
    const {email, password, role} = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(400).json({message: 'Email already registered'});
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || 'customer', // Default to 'customer' if role not provided
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

exports.home = async (req, res) => {
 console.log("Home");
};


// Login user
exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Check if the user exists
    const user = await User.findOne({email});

    if (!user) {
      return res.status(401).json({message: 'Invalid credentials'});
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({message: 'Invalid credentials'});
    }

    // Generate a JWT token
    const token = jwt.sign(
      {userId: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '24h'},
    );

    res.json({token, role: user.role});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

// Handle Google authentication
exports.googleAuth = async (req, res) => {
  try {
    const {googleId, email, role} = req.body;

    // Check if the user exists
    let user = await User.findOne({email});

    if (!user) {
      // If the user doesn't exist, create a new user with Google credentials
      user = new User({
        email,
        role: role || 'customer', // Default to 'customer' if role not provided
      });
    }

    // Update or set the Google ID for the user
    user.googleId = googleId;

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      {userId: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '24h'},
    );

    res.json({token, role: user.role});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};

// Handle Facebook authentication
exports.facebookAuth = async (req, res) => {
  try {
    const {facebookId, email, role} = req.body;

    // Check if the user exists
    let user = await User.findOne({email});

    if (!user) {
      // If the user doesn't exist, create a new user with Facebook credentials
      user = new User({
        email,
        role: role || 'customer', // Default to 'customer' if role not provided
      });
    }

    // Update or set the Facebook ID for the user
    user.facebookId = facebookId;

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      {userId: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: '24h'},
    );

    res.json({token, role: user.role});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Internal Server Error'});
  }
};
