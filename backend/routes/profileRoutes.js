const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadImage');
const { updateProfile, getMyProfile } = require('../controllers/profileController');

router.patch('/', protect, upload.single('profilePicture'), updateProfile);
router.get('/', protect, getMyProfile);

module.exports = router;
