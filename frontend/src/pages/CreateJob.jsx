import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../store/actions/JobActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ added
  const { loading } = useSelector((state) => state.job);

  const [job, setJob] = useState({
    title: "",
    salary: "",
    description: "",
    shortDescription: "",
    skills: "",
    location: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      ...job,
      requiredSkills: job.skills.split(",").map((s) => s.trim()),
    };

    dispatch(createJob(jobData))
      .unwrap()
      .then(() => {
        toast.success("Job created successfully!");

        // ✅ Reset the form
        setJob({
          title: "",
          salary: "",
          shortDescription: "",
          description: "",
          skills: "",
          location: "",
        });

        // ✅ Navigate to the dashboard
        navigate("/company-dashboard");
      })
      .catch((err) => {
        toast.error(err || "Job was not created. Please try again.");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen mt-10 px-6 py-12 text-white">
      <h2 className="text-4xl font-[neu] mb-9 text-center">List a Job</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-8 rounded-xl flex flex-col gap-6 shadow-lg"
      >
        {/* Job Fields */}
        {[
          { name: "title", label: "Job Title", placeholder: "Enter job title" },
          {
            name: "skills",
            label: "Required Skills",
            placeholder: "e.g., React, Node.js, MongoDB",
          },
          {
            name: "shortDescription",
            label: "Short Description",
            placeholder: "e.g., Looking for Web Developer",
          },
          { name: "location", label: "Location", placeholder: "e.g., Remote, Bangalore" },
          { name: "salary", label: "Salary", placeholder: "e.g., ₹10-15 LPA" },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className="block mb-2 text-sm font-semibold">{label}</label>
            <input
              type="text"
              name={name}
              value={job[name]}
              onChange={handleChange}
              placeholder={placeholder}
              required
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
            />
          </div>
        ))}

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-semibold">Description</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            placeholder="Write a job description..."
            rows="4"
            required
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#24cfa5] text-black font-semibold py-3 rounded-lg hover:bg-[#1fb292] transition"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
