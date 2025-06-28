const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User'); 

// Create job
exports.createJob = async (req, res) => {
  try {
    const { title,shortDescription, description, location, salary, requiredSkills } = req.body;

    const job = await Job.create({
      title,
      shortDescription,
      description,
      location,
      salary,
      companyName:req.user.name,
       requiredSkills: requiredSkills.map(skill => skill.toLowerCase()), 
      createdBy: req.user.id
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Error creating job' });
  }
};
// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne(); 
    res.status(200).json({ message: 'Job deleted successfully' });

  } catch (err) {
    console.error('Delete Job Error:', err);
    res.status(500).json({ message: 'Error deleting job' });
  }
};


// Get all applicants for a job


exports.getApplicants = async (req, res) => {

  try {
    const jobId = req.params.jobId;

    // Find the job first and check ownership
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // ✅ Instead of populating job.applicants, get applications for that job
    const applications = await Application.find({ job: jobId }).populate({
      path: "applicant",
      select: "name email bio resume links",
    });

    // Return a clean array of applicants
    const result = applications.map((app) => ({
      _id: app.applicant._id,
      name: app.applicant.name,
      email: app.applicant.email,
      bio: app.applicant.bio,
      links: app.applicant.links,
      resume: app.resumeUrl, 
    }));

    res.status(200).json({ success: true, applicants: result });

  } catch (error) {
    console.error("❌ Error fetching applicants:", error);
    res.status(500).json({ message: "Server error" });
  }
};




exports.updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected', 'reviewed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const application = await Application.findById(applicationId).populate('job');

    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: 'Status updated', application });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
};

// Get all jobs created by the company
exports.getCompanyJobs = async (req, res) => {

  try {
    const jobs = await Job.find({ createdBy: req.user.id }).populate("applicants", "name email");
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch company jobs" });
  }
};



// controllers/jobController.js
exports.getAllJobs = async (req, res) => {
  try {
    let start = parseInt(req.query._start) || 0;
    const limit = parseInt(req.query._limit) || 9;
    const search = req.query.q?.trim() || "";

    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};
     

    const [total, jobs] = await Promise.all([
      Job.countDocuments(query),
      Job.find(query)
        .skip(start)
        .limit(limit)
        .sort({ createdAt: -1 }),
    ]);


    res.status(200).json({ jobs, total });
  } catch (err) {
    console.error("❌ Error fetching jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
};





          
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




