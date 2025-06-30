import React from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useJobFetcher from "../utils/useJobFetcher";
import Loading from "../components/Loading";

const UserDashboard = () => {
  const {
    filteredJobs,
    query,
    setQuery,
    fetchMoreJobs,
    hasMore,
    isLoading,
  } = useJobFetcher();
  console.log("🖼️ Filtered jobs to render:", filteredJobs);

  return (
    <div className="w-full min-h-screen mt-22 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-[neu]">Browse Jobs</h2>
          <div className="flex gap-4 w-full md:w-auto flex-wrap md:flex-nowrap">
            <input
              type="text"
              placeholder="Search jobs or company..."
              className="px-4 py-2 rounded-lg bg-zinc-800 w-full md:w-64"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          

            <Link to="/analyze-resume">
              <button className="bg-[#24cfa5] font-[hel] text-black px-4 py-2 rounded-lg hover:bg-[#1fb292] transition duration-200">
                Analyze Resume
              </button>
            </Link>
          </div>
        </div>

        {/* Jobs List */}
        <InfiniteScroll
          dataLength={filteredJobs.length}
          next={fetchMoreJobs}
          hasMore={hasMore}
          loader={isLoading && <Loading />}
          endMessage={
            <p className="text-center text-zinc-400 mt-6 font-[hel]">
              🎉 You have seen all jobs.
            </p>
          }
        >
          <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] py-8 px-6 rounded-xl w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col shadow-lg hover:shadow-2xl hover:translate-y-[-5px] transition-all duration-300 transform border border-[#2a2a2a] group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#24cfa5] rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <h3 className="text-2xl font-[hel] text-white mb-3 leading-tight tracking-wide">
                    {job.title}
                  </h3>
                  <p className="text-zinc-400 text-base mb-2 font-[hel]">
                    {job.companyName || "Confidential Company"}
                  </p>
                  <p className="hidden md:block text-zinc-500 text-sm mb-4 line-clamp-3">
                    {job.shortDescription}
                  </p>

                  <div className="flex items-center text-zinc-500 text-xs mb-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-[#24cfa5]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="mr-3 text-zinc-400">{job.location}</span>
                    {job.salary && (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-[#24cfa5]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM3 10a7 7 0 1114 0A7 7 0 013 10z" />
                        </svg>
                        <span className="text-zinc-400">{job.salary}</span>
                      </>
                    )}
                  </div>

                  <Link
                    to={`/job/${job._id}`}
                    className="mt-auto bg-[#24cfa5] font-bold font-[neu] py-3 px-6 rounded-lg hover:bg-[#1fb292] transition duration-200 text-center text-base focus:outline-none focus:ring-2 focus:ring-[#24cfa5] focus:ring-opacity-50"
                  >
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center w-full mt-10 font-[hel] text-zinc-500 text-lg">
                {isLoading
                  ? "Loading jobs..."
                  : "No job listings found for your search criteria."}
              </p>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default UserDashboard;
