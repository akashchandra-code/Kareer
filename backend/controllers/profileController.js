const User = require('../models/User');
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.updateProfile = async (req, res) => {
  try {
    const updates = {
      bio: req.body.bio,
      links: {
        linkedin: req.body.linkedin,
        github: req.body.github,
      },
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_pictures",
      });
      updates.profilePicture = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed" });
  }
};


exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};
