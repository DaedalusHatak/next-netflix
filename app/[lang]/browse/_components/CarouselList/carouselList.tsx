"use client";
import { useState } from "react";
import Carousel from "../Carousel/carousel";
import { Movie, Position, ResponseData, TVSerie } from "@/types";

export default function CarouselList({ data }: { data: ResponseData }) {
  const [slide, setSlide] = useState<Movie | TVSerie | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  return (
    <>
      <Carousel
        data={data.results}
        emitImage={true}
        emitImageDelay={350}
        size={2}
        sm={2}
        md={3}
        lg={4}
        padding={3}
        buttonWidth={3}
        buttonVisibile={true}
        xl={5}
        xxl={6}
      />
    </>
  );
}
