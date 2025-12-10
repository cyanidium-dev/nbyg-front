"use client";

import dynamic from "next/dynamic";

const Gallery = dynamic(() => import("./Gallery"), {
  ssr: true,
});

export default Gallery;
