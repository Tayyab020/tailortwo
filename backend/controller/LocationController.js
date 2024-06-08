const Joi = require('joi');
const User = require('../models/user');
const UserDTO = require('../dto/user');

const locationController = {
  async saveLocation(req, res, next) {
    const { userId, location } = req.body;

    const schema = Joi.object({
      userId: Joi.string().required(),
      location: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }).required(),
    });

    const { error } = schema.validate({ userId, location });
    if (error) {
      return next(error);
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.location = location;
      await user.save();

      const userDto = new UserDTO(user);
      return res.status(200).json({ message: 'Location updated successfully', user: userDto });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = locationController;
