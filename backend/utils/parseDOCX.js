const fs = require('fs');
const mammoth = require('mammoth');

const extractDocxText = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
};

module.exports = extractDocxText;
