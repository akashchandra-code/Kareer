import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, User } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  bg-black flex items-center justify-center px-4 py-10 text-white">
      <div className="flex flex-col sm:flex-row gap-8 max-w-4xl w-full justify-center items-center">
        {/* Job Seeker Card */}
        <div
          onClick={() => navigate("/signup/user")}
          className="bg-[#171717] hover:shadow-xl border-t-4 border-[#24cfa5] rounded-xl p-10 text-center w-full sm:w-96 cursor-pointer transition-transform hover:-translate-y-2"
        >
          <div className="flex justify-center mb-6">
            <User className="w-10 h-10 text-[#24cfa5]" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">For Job Seekers</h2>
          <p className="text-gray-300 text-sm">
            Find your dream job. Get matched by AI. Track applications easily
            and get hired faster.
          </p>
        </div>

        {/* Employer Card */}
        <div
          onClick={() => navigate("/signup/company")}
          className="bg-[#171717] hover:shadow-xl border-t-4 border-[#24cfa5] rounded-xl p-10 text-center w-full sm:w-96 cursor-pointer transition-transform hover:-translate-y-2"
        >
          <div className="flex justify-center mb-6">
            <Briefcase className="w-10 h-10 text-[#24cfa5]" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">For Employers</h2>
          <p className="text-gray-300 text-sm">
            Create jobs, view applicants, and hire the best candidates using
            AI-powered tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
