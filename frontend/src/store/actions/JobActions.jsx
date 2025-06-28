import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
//fetch all jobs
export const fetchJobs = createAsyncThunk(
  "job/fetchJobs",
  async ({ search = "", start = 0, limit = 9 }) => {
    const res = await axios.get(`/jobs?_start=${start}&_limit=${limit}&q=${search}`);
    return {
      jobs: res.data.jobs,
      total: res.data.total,
    };
  }
);

export const lazyLoadJobs = createAsyncThunk(
  "job/lazyLoadJobs",
  async ({ start, search = "" }) => {
    const res = await axios.get(`/jobs?_start=${start}&_limit=9&q=${search}`);
    return {
      jobs: res.data.jobs,
      total: res.data.total,
    };
  }
);



// Create job (for company dashboard)
export const createJob = createAsyncThunk("job/create", async (formData) => {
  const res = await axios.post("/jobs/create", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data.job;
});
//fetch company jobs
export const fetchCompanyJobs = createAsyncThunk(
  "job/fetchCompanyJobs",
  async () => {
    const res = await axios.get("/jobs/company");
    return res.data.jobs;
  }
);

// Fetch single job
export const fetchJobById = createAsyncThunk("job/fetchJobById", async (id) => {
  const res = await axios.get(`/jobs/${id}`);
  return res.data.job;
});

// Update job
export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ id, updates }) => {
    const res = await axios.put(`/jobs/${id}`, updates);
    return res.data.job;
  }
);

// Delete job
export const deleteJob = createAsyncThunk("job/deleteJob", async (id) => {
  await axios.delete(`/jobs/${id}`);
  return id;
});

export const fetchApplicants = createAsyncThunk(
  "job/fetchApplicants",
  async (jobId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token"); // or sessionStorage
      const res = await axios.get(`/jobs/${jobId}/applicants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.applicants;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch applicants");
    }
  }
);

