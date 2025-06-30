import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/actions/AuthActions";
import { useNavigate, Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(loginUser(formData)).unwrap();
      if (res) {
        toast.success("Login successfully!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error || "Login failed, Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen mt-10 flex flex-col md:flex-row">
      {/* Left Branding Section */}
      <div className="hidden md:flex w-1/2 text-white items-center justify-center p-10">
        <div className="text-center">
          <div className="text-[#24cfa5] mb-4 flex justify-center">
            <LogIn className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold font-[neu] mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Log in to continue your journey on{" "}
            <span className="text-[#24cfa5]">Kareer</span> — your AI-powered job
            portal.
          </p>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-black px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-[#171717] text-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-[neu] mb-6 text-center">Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
             autoComplete="off" 
            className={`w-full p-3 rounded bg-zinc-800 mb-1 ${
              emailError && "border border-red-500"
            }`}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
             autoComplete="off" 
            placeholder="Password"
            className="w-full p-3 rounded bg-zinc-800 mb-6"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#24cfa5] hover:bg-[#1fb292] text-black font-[neu] py-3 rounded mb-4"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#24cfa5] hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
