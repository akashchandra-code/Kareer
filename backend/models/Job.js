const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  shortDescription:String,
  description: String,
  location: String,
  salary: String,
  companyName:String,
  requiredSkills: [String], 
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
