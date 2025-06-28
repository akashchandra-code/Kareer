const express = require('express');
const router = express.Router();
const {
  createJob,
  deleteJob,
  getApplicants,
  updateApplicationStatus,
  getCompanyJobs,
  getAllJobs,
  getJobById,
} = require('../controllers/jobController');

const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// ✅ Public route for users to see all jobs
router.get('/', getAllJobs);

// 🔒 Company-only routes 
router.post('/create', protect, authorizeRoles('company'), createJob);
router.get('/company', protect, authorizeRoles('company'), getCompanyJobs);
router.get('/:jobId/applicants', protect, authorizeRoles('company'), getApplicants);
router.put('/:jobId/applicants/:applicationId', protect, authorizeRoles('company'), updateApplicationStatus);
router.get('/:id', getJobById);
router.delete('/:id', protect, authorizeRoles('company'), deleteJob);

module.exports = router;
