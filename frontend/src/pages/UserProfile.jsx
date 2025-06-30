import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, getProfile } from "../store/actions/ProfileActions";
import { toast } from "react-toastify";

const UserProfile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { profile, loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    github: "",
    linkedin: "",
    bio: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
          console.log("🔥 profile from backend:", profile);
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        profilePicture: profile.profilePicture || "",
        github: profile.links?.github || "",
        linkedin: profile.links?.linkedin || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);

 const maxWords = 80;
   const handleChange = (e) => {
     const { name, value } = e.target;
     if (name === "bio") {
     const wordCount = value.trim().split(/\s+/).length;
 
     if (wordCount > maxWords) {
       toast.error(`Bio can't exceed ${maxWords} words`);
       return;
     }
   }
     setFormData((prev) => ({ ...prev, [name]: value }));
   };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Profile updated!");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("bio", formData.bio);
    data.append("linkedin", formData.linkedin);
    data.append("github", formData.github);

    if (formData.profilePicture instanceof File) {
      data.append("profilePicture", formData.profilePicture);
    }

    dispatch(updateProfile(data)).catch(() => {
      toast.error("Failed to update profile");
    });
  };

const getImageSrc = () => {
  console.log("🖼 profilePicture value:", formData.profilePicture);

  // If it's a new file uploaded locally
  if (formData.profilePicture instanceof File) {
    const localPreview = URL.createObjectURL(formData.profilePicture);
    console.log("🧾 File preview URL:", localPreview);
    return localPreview;
  }

  // If it's a Cloudinary URL already stored in the DB
  if (formData.profilePicture && formData.profilePicture.startsWith("http")) {
    console.log("🌐 Cloudinary image URL:", formData.profilePicture);
    return formData.profilePicture;
  }

  // Default fallback image
  return "/default-avatar.png";
};



  return (
    <div className="min-h-screen mt-10 flex justify-center items-center px-4 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl w-full max-w-2xl shadow-xl border border-white/10 "
      >
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="relative cursor-pointer group"
            onClick={handleImageClick}
          >
            <img
              src={getImageSrc()}
              alt=""
              className="w-24 h-24 rounded-full object-cover border-2 border-white transition group-hover:brightness-75"
            />
            <div className="absolute bottom-0 right-0 bg-[#24cfa5] rounded-full p-1 shadow-md">
              <span className="text-xs">✎</span>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <h2 className="text-2xl font-bold mt-4">
            {formData.name || "Your Name"}
          </h2>
          <p className="text-zinc-400 text-sm">
            {formData.email || "you@example.com"}
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-800 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full p-3 bg-zinc-800 rounded text-zinc-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">GitHub</label>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-800 rounded"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-3 bg-zinc-800 rounded"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-800 rounded resize-none"
            rows="4"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#24cfa5] hover:bg-[#1fb292] text-black font-semibold py-3 rounded mt-4 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
