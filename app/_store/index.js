import { configureStore } from "@reduxjs/toolkit";
import slide from "./feature";
import email from "./email";
import avatar from "./avatar";
export const store = configureStore({
  reducer: {
    slide,
    email,
    avatar,
  },
});
