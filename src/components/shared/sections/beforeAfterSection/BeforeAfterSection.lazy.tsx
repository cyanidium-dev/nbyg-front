"use client";

import dynamic from "next/dynamic";

const BeforeAfterSection = dynamic(
  () => import("./BeforeAfterSection"),
  { ssr: false }
);

export default BeforeAfterSection;

