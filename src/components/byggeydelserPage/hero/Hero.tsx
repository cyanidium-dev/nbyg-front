import Container from "@/components/shared/container/Container";
import PageTitle from "@/components/shared/titles/PageTitle";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation, headerVariants } from "@/utils/animationVariants";
import FormButton from "@/components/shared/buttons/FormButton";

export default function Hero() {
  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.01 }}
        variants={headerVariants}
        className="relative rounded-b-[18px] overflow-hidden"
      >
        <Image
          src="/images/byggeydelserPage/hero/hero-image.webp"
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
        <Container className="pt-[249px] lg:pt-[184px] pb-14 lg:pb-[85px]">
          <PageTitle className="max-w-[978px] mb-6 lg:mb-9">
            Professionelle byggeydelser i København
          </PageTitle>
          <motion.p
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, x: 70, y: 30, delay: 0.3 })}
            className="max-w-[685px] mb-10 lg:mb-16"
          >
            Hos Nbyg udfører vi alle typer byggeydelser i København – fra mindre
            renoveringer til komplette ombygninger og nybyggeri. Vi kombinerer
            solidt håndværk med moderne løsninger og sørger for et resultat, der
            holder i mange år. Uanset projektets størrelse får du en professionel
            samarbejdspartner, der går op i kvalitet, æstetik og detaljen.
          </motion.p>
          <FormButton className="h-12 sm:w-[275px]" animationVariants={fadeInAnimation({ scale: 0.85, delay: 0.6 })}>
            Tryk her for at drofte projektet
          </FormButton>
        </Container>
      </motion.section>
    </>
  );
}
