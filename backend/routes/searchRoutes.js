const express = require('express');
const router = express.Router();
const { searchDocuments } = require('../services/search');

router.get('/search', async (req, res) => {
  const { query, genre, actor, director } = req.query;
  try {
    const filters = [];
    if (genre) filters.push({ genre });
    if (actor) filters.push({ actors: actor });
    if (director) filters.push({ director });

    const results = await searchDocuments('media', query, filters);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
