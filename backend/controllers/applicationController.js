const Application = require('../models/Application');
const Job = require('../models/Job'); 
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const { fileTypeFromBuffer } = require("file-type");

exports.applyToJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;

    const alreadyApplied = await Application.findOne({ job: jobId, applicant: userId });
    if (alreadyApplied) return res.status(400).json({ message: "Already applied." });

    let resumeUrl = "";
    if (req.file) {
      const localPath = req.file.path;


      const fileBuffer = fs.readFileSync(localPath);
      const fileInfo = await fileTypeFromBuffer(fileBuffer);

      if (!fileInfo || fileInfo.mime !== "application/pdf") {
        fs.unlinkSync(localPath); 
        return res.status(400).json({ message: "Invalid PDF file." });
      }


      const cloudRes = await cloudinary.uploader.upload(localPath, {
        resource_type: "auto",
        folder: "resumes",
         use_filename: true,
         unique_filename: false,
      });

      resumeUrl = cloudRes.secure_url;
      console.log(resumeUrl)
      fs.unlinkSync(localPath);
    }

    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resumeUrl,
    });

    await Job.findByIdAndUpdate(jobId, {
      $addToSet: { applicants: userId },
    });

    res.status(201).json({ message: "Applied successfully", application });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while applying" });
  }
};




exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title location');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get applications' });
  }
};

