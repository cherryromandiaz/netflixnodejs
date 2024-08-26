const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, req.params.userId + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes with authentication middleware
router.use(authMiddleware);

router.get('/:userId', userController.getUserProfile);
router.put('/:userId', userController.updateUserProfile);
router.post('/:userId/picture', upload.single('profilePicture'), userController.updateProfilePicture);
router.post('/:userId/watchlist/:videoId', userController.addToWatchlist);

module.exports = router;
