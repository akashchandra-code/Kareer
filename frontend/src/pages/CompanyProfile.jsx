import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, getProfile } from "../store/actions/ProfileActions";
import { toast } from "react-toastify";
import pfp from "../assets/pfp.jpg"
const CompanyProfile = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { profile, loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    bio: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        profilePicture: profile.profilePicture || "",
        bio: profile.bio || "",
      });
    }
  }, [profile]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
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

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("bio", formData.bio);

    if (formData.profilePicture instanceof File) {
      data.append("profilePicture", formData.profilePicture);
    }

    dispatch(updateProfile(data))
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch(() => {
        toast.error("Failed to update profile");
      });
  };

  const getImageSrc = () => {
  console.log("🖼 profilePicture value:", formData.profilePicture);

  if (formData.profilePicture instanceof File) {
    console.log("🧾 File preview URL:", URL.createObjectURL(formData.profilePicture));
    return URL.createObjectURL(formData.profilePicture);
  }

  const url = formData.profilePicture
    ? `http://localhost:4000/${formData.profilePicture}`
    : pfp;

  console.log("🌐 Final image URL:", url);
  return url;
};
  return (
    <div className="min-h-screen  mt-10 flex justify-center items-center px-4 py-12 text-white">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl w-full max-w-2xl shadow-xl border border-white/10"
      >
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
               autoComplete="off" 
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <h2 className="text-2xl font-bold mt-4">
            {formData.name || "Company Name"}
          </h2>
          <p className="text-zinc-400 text-sm">
            {formData.email || "you@example.com"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 text-sm">Company Name</label>
            <input
              type="text"
              name="name"
               autoComplete="off" 
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
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Bio</label>
          <textarea
            name="bio"
            maxLength={250}
            value={formData.bio}
            onChange={handleChange}
             autoComplete="off" 
            className="w-full p-3 bg-zinc-800 rounded resize-none"
            rows="4"
            placeholder="Tell us about your company..."
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

export default CompanyProfile;