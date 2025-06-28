// middleware/uploadImage.js
const createMulter = require("../config/multerConfig");
const path = require("path");

const uploadImage = createMulter(
  path.join(__dirname, "../uploads/profile_pictures"),
  null,
  [".jpeg", ".jpg", ".png"]
);

module.exports = uploadImage;
