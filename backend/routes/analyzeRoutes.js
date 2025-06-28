const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middlewares/authMiddleware');
const { analyzeResume } = require('../controllers/analyzeController');
const path = require('path');
const upload = require('../middlewares/uploadResume');



router.post('/', protect, upload.single('resume'), analyzeResume);


    
module.exports = router;
