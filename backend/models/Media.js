const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  actors: [{ type: String }],
  director: { type: String },
  release_year: { type: Number }
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
