"use client";

import dynamic from "next/dynamic";

const Reviews = dynamic(() => import("./Reviews"), {
  ssr: true,
});

export default Reviews;
