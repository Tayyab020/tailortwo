const User = require('../models/user');
const Joi = require('joi');

const updateUserDetails = async (req, res, next) => {
  const userId = req.params.id;

  const userUpdateSchema = Joi.object({
    address: Joi.string().allow(''),
    phoneNumber: Joi.string().allow(''),
    availabilityTimeFrom: Joi.string().allow(''),
    availabilityTimeTo: Joi.string().allow(''),
  });

  const { error } = userUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Invalid data', error: error.details });
  }

  const updateData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
  updateUserDetails,
};
