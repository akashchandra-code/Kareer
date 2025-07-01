import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobById } from "../store/actions/JobActions";
import {
  applyForJob,
  getAppliedJobs,
} from "../store/actions/ApplicationActions";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, loading } = useSelector((state) => state.job);
  const [resumeFile, setResumeFile] = useState(null);
  const [applying, setApplying] = useState(false);
  const { appliedJobs } = useSelector((state) => state.application);
  const alreadyApplied = appliedJobs.includes(id);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(fetchJobById(id));
    dispatch(getAppliedJobs());
  }, [dispatch, id]);

  const handleApply = async () => {
    if (!resumeFile) {
      toast.error("please upload your resume ");
      return;
    }
    const allowedExtensions = [".pdf"];
    const fileExtension = resumeFile.name
      .slice(resumeFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Only PDF files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      setApplying(true);
      await dispatch(applyForJob({ jobId: id, resume: formData }));
      toast.success("Applied successfully!");
      dispatch(getAppliedJobs());
    } catch (error) {
      toast.error(error || "Application failed. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  if (loading || !job)
    return (
      <p className="text-white text-center mt-20">
        <Loading />
      </p>
    );

  return (
    <div className="min-h-screen mt-22 text-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto  p-8 md:p-10 rounded-2xl shadow-xl border border-[#2a2a2a]">
        {/* Job Header Section */}
        <div className="mb-8 pb-6 border-b border-zinc-700">
          <h1 className="text-4xl font-[gilroy] text-white mb-2 leading-tight">
            {job.title}
          </h1>
          <p className="text-zinc-300 text-lg mb-1 font-[hel]">
            {job.companyName}
          </p>
          <p className="text-zinc-500 text-md flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1 text-[#24cfa5]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {job.location}
            {job.salary && (
              <span className="ml-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 text-[#24cfa5]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8.433 7.418c.155-.16.347-.29.56-.381A9.012 9.012 0 0110 6c.725 0 1.45.093 2.158.287.213.091.405.221.56.382l.067.067A1.996 1.996 0 0114 9.15V11a2 2 0 11-4 0V9.15c0-.503.186-.983.525-1.341l.067-.067zM12 11V9.15c0-.1-.01-.2-.03-.298a.994.994 0 00-.335-.55c-.17-.16-.36-.29-.57-.38A7.002 7.002 0 0010 7c-.725 0-1.45.093-2.158.287-.213.091-.405.221-.56.382a.996 0 00-.335.55c-.02.098-.03.198-.03.298V11a2 2 0 114 0z" />
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-8a7 7 0 1114 0A7 7 0 013 10z" />
                </svg>
                {job.salary}
              </span>
            )}
          </p>
        </div>

        {/* Company Short Description */}
        {job.companyShortDescription && (
          <div className="mb-8">
            <h2 className="text-2xl font-[neu] text-white mb-3">
              About {job.companyName}
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              {job.companyShortDescription}
            </p>
          </div>
        )}

        {/* Job Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-[gilroy] text-white mb-3">
            Job Overview
          </h2>
          <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        {/* Required Skills */}
        {job.requiredSkills && job.requiredSkills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-[gilroy] text-white mb-3">
              Skills Required
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-[#2a2a2a]  px-4 py-1 rounded-full text-sm font-medium border border-[#3a3a3a]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Application Section */}
        <div className="border-t border-zinc-700 pt-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Apply for this Position
          </h2>

          {/* File Input */}
          <div className="mb-6">
            <label
              htmlFor="resume-upload"
              className="block text-zinc-300 text-sm font-medium mb-2"
            >
              Upload Your Resume (PDF)
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf"
              className="block w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2a2a2a] file:text-white hover:file:bg-[#3a3a3a] hover:file:cursor-pointer transition duration-200"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            disabled={alreadyApplied || applying}
            className={`w-full sm:w-auto py-3 px-8 rounded-lg text-lg font-[gilroy] shadow-md transition duration-200 focus:outline-none focus:ring-2
    ${
      alreadyApplied
        ? "bg-[#14675a] cursor-not-allowed"
        : "bg-[#24cfa5] hover:bg-[#1fb292] text-black focus:ring-[#24cfa5]"
    } ${applying ? "cursor-wait opacity-70" : ""}`}
          >
            {applying
              ? "Applying..."
              : alreadyApplied
              ? "Applied"
              : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
