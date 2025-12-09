export const revalidate = 60;

import "./globals.css";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { ALL_DYNAMIC_PAGES_QUERY } from "@/lib/queries";
import { DynamicPage } from "@/types/dynamicPage";
import Script from "next/script";

const geistSans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const findSans = localFont({
  src: [
    {
      path: "../../public/fonts/find-sans-pro-light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-find-sans-pro",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export async function generateMetadata() {
  return getDefaultMetadata("/");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dynamicPagesList = await fetchSanityData<DynamicPage[]>(
    ALL_DYNAMIC_PAGES_QUERY
  );

  return (
    <html lang="da" className="scroll-smooth">
      <head>
        <Script
          id="cookieyes"
          strategy="afterInteractive"
          src="https://cdn-cookieyes.com/client_data/17e4795a8aff15e288f360abc85aef25/script.js"
        />
      </head>

      <body
        className={`${geistSans.variable} ${findSans.variable} flex min-h-screen flex-col antialiased text-[14px] lg:text-[16px] font-light 
        leading-[143%] lg:leading-[125%] overflow-hidden`}
      >
        <Header dynamicPagesList={dynamicPagesList} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
