import { Timestamp } from "firebase/firestore";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export type Section = {
  header: string;
  desc: string;
  comp: JSX.Element;
  reverse?: boolean;
};

export type Input = {
  name: string;
  type: string;
  isBackground: boolean;
  complete: string;
  required: boolean;
  fullWidth: boolean;
  border?: boolean;
  error?: string;
  pattern?: string;
  value: string;
  onChange: ChangeEventHandler;
};

export type Title = "Error" | "Success" | "Verification";

export type Question = {
  name: string;
  answer: string;
  isActive: boolean;
};

export type User = {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string | undefined;
  photoURL: string;
  phoneNumber: string | undefined;
  disabled: boolean;
} | null;

export type ResponseData = {
  results: Array<Movie | TVSerie>;
};

type Movie = Result & {
  adult: boolean;
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
};
type TVSerie = Result & {
  name: string;
  original_language: string;
  original_name: string;
  first_air_date: string;
};

export type Result = {
  id: number;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  image?: string;
  poster?: string;
};

export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  right: number;
  bottom: number;
};
