"use client";

import MovieCard from "@/app/[lang]/browse/_components/MovieCard/movieCard";
import NavBar from "@/app/_components/NavBar/NavBar";

import { useSelector } from "react-redux";

export default function Client({ user }: any) {
  const slide = useSelector((state: any) => state.slide.value.slide);
  const position = useSelector((state: any) => state.slide.value.position);

  return (
    <>
      {slide && position && (
        <MovieCard
          slide={slide}
          position={position}
        />
      )}

      <NavBar user={user}></NavBar>
    </>
  );
}
