const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY 
});
async function extractSkillsFromResume(text) {
    const prompt = `
Based on the following resume text, extract only technical and job-relevant hard skills.
Return these skills as a comma-separated list, in lowercase.
Exclude any soft skills (e.g., communication, teamwork, leadership, problem-solving, hardworking, motivated, adaptable, etc.).
Exclude personal details or generic keywords.
If no technical skills are found, return an empty string.

Resume Text:
"""
${text}
"""

List of Skills (comma-separated, lowercase):
`;


  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  const skillsText = response.text.trim();
  // Assuming skills are comma separated, split and clean
  const skillsArray = skillsText.split(',').map(s => s.trim().toLowerCase());

  return skillsArray;
}

module.exports = extractSkillsFromResume;
