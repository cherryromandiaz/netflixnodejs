const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
  viewingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
  preferences: {
    genres: [String],
    language: String,
    autoplayNext: { type: Boolean, default: true }
  },
  subscriptionStatus: { type: String, enum: ['Free', 'Premium', 'Cancelled'], default: 'Free' },
  profilePicture: { type: String, default: '/images/default-profile.png' }
}, { timestamps: true });

const User = mongoose.model('User', profileSchema);

module.exports = User;
