const matchJobs = (resumeKeywords, allJobs) => {
  return allJobs
    .map(job => {
      const jobSkills = job.requiredSkills.map(skill => skill.toLowerCase());
      const matchCount = jobSkills.filter(skill => resumeKeywords.includes(skill)).length;
      const score = (matchCount / jobSkills.length) * 100;
      return { ...job._doc, matchScore: Math.floor(score) };
    })
    .filter(job => job.matchScore >= 20) // filter threshold
    .sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = matchJobs;
