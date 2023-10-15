import { setPosition, setSlide } from "@/store/feature";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function MovieCard({ position, slide }: any) {
  const dispatch = useDispatch();
  function resetSlide() {
    setTimeout(() => {
      dispatch(setSlide(null));
      dispatch(setPosition(null));
    }, 150);
  }
  return (
    <>
      <AnimatePresence>
        {position && slide && (
          <motion.div
            key={slide}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.25 }}
            exit={{ scale: 1 }}
            transition={{ duration: 0.15, damping: 10, stiffness: 100 }}
            onMouseLeave={() => resetSlide()}
            style={{
              position: "absolute",
              width: position.width,
              left: position.x,
              top: position.y,
              zIndex: 10,
            }}
          >
            <Image
              key={`https://image.tmdb.org/t/p/w500${slide.backdrop_path}`}
              src={`https://image.tmdb.org/t/p/w500${slide.backdrop_path}`}
              width={300}
              height={300}
              alt=""
            />
            <div style={{ width: position.width }}>
              <p style={{ margin: 0, fontSize: 10 }}>{slide.title}</p>
              <p style={{ margin: 0, fontSize: 10 }}>{position.x}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
