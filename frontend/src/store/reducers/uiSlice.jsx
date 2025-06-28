import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    navbarAnimationDone: false,
  },
  reducers: {
    setNavbarAnimationDone: (state, action) => {
      state.navbarAnimationDone = action.payload;
    },
  },
});

export const { setNavbarAnimationDone } = uiSlice.actions;
export default uiSlice.reducer;
