const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

router.get('/media', async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
