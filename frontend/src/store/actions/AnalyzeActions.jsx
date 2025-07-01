import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// Upload resume and get matched jobs
export const analyzeResume = createAsyncThunk(
  "analyze/analyzeResume",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await axios.post("/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.matchedJobs;
    } catch (err) {
      const message = err.response?.data?.message || "Resume analysis failed";
      return rejectWithValue(message);
    }
  }
);
