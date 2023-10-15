import { configureStore } from "@reduxjs/toolkit";
import slide from "./feature";

export const store = configureStore({
  reducer: {
    slide,
  },
});
