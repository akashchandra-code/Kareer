import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// Apply for a job
export const applyForJob = createAsyncThunk(
  "application/apply",
  async ({ jobId, resume }) => {
    const res = await axios.post(`/applications/${jobId}/apply`, resume, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);

// Get applied jobs for a user
export const getAppliedJobs = createAsyncThunk(
  "application/appliedJobs",
  async () => {
    const res = await axios.get(`/applications/me`);
    return res.data;
  }
);

// Get applicants for a job (for company)
export const getJobApplicants = createAsyncThunk(
  "application/jobApplicants",
  async (jobId) => {
    const res = await axios.get(`/jobs/${jobId}/applicants`);
    return res.data;
  }
);
