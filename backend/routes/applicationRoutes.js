const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");
const { applyToJob } = require("../controllers/applicationController");
const upload = require("../middlewares/uploadResume");
const { getMyApplications } = require("../controllers/applicationController");
// User applies to job + uploads resume
router.post(
  "/:jobId/apply",
  protect,
  authorizeRoles("user"), 
  upload.single("resume"),
  applyToJob
);

router.get("/me", protect, authorizeRoles("user"), getMyApplications);
module.exports = router;
