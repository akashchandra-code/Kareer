import React from "react";
import {
  UserPlus,
  FileText,
  Target,
  Briefcase,
  ClipboardList,
  Users,
  CheckCircle,
} from "lucide-react";

const seekerSteps = [
  {
    title: "Create Account",
    icon: <UserPlus className="text-[#00e0b7] w-8 h-8" />,
    points: [
      "Sign up quickly with email or Google.",
      "Build your resume and job profile.",
      "Set preferences for job alerts.",
      "Ready to apply in just minutes.",
    ],
  },
  {
    title: "Apply to Jobs",
    icon: <FileText className="text-[#00e0b7] w-8 h-8" />,
    points: [
      "Explore AI-recommended jobs.",
      "Use filters to refine your search.",
      "Apply in one click — fast & simple.",
      "Track all your applications easily.",
    ],
  },
  {
    title: "Match & Get Hired",
    icon: <Target className="text-[#00e0b7] w-8 h-8" />,
    points: [
      "AI matches resume to top jobs.",
      "Get personalized job suggestions.",
      "Receive interview invites directly.",
      "Land your dream job efficiently.",
    ],
  },
];

const companySteps = [
  {
    title: "Create Company Profile",
    icon: <Briefcase className="text-[#00e0b7] w-8 h-8" />,
    points: [
      "Register and verify your company.",
      "Showcase brand, roles, and mission.",
      "Attract job seekers with your profile.",
      "Secure and trusted employer badge.",
    ],
  },
  {
    title: "Post Job Listings",
    icon: <ClipboardList className="text-[#00e0b7] w-8 h-8" />,
    points: [
      "Create jobs with role details, skills.",
      "Mention location, CTC, requirements.",
      "Schedule posts or publish instantly.",
      "Reach candidates instantly.",
    ],
  },
  {
    title: "Hire Talented People",
    icon: <Users className="text-[#00e0b7] w-8 h-8" />,
    points: [
      "View detailed applicant profiles.",
      "Download resumes, shortlist easily.",
      "Contact via email to interview.",
      "Build your team faster and smarter.",
    ],
  },
];

const Card = ({ icon, title, points }) => (
  <div className="bg-[#121212] rounded-xl p-6 border-t-4 border-[#00e0b7] shadow-md hover:-translate-y-2 transition-transform duration-300 min-h-[340px] flex flex-col justify-start w-full sm:w-[48%] lg:w-[32%]">
    <div className="flex justify-center mb-6">{icon}</div>
    <h3 className="text-xl font-[hel] text-center mb-6">{title}</h3>
    <ul className="text-sm text-gray-300 space-y-2">
      {points.map((point, idx) => (
        <li key={idx} className="flex items-start mt-1 gap-3">
          <CheckCircle className="w-4 h-4  text-[#00e0b7] mt-0.5" />
          <span className="text-[1.1rem]">{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="bg-black text-white py-16 px-4">
      <h2 className="md:text-[4rem] text-[3rem]  font-[neu] text-center mb-12 md:mb-25">
        How It Works
      </h2>

      {/* Job Seekers Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <h3 className="text-2xl sm:text-3xl font-[neu] mb-8 text-center">
          For Job Seekers
        </h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {seekerSteps.map((step, index) => (
            <Card key={index} {...step} />
          ))}
        </div>
      </div>

      {/* Companies Section */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-[neu] mb-8 text-center">
          For Companies
        </h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {companySteps.map((step, index) => (
            <Card key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
