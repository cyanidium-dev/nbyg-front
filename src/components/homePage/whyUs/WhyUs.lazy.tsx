"use client";

import dynamic from "next/dynamic";
import SectionLoader from "@/components/shared/loader/SectionLoader";

const WhyUs = dynamic(() => import("./WhyUs"), {
  loading: () => <SectionLoader />,
  ssr: true, // Keep SSR for SEO
});

export default WhyUs;
