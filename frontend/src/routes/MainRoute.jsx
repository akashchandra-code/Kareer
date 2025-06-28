import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy-loaded components
const Home = lazy(() => import("../pages/Home"));
const Jobs = lazy(() => import("../pages/Jobs"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const CreateJob = lazy(() => import("../pages/CreateJob"));
const AnalyzeResume = lazy(() => import("../pages/AnalyzeResume"));
const Profile = lazy(() => import("../pages/Profile"));
const JobDetail = lazy(() => import("../pages/JobDetail"));
const Applicants = lazy(() => import("../pages/Applicants"));
const UserSignup = lazy(() => import("../pages/UserSignup"));
const CompanySignup = lazy(() => import("../pages/CompanySignup"));
const CompanyDashboard = lazy(() => import("../pages/CompanyDashboard"));
const UserDashboard = lazy(() => import("../pages/UserDashboard"));
import Loading from "../components/Loading";

const MainRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/analyze-resume" element={<AnalyzeResume />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/job/:id/applicants" element={<Applicants />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/company" element={<CompanySignup />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoute;
