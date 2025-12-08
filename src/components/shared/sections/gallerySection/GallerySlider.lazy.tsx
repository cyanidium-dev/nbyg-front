"use client";
import dynamic from "next/dynamic";

const GallerySlider = dynamic(() => import("./GallerySlider"), {
    ssr: false,
});

export default GallerySlider;
