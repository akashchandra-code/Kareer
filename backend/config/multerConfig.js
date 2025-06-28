const multer = require("multer");
const path = require("path");
const fs = require("fs");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const createMulter = (folderPath, fileFilter, allowedTypes) => {
  ensureDir(folderPath);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, folderPath),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
  });

  const finalFilter = fileFilter
    ? fileFilter
    : (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) cb(null, true);
        else cb(new Error(`Only ${allowedTypes.join(", ")} files are allowed`), false);
      };

  return multer({
    storage,
    fileFilter: finalFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });
};

module.exports = createMulter;