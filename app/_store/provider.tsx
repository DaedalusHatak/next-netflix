"use client";

import { Next13ProgressBar } from "next13-progressbar";
import { store } from "./index";
import { Provider } from "react-redux";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <>
  <Provider store={store}>{children}</Provider>
  
  <Next13ProgressBar height="4px" color="#0A2FFF" showOnShallow />
  </>;
}
