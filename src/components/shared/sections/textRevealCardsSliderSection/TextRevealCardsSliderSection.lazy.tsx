"use client";

import dynamic from "next/dynamic";

const TextRevealCardsSliderSection = dynamic(
  () => import("./TextRevealCardsSliderSection"),
  { ssr: false }
);

export default TextRevealCardsSliderSection;

