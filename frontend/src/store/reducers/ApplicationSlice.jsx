import { createSlice } from "@reduxjs/toolkit";
import {
  applyForJob,
  getAppliedJobs,
  getJobApplicants,
} from "../actions/ApplicationActions";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    appliedJobs: [],
    applicants: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearApplications: (state) => {
      state.appliedJobs = [];
      state.applicants = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.appliedJobs.push(action.payload);
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.appliedJobs = action.payload.map((app) => app.job._id);
      })
      .addCase(getJobApplicants.fulfilled, (state, action) => {
        state.applicants = action.payload;
      });
  },
});

export default applicationSlice.reducer;
export const { clearApplications } = applicationSlice.actions;
