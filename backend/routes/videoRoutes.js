const express = require('express');
const { uploadVideo, streamVideo, getVideoDetails, searchVideos } = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/upload', authMiddleware, upload.single('video'), uploadVideo);
router.get('/stream/:filename', streamVideo);
router.get('/:id', getVideoDetails);
router.get('/search/:query', searchVideos);

module.exports = router;
