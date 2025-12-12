"use client";

import dynamic from "next/dynamic";
import SectionLoader from "@/components/shared/loader/SectionLoader";

const AboutUs = dynamic(() => import("./AboutUs"), {
  loading: () => <SectionLoader />,
  ssr: true, // Keep SSR for SEO
});

export default AboutUs;
