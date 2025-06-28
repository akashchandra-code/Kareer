import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const getProfile = createAsyncThunk("profile/get", async () => {
  const res = await axios.get("/profile");
  return res.data;
});

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (formData) => {
    const res = await axios.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);
