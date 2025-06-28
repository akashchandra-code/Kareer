import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import jobReducer from "./reducers/JobSlice";
import uiReducer from "./reducers/uiSlice";
import applicationReducer from "./reducers/ApplicationSlice";
import profileReducer from "./reducers/profileSlice";
import AnalyzeSlice from "./reducers/AnalyzeSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    application: applicationReducer,
    profile: profileReducer,
    analyze: AnalyzeSlice,
    ui: uiReducer,
  },
});
