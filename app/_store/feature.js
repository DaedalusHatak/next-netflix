import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    slide: null,
    position: { x: Number, y: Number, width: Number },
  },
};

export const slide = createSlice({
  name: "slide",
  initialState,
  reducers: {
    setSlide: (state, action) => {
      state.value.slide = action.payload;
    },
    setPosition: (state, action) => {
      state.value.position = action.payload;
    },
  },
});

export const { setPosition, setSlide } = slide.actions;
export default slide.reducer;
