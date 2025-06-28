import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchApplicants } from "../store/actions/JobActions";
import Loading from "../components/Loading";
import axios from "../utils/axios"; 

const Applicants = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 

  const { applicants, loading, error } = useSelector((state) => state.job);

  const [jobTitle, setJobTitle] = useState("");

  // Fetch applicants
  useEffect(() => {
    dispatch(fetchApplicants(id));
  }, [dispatch, id]);

  // Fetch job title
  useEffect(() => {
    const fetchJobTitle = async () => {
      try {
        const res = await axios.get(`/jobs/${id}`);
        setJobTitle(res.data.job.title);
      } catch (err) {
        console.error("Error fetching job title", err);
      }
    };
    fetchJobTitle();
  }, [id]);

  return (
    <div className="min-h-screen mt-17 text-white px-6 py-10 k">
      <h2 className="text-3xl font-[gilroy] mb-12 text-center text-white">
         {"Applicants" || <Loading/>}
      </h2>

      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-center text-lg">Error: {error}</p>
      ) : applicants.length === 0 ? (
        <p className="text-zinc-400 text-center text-lg">
          No applicants yet. Be the first to apply!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
         {applicants.map((applicant) => {
 

  return (
    <div
      key={applicant._id}
      className="bg-[#171717] p-7 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <h3 className="text-2xl font-[hel]  mb-2">{applicant.name}</h3>
      <p className="text-zinc-400 text-sm mb-3">{applicant.email}</p>

      {applicant.bio && (
        <p className="text-zinc-300 text-base leading-relaxed mb-4 italic">
          "{applicant.bio}"
        </p>
      )}

      <div className="flex items-center gap-4 mb-4">
        {applicant.links?.github && (
          <a
            href={applicant.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-[#24cfa5] flex items-center gap-1 underline text-sm transition-colors duration-200"
          >
            GitHub
          </a>
        )}

        {applicant.links?.linkedin && (
          <a
            href={applicant.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-[#24cfa5] flex items-center gap-1 underline text-sm transition-colors duration-200"
          >
            LinkedIn
          </a>
        )}
      </div>

      {applicant.resume && (
        <a
          href={applicant.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 bg-[#24cfa5] text-black px-5 py-2 rounded-lg font-semibold hover:bg-[#1fb292] transition-colors duration-200"
        >
          View Resume
        </a>
      )}
    </div>
  );
})}

        </div>
      )}
    </div>
  );
};

export default Applicants;
