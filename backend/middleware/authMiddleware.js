const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({message: 'Access denied. No token provided.'});
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request
    req.user = decoded;

    // Check if the user still exists in the database
    User.findById(decoded.userId, (err, user) => {
      if (err || !user) {
        return res
          .status(401)
          .json({message: 'Invalid token. User not found.'});
      }

      // Check if the token role matches the user role
      if (decoded.role !== user.role) {
        return res.status(401).json({message: 'Invalid token. Role mismatch.'});
      }

      // Continue to the next middleware or route
      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({message: 'Invalid token.'});
  }
};
