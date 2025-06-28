import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/register", formData);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/login", formData);
      const { token, user } = res.data;

      // ✅ Store both token and user in localStorage
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user; 
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// LOAD USER
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (!token || !user) {
        return rejectWithValue("User not logged in");
      }

      return JSON.parse(user); 
    } catch (err) {
      return rejectWithValue("Failed to load user");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await axios.get("/auth/logout");
  localStorage.removeItem("token");
});
