"use client";

import dynamic from "next/dynamic";

const BottomCTA = dynamic(() => import("./BottomCTA"), {
  ssr: true,
});

export default BottomCTA;
