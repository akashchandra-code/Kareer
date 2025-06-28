import { createSlice } from "@reduxjs/toolkit";
import { analyzeResume } from "../actions/AnalyzeActions";

const analyzeSlice = createSlice({
  name: "analyze",
  initialState: {
    matchedJobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAnalysis(state) {
      state.matchedJobs = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeResume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeResume.fulfilled, (state, action) => {
        state.loading = false;
        state.matchedJobs = action.payload;
      })
      .addCase(analyzeResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAnalysis } = analyzeSlice.actions;
export default analyzeSlice.reducer;
