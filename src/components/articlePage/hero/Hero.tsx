import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation, headerVariants } from "@/utils/animationVariants";
import { BlogPost } from "@/types/blogPost";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

interface HeroProps {
  article: BlogPost;
}

export default function Hero({ article }: HeroProps) {
  const { heroTitle, heroDescription, heroMobileImage, heroDesktopImage } =
    article;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.01 }}
      variants={headerVariants}
      className="relative rounded-b-[18px] overflow-hidden"
    >
      <Image
        src={urlForSanityImage(heroMobileImage).url()}
        fill
        alt={heroMobileImage?.alt || "Blog indlæg hero billede"}
        sizes="100vw"
        className="md:hidden object-cover -z-20"
        priority
        fetchPriority="high"
      />
      <Image
        src={urlForSanityImage(heroDesktopImage).url()}
        fill
        alt={heroDesktopImage?.alt || "Blog indlæg hero billede"}
        sizes="100vw"
        className="hidden md:block object-cover -z-20"
        priority
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
      linear-gradient(
        0deg,
        rgba(0, 0, 0, 0) -36.89%,
        rgba(0, 0, 0, 0.464) 91.14%,
        rgba(0, 0, 0, 0) 144.39%
      ),
      linear-gradient(
        240.18deg,
        rgba(0, 0, 0, 0) 19.24%,
        rgba(0, 0, 0, 0.8) 82.96%
      )
    `,
        }}
      ></div>
      <Container className="pt-[147px] lg:pt-[179px] pb-7 lg:pb-[108px]">
        <PageTitle className="max-w-[978px] mb-6 lg:mb-9">
          {heroTitle}
        </PageTitle>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, x: 70, y: 30, delay: 0.4 })}
          className="max-w-[978px] whitespace-pre-line"
        >
          {heroDescription}
        </motion.p>
      </Container>
    </motion.section>
  );
}
