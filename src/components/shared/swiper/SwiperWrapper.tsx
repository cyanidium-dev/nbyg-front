"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import { ReactNode, useRef, useLayoutEffect, useState } from "react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import type { Swiper as SwiperType } from "swiper";
import type { SwiperModule } from "swiper/types";
import ShevronIcon from "../icons/ShevronIcon";
import { twMerge } from "tailwind-merge";

interface SwiperWrapperProps {
  children: ReactNode;
  breakpoints: SwiperOptions["breakpoints"];
  swiperClassName: string;
  loop?: boolean;
  uniqueKey?: string;
  buttonsPosition?: "right" | "center" | "onSlides";
  component?: ReactNode;
  additionalModules?: SwiperModule[];
  additionalOptions?: Partial<SwiperOptions>;
  showNavigation?: boolean;
  buttonsClassName?: string;
  showCoverflowEffect?: boolean;
  centeredSlides?: boolean;
  onSwiper?: (swiper: SwiperType) => void;
  onSlideChange?: (swiper: SwiperType) => void;
}

const buttonsPositionClass = {
  right: "sm:justify-end sm:ml-auto",
  center: "sm:justify-center",
  onSlides: "w-full justify-between",
};

export default function SwiperWrapper({
  children,
  breakpoints,
  swiperClassName,
  loop = false,
  buttonsPosition = "right",
  uniqueKey,
  component,
  additionalModules = [],
  additionalOptions = {},
  showNavigation = true,
  buttonsClassName,
  showCoverflowEffect = false,
  centeredSlides = false,
  onSwiper,
  onSlideChange,
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
    if (!showNavigation) return;
    const swiperInstance = swiperInstanceRef.current;
    if (swiperInstance && prevRef.current && nextRef.current) {
      setupNavigation(swiperInstance);
    }
  });

  return (
    <>
      <Swiper
        key={`${uniqueKey}-swiper`}
        onSwiper={(swiper) => {
          swiperInstanceRef.current = swiper;
          onSwiper?.(swiper);
        }}
        onSlideChange={onSlideChange}
        centeredSlides={centeredSlides}
        breakpoints={breakpoints}
        navigation={
          showNavigation
            ? {
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }
            : false
        }
        loop={loop}
        speed={1000}
        coverflowEffect={
          showCoverflowEffect
            ? {
                rotate: 0,
                depth: 100,
                stretch: 0,
                modifier: 1,
                slideShadows: false,
              }
            : {}
        }
        effect={showCoverflowEffect ? "coverflow" : ""}
        modules={
          showNavigation && showCoverflowEffect
            ? [Navigation, EffectCoverflow, ...additionalModules]
            : showNavigation
              ? [Navigation, ...additionalModules]
              : additionalModules
        }
        className={swiperClassName}
        {...additionalOptions}
      >
        {children}
      </Swiper>
      {showNavigation && (
        <div
          key={`${uniqueKey}-buttons`}
          className={twMerge(
            `flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-10 mb-0.5`,
            buttonsClassName
          )}
        >
          {component}
          <div
            className={`flex justify-between sm:gap-3 items-center pointer-events-none ${buttonsPositionClass[buttonsPosition]}`}
          >
            <button
              ref={prevRef}
              disabled={isBeginning && !loop}
              className={`relative z-100 group enabled:cursor-pointer size-[54px] bg-white border border-white rounded-full flex items-center justify-center pointer-events-auto
             transition duration-300 xl:enabled:hover:opacity-70 disabled:bg-transparent`}
            >
              <ShevronIcon className="relative z-100 -rotate-90 group-enabled:text-black group-disabled:text-white mr-1 pointer-events-auto" />
            </button>
            <button
              ref={nextRef}
              disabled={isEnd && !loop}
              className={`group enabled:cursor-pointer size-[54px] bg-white border border-white rounded-full flex items-center justify-center pointer-events-auto transition 
          duration-300 xl:enabled:hover:opacity-85 disabled:bg-transparent`}
            >
              <ShevronIcon className="rotate-90 group-enabled:text-black group-disabled:text-white ml-1 pointer-events-auto" />
            </button>
          </div>
        </div>
      )}
      {!showNavigation && component && (
        <div key={`${uniqueKey}-component`}>{component}</div>
      )}
    </>
  );
}
