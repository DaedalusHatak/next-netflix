import { configureStore } from "@reduxjs/toolkit";
import slide from "./feature";
import email from "./email"

export const store = configureStore({
  reducer: {
    slide,
    email,
  },
});
