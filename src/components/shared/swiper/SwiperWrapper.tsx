"use client";
import "swiper/css";
import "swiper/css/navigation";

import { ReactNode, useRef, useLayoutEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import type { Swiper as SwiperType } from "swiper";
import ShevronIcon from "../icons/ShevronIcon";

interface SwiperWrapperProps {
  children: ReactNode;
  breakpoints: SwiperOptions["breakpoints"];
  swiperClassName: string;
  loop?: boolean;
  uniqueKey?: string;
  buttonsPosition?: "right" | "center" | "onSlides";
}

export default function SwiperWrapper({
  children,
  breakpoints,
  swiperClassName,
  loop = false,
  buttonsPosition = "right",
  uniqueKey,
}: SwiperWrapperProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperInstanceRef = useRef<SwiperType | null>(null);
  const navigationSetupRef = useRef(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Функція для налаштування навігації
  const setupNavigation = (swiperInstance: SwiperType) => {
    if (
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation === "object" &&
      !navigationSetupRef.current
    ) {
      navigationSetupRef.current = true;
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();

      // початковий стан кнопок
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);

      // оновлюємо стан кнопок при зміні слайду
      swiperInstance.on("slideChange", () => {
        if (swiperInstanceRef.current) {
          setIsBeginning(swiperInstanceRef.current.isBeginning);
          setIsEnd(swiperInstanceRef.current.isEnd);
        }
      });
    }
  };

  // Прив'язуємо кнопки навігації після рендеру
  useLayoutEffect(() => {
    const swiperInstance = swiperInstanceRef.current;
    if (swiperInstance && prevRef.current && nextRef.current) {
      setupNavigation(swiperInstance);
    }
  });

  return (
    <>
      <Swiper
        key={uniqueKey}
        onSwiper={(swiper) => {
          swiperInstanceRef.current = swiper;
        }}
        breakpoints={breakpoints}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        loop={loop}
        speed={1000}
        modules={[Navigation]}
        className={swiperClassName}
      >
        {children}
      </Swiper>
      <div
        className={`flex gap-3 items-center justify-between pr-8 lg:pr-30 sm:mr-[calc(100%-640px)] md:mr-[calc(100%-768px)] 
          lg:mr-[calc(100%-1024px)] xl:mr-[calc(100%-1280px)] mb-0.5 ${buttonsPosition === "right" ? "sm:justify-end" : "sm:justify-center"}`}
      >
        <button
          ref={prevRef}
          disabled={isBeginning && !loop}
          className={`group enabled:cursor-pointer size-[54px] bg-white border border-white rounded-full flex items-center justify-center pointer-events-auto
             transition duration-300 xl:enabled:hover:opacity-70 disabled:bg-transparent`}
        >
          <ShevronIcon className="-rotate-90 group-enabled:text-black group-disabled:text-white mr-1" />
        </button>

        <button
          ref={nextRef}
          disabled={isEnd && !loop}
          className={`group enabled:cursor-pointer size-[54px] bg-white border border-white rounded-full flex items-center justify-center pointer-events-auto transition-filter 
          duration-300 xl:enabled:hover:opacity-70 disabled:bg-transparent`}
        >
          <ShevronIcon className="rotate-90 group-enabled:text-black group-disabled:text-white ml-1" />
        </button>
      </div>
    </>
  );
}
