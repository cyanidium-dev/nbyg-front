"use client";
import "swiper/css";
import "swiper/css/navigation";

import { ReactNode } from "react";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperOptions } from "swiper/types";

interface SwiperWrapperProps {
  children: ReactNode;
  breakpoints: SwiperOptions["breakpoints"];
  swiperClassName: string;
  loop?: boolean;
}

export default function SwiperWrapper({
  children,
  breakpoints,
  swiperClassName,
  loop = false,
}: SwiperWrapperProps) {
  return (
    <Swiper
      breakpoints={breakpoints}
      navigation={true}
      loop={loop}
      speed={1000}
      modules={[Navigation]}
      className={swiperClassName}
    >
      {children}
    </Swiper>
  );
}
