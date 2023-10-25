import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: ""
  },
};


export const email = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.value.email = action.payload;
    },
   
  },
});

export const {setEmail } = email.actions;
export default email.reducer;
