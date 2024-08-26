const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

// Log in a user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
};

// Add a video to the user's watchlist
exports.addToWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const videoId = req.params.videoId;
    if (!user.watchlist.includes(videoId)) {
      user.watchlist.push(videoId);
      await user.save();
      res.status(200).send('Added to watchlist');
    } else {
      res.status(400).send('Already in watchlist');
    }
  } catch (error) {
    res.status(500).send('Error adding to watchlist');
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('watchlist');
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send('Error retrieving user profile');
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, updates, { new: true });
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send('Error updating user profile');
  }
};

// Update profile picture
exports.updateProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send('User not found');

    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ message: 'Profile picture updated', profilePicture: user.profilePicture });
  } catch (error) {
    res.status(500).send('Error updating profile picture');
  }
};
