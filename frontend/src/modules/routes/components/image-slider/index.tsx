"use client";

import React, { MouseEvent, useState } from "react";

import Image from "next/image";

import { Box } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";

import { Arrow } from "../arrow";
import { styles } from "./styles";

export interface IProps {
  images?: string[];
}

export const ImageSlider = ({ images = [] }: IProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.sliderWrapper} ref={sliderRef} className="keen-slider">
        {images.map((url) => (
          <Image
            key={url}
            className="keen-slider__slide"
            width={300}
            height={300}
            src={url}
            alt={url}
          />
        ))}
      </Box>
      {loaded && instanceRef.current && (
        <>
          <Arrow
            left
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
          />

          <Arrow
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
          />
        </>
      )}

      {loaded && instanceRef.current && (
        <Box sx={styles.dots} className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
