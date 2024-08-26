const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).send('Error retrieving profile');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findById(req.user.id);
    if (email) user.email = email;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).send('Error updating profile');
  }
};
