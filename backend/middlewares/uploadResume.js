// middleware/uploadResume.js
const createMulter = require("../config/multerConfig");
const path = require("path");

const uploadResume = createMulter(
  path.join(__dirname, "../uploads/resumes"),
  null,
  [".pdf"]
);

module.exports = uploadResume;
