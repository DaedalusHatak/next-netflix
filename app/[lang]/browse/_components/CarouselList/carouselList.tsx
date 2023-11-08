"use client";
import { useState } from "react";
import Carousel from "../Carousel/carousel";

export default function CarouselList({ data }: any) {
  const [slide, setSlide] = useState(null);
  const [position, setPosition] = useState(null);

  const chooseSlide = (sld: any) => {
    setSlide(sld);
  };

  const choosePosition = (pos: any) => {
    setPosition(pos);
  };
  return (
    <>
      <Carousel
        slide={chooseSlide}
        position={choosePosition}
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
