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
}

export default function SwiperWrapper({
  children,
  breakpoints,
  swiperClassName,
  loop = false,
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
      <div className={`flex items-center lg:items-end justify-center gap-2.5`}>
        <button
          ref={prevRef}
          disabled={isBeginning}
          className={`enabled:cursor-pointer w-[30px] h-[30px] rounded-full flex items-center justify-center pointer-events-auto transition-filter 
          duration-300 xl:enabled:hover:brightness-[1.25] disabled:bg-gray`}
        >
          <ShevronIcon className="rotate-90" />
        </button>

        <button
          ref={nextRef}
          disabled={isEnd}
          className={`enabled:cursor-pointer w-[30px] h-[30px] rounded-full flex items-center justify-center pointer-events-auto transition-filter 
          duration-300 xl:enabled:hover:brightness-[1.25] disabled:bg-gray `}
        >
          <ShevronIcon />
        </button>
      </div>
    </>
  );
}
