"use client";

import MovieCard from "@/app/_components/MovieCard/movieCard";
import NavBar from "@/app/_components/NavBar/NavBar";

import { useSelector } from "react-redux";

<<<<<<< HEAD
export default function Client({ data }: any) {
=======
export default function Client({ user }: any) {
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
  const slide = useSelector((state: any) => state.slide.value.slide);
  const position = useSelector((state: any) => state.slide.value.position);

  return (
    <>
<<<<<<< HEAD
    
=======
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
      {slide && position && (
        <MovieCard
          slide={slide}
          position={position}
<<<<<<< HEAD
          
        />
      )}

      <NavBar user={data}></NavBar>
=======
        />
      )}

      <NavBar user={user}></NavBar>
>>>>>>> 1a024c1ba7fcbe105135169436445291a2091ffb
    </>
  );
}
