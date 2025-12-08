"use client";
import dynamic from "next/dynamic";

const ReviewsBlock = dynamic(() => import("./ReviewsBlock"), {
    ssr: false,
});

export default ReviewsBlock;
