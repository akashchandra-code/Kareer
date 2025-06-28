const path = require('path');
const extractSkillsFromResume = require('../utils/extractSkillsFromResume'); 
const Job = require('../models/Job');
const matchJobs = require('../utils/matchJobs');

exports.analyzeResume = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Read file content (depending on file type, you can re-use your pdf/docx text extractor)
    // For simplicity, assume you have a function to extract plain text from file
    let resumeText;
    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === '.pdf') {
      const extractPDFText = require('../utils/parsePDF');
      resumeText = await extractPDFText(file.path);
    } else if (ext === '.docx') {
      const extractDocxText = require('../utils/parseDOCX');
      resumeText = await extractDocxText(file.path);
    } else {
      return res.status(400).json({ message: 'Unsupported file format' });
    }

    // Now use Gemini AI to extract relevant skills from the resume text
    const extractedSkills = await extractSkillsFromResume(resumeText);
    
    // Fetch all jobs from DB
    const jobs = await Job.find();

    // Match extracted skills with job requiredSkills
    const matchedJobs = matchJobs(extractedSkills, jobs);

    res.status(200).json({ matchedJobs });
  } catch (err) {
    console.error('Analyze Error:', err);
    res.status(500).json({ message: 'Server error during analysis' });
  }
};
