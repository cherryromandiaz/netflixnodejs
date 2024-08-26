const express = require('express');
const router = express.Router();
const Recommendation = require('../services/recommendation');

router.get('/recommendations/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const recommendations = await Recommendation.getRecommendations(userId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});

module.exports = router;
