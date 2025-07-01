import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyJobs, deleteJob } from "../store/actions/JobActions";
import { Link, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import noJobsAnimation from "../assets/animation.json";

const CompanyDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { jobs, loading } = useSelector((state) => state.job);

  // ✅ Fetch jobs when location changes (e.g., after going back from create page)
  useEffect(() => {
    dispatch(fetchCompanyJobs());
  }, [dispatch, location.pathname]);

  // ✅ Validate job data
  const isValidJob = (job) => {
    const valid = job && typeof job === "object" && job._id && job.title;
    return valid;
  };

  // ✅ Filter valid jobs only
  const validJobs = Array.isArray(jobs) ? jobs.filter(isValidJob) : [];

  // ✅ Handle job deletion
  const handleDelete = async (jobId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this job?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#24cfa5",
      confirmButtonText: "Yes, delete it!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteJob(jobId)).unwrap();
        toast.success(" Job deleted successfully!");
        dispatch(fetchCompanyJobs());
      } catch (error) {
        console.error("❌ Delete job error:", error);
        toast.error("Failed to delete job");
      }
    }
  };

  // ✅ Log jobs every render for debugging
  useEffect(() => {
    if (!Array.isArray(jobs)) {
    }
  }, [jobs]);

  return (
    <div className="w-full mt-15 py-12 px-4 md:px-12 lg:px-24 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          Recruit Talent
        </h2>
        <Link to="/create-job">
          <button className="bg-[#24cfa5] text-black font-semibold py-2 px-6 rounded-lg hover:bg-[#1fb292] transition w-full md:w-auto">
            Create Job
          </button>
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : validJobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {validJobs.map((job) => (
            <div
              key={job._id}
              className="p-4 md:p-6 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 border border-white/10"
            >
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-semibold mb-1">
                  {job.title}
                </h3>
                <p className="text-zinc-300 text-sm md:text-base">
                  {job.location || "Unknown Location"}
                </p>
                <p className="text-zinc-300 text-sm md:text-base mt-2">
                  Applicants: {job.applicants?.length || 0}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto mt-4 md:mt-0">
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-zinc-800 hover:bg-[#4d0c0c] text-white px-5 py-2 rounded-lg w-full sm:w-auto"
                >
                  Delete Job
                </button>
                <Link to={`/job/${job._id}/applicants`}>
                  <button className="bg-[#24cfa5] hover:bg-[#1fb292] text-black px-5 py-2 rounded-lg w-full sm:w-auto">
                    View Applicants
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] sm:h-[70vh] text-center">
          <Lottie
            animationData={noJobsAnimation}
            loop
            className="w-[80%] max-w-md sm:max-w-lg md:max-w-xl"
          />
          <p className="text-zinc-400 mt-6 text-lg sm:text-xl">
            No jobs posted yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
