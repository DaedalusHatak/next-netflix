"use client";

import NavBar from "@/components/NavBar/NavBar";
import MovieCard from "./movieCard";
import { useSelector } from "react-redux";
import { setPosition, setSlide } from "@/store/feature";
import { useDispatch } from "react-redux";

export default function Client({ data }: any) {
  const slide = useSelector((state: any) => state.slide.value.slide);
  const position = useSelector((state: any) => state.slide.value.position);
  console.log(position);

  return (
    <>
      {slide && position && (
        <MovieCard
          slide={slide}
          position={position}
        />
      )}

      <NavBar user={data}></NavBar>
    </>
  );
}
