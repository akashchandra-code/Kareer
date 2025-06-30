import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { analyzeResume } from "../store/actions/AnalyzeActions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AnalyzeResume = () => {
  const [file, setFile] = useState(null);
  const [analyzed, setAnalyzed] = useState(false); 
  const dispatch = useDispatch();

  const { matchedJobs, loading, error } = useSelector((state) => state.analyze);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
  if (!file) {
    toast.error("Please upload a resume.");
    return;
  }

  try {
    await dispatch(analyzeResume(file)).unwrap();
    setAnalyzed(true);
  } catch (error) {
    console.error("Resume analysis failed:", error);

    
    if (error?.message?.includes("Unsupported file format")) {
      toast.error("Only PDF files are supported. Please upload a valid resume.");
    } else {
      toast.error(error?.message || "Something went wrong during analysis.");
    }
  }
};


  return (
    <div className="min-h-screen mt-15 w-full px-4 sm:px-6 lg:px-8 py-12 text-white">
      <h2 className="whitespace-nowrap text-[6vw] sm:text-3xl md:text-4xl font-[gilroy] mb-12 text-center">
        Analyze Your Resume
      </h2>

      <div className="w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8 rounded-2xl shadow-lg">
        <label
          htmlFor="resume-upload"
          className="block text-zinc-300 text-sm font-[hel] mb-2"
        >
          Upload your resume (PDF):
        </label>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-6 w-full md:w-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-[hel] file:bg-[#24cfa5] file:text-black hover:file:bg-[#1fb292] transition duration-200 cursor-pointer border border-zinc-700 rounded-lg"
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={handleAnalyze}
            className="w-full sm:w-auto bg-[#24cfa5] text-black font-[neu] font-bold py-3 px-6 rounded-lg hover:bg-[#1fb292] transition duration-200 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#24cfa5] focus:ring-opacity-75"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {error && <p className="mt-6 text-red-400 text-center">{error}</p>}

        {matchedJobs.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl sm:text-3xl font-[neu] mb-8 text-center text-zinc-200">
              Recommended Jobs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedJobs.map((job) => (
                <div
                  key={job._id}
                  className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] py-8 px-6 rounded-xl flex flex-col shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform border border-[#2a2a2a] group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#24cfa5] rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <h3 className="text-xl md:text-2xl font-[gilroy] text-white mb-3 leading-tight tracking-wide">
                    {job.title}
                  </h3>

                  <p className="text-zinc-400 font-[hel] text-sm md:text-base mb-2">
                    {job.companyName || "Confidential Company"}
                  </p>

                  <p className="text-zinc-500 text-sm mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center text-zinc-500 text-xs mb-5 gap-x-4">
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4 text-[#24cfa5]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{job.location}</span>
                    </div>

                    {job.salary && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-4 w-4 text-[#24cfa5]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8.433 7.418c...Z" />
                        </svg>
                        <span>{job.salary}</span>
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/job/${job._id}`}
                    className="mt-auto bg-[#24cfa5] font-bold py-2 px-4 rounded-lg hover:bg-[#1fb292] transition duration-200 text-center text-white focus:outline-none focus:ring-2 focus:ring-[#24cfa5] focus:ring-opacity-50"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {analyzed && matchedJobs.length === 0 && !loading && !error && (
          <p className="mt-12 text-center text-zinc-400 text-lg">
            No recommended jobs based on your resume.
          </p>
        )}
      </div>
    </div>
  );
};

export default AnalyzeResume;
