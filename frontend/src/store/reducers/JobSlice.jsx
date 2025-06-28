import { createSlice } from "@reduxjs/toolkit";
import {
  fetchJobs,
  createJob,
  deleteJob,
  updateJob,
  fetchJobById,
  fetchCompanyJobs,
  fetchApplicants,
  lazyLoadJobs,
} from "../actions/JobActions";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    job: null,
    applicants: [],
    loading: false,
    error: null,
    total: 0,
  },

  reducers: {
    clearJobState: (state) => {
      state.job = null;
      state.applicants = [];
      state.error = null;
    },
    resetJobs: (state) => {
      state.jobs = [];
      state.total = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      // Lazy Load Jobs (infinite scroll)
      .addCase(lazyLoadJobs.fulfilled, (state, action) => {
        const { jobs: newJobs, total } = action.payload;

        // ✅ Filter out jobs that are already in state by _id
        const uniqueNewJobs = newJobs.filter(
          (newJob) => !state.jobs.some((job) => job._id === newJob._id)
        );

        state.jobs = [...state.jobs, ...uniqueNewJobs];
        state.total = total;
      })
      .addCase(lazyLoadJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load more jobs";
      })

      // Fetch All Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.total = action.payload.total;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch jobs";
      })

      // Fetch Single Job
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.job = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch job";
      })

      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = [...(state.jobs || []), action.payload];
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create job";
      })

      // Update Job
      .addCase(updateJob.fulfilled, (state, action) => {
        const idx = state.jobs.findIndex(
          (job) => job._id === action.payload._id
        );
        if (idx !== -1) {
          state.jobs[idx] = action.payload;
        }
      })

      // Fetch Company Jobs
      .addCase(fetchCompanyJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanyJobs.fulfilled, (state, action) => {
        state.loading = false;

        // Defensive check
        if (Array.isArray(action.payload)) {
          state.jobs = action.payload;
        } else if (action.payload?.jobs && Array.isArray(action.payload.jobs)) {
          state.jobs = action.payload.jobs;
        } else {
          console.warn("⚠️ Unexpected job payload:", action.payload);
          state.jobs = [];
        }
      })
      .addCase(fetchCompanyJobs.rejected, (state) => {
        state.loading = false;
      })

      // Delete Job
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      })

      // Fetch Applicants for Job
      .addCase(fetchApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch applicants";
      });
  },
});

export default jobSlice.reducer;
export const { clearJobState, resetJobs } = jobSlice.actions;
