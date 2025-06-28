import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/actions/AuthActions';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { toast } from 'react-toastify';

const UserSignup = () => {
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await dispatch(registerUser(formData)).unwrap();
    if (res) {
       toast.success("Registration successful!");
      navigate("/login");  
    }
  } catch (error) {
     toast.error(error || "Registration failed. Please try again.");
    console.error("Registration failed:", error);
  }
};

  return (
      <div className="min-h-screen mt-10 flex flex-col md:flex-row">
      {/* Left Branding Section */}
      <div className="hidden md:flex w-1/2  text-white items-center justify-center p-10">
        <div className="text-center">
          <div className="text-[#24cfa5] mb-4 flex justify-center">
            <Briefcase className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-[neu] mb-2">Kareer for Job Seekers</h1>
          <p className="text-gray-400">
            Discover opportunities, match your skills, and land your dream job with AI-powered assistance.
          </p>
        </div>
      </div>

      {/* Right Signup Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-black px-4 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-[#171717] text-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-3xl font-[neu] mb-6 text-center">Sign Up</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-zinc-800 mb-4"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-zinc-800 mb-4"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-zinc-800 mb-6"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-[#24cfa5] hover:bg-[#1fb292] text-black font-[neu] py-3 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
