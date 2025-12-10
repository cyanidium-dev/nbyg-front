"use client";

import dynamic from "next/dynamic";
import SectionLoader from "@/components/shared/loader/SectionLoader";

const FaqSection = dynamic(() => import("./FaqSection"), {
  loading: () => <SectionLoader />,
  ssr: true, // Keep SSR for SEO
});

export default FaqSection;
