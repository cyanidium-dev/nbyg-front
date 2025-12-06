import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation, headerVariants } from "@/utils/animationVariants";

export default function Hero() {
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
        src="/images/omOsPage/hero/hero.webp"
        fill
        alt="blog hero image"
        sizes="100vw"
        className="object-cover -z-20"
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
      <Container className="pt-[132px] lg:pt-[161px] pb-[57px] lg:pb-[62px]">
        <PageTitle className="mb-6 lg:mb-9">
          Københavnske tag- og tømrerløsninger med fokus på detaljer
        </PageTitle>
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, x: 70, y: 30, delay: 0.4 })}
          className="max-w-[685px]"
        >
          Som din lokale tømrer i København værdsætter vi tillid og præcision.
          Vi bygger, reparerer og forbedrer med omhu – hver gang.
        </motion.p>
      </Container>
    </motion.section>
  );
}
