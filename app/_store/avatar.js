import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    photoURL: "",
  },
};

export const avatar = createSlice({
  name: "avatar",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.value.photoURL = action.payload;
    },
  },
});

export const { setAvatar } = avatar.actions;
export default avatar.reducer;
