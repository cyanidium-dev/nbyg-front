import Container from "@/components/shared/container/Container";
import MainButton from "@/components/shared/buttons/MainButton";
import ShevronIcon from "@/components/shared/icons/ShevronIcon";
import HeroGallery from "./HeroGallery";
import * as motion from "motion/react-client";
import { fadeInAnimation, headerVariants } from "@/utils/animationVariants";
import PageTitle from "@/components/shared/titles/PageTitle";
import Link from "next/link";
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
        className="relative pt-[208px] lg:pt-[199px] pb-7 lg:pb-[128px]"
      >
        <HeroGallery />
        <Container className="xs:pr-[100px] lg:pr-[242px]">
          <PageTitle className="md:text-[48px] lg:text-[64px] mb-8 lg:mb-9">
            Din pålidelige partner Nbyg i København
          </PageTitle>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 md:mb-16">
            <motion.p
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({
                scale: 0.85,
                x: 70,
                delay: 0.3,
              })}
              className="text-[14px] lg:text-[16px] font-light leading-[120%] tracking-[-0.02em] md:max-w-[214px]"
            >
              I snart et årti har Nbyg skabt smukke og holdbare løsninger til
              hjem.
            </motion.p>
            <div className="flex gap-2 md:gap-3">
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({
                  scale: 0.85,
                  x: 70,
                  delay: 0.4,
                })}
                className="size-3 md:size-4 rounded-full bg-white"
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({
                  scale: 0.85,
                  x: 70,
                  delay: 0.5,
                })}
                className="size-3 md:size-4 rounded-full bg-white"
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({
                  scale: 0.85,
                  x: 70,
                  y: 30,
                  delay: 0.6,
                })}
                className="size-3 md:size-4 rounded-full bg-white"
              />
            </div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({
                scale: 0.85,
                x: 70,
                y: 30,
                delay: 0.7,
              })}
              className="text-[14px] lg:text-[16px] font-light leading-[120%] tracking-[-0.02em] md:max-w-[367px]"
            >
              Som et erfarent tømrerfirma i København kombinerer vi solidt
              håndværk med moderne design, ærlig kommunikation og fair priser.
            </motion.p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-[30px] sm:w-fit">
            <FormButton
              className="h-12 sm:w-[275px]"
              textClassName="tracking-[-0.02em]"
              animationVariants={fadeInAnimation({
                scale: 0.85,
                y: 50,
                delay: 0.8,
              })}
            >
              Tryk her for at drofte projektet
            </FormButton>
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInAnimation({
                scale: 0.85,
                y: 50,
                delay: 0.9,
              })}
            >
              <Link href="/tagprisberegner">
                <MainButton
                  variant="gradient"
                  className="h-12 sm:w-[275px]"
                  textClassName="tracking-[-0.02em]"
                >
                  Gratis tagberegner
                  <ShevronIcon className="size-5 rotate-90" />
                </MainButton>
              </Link>
            </motion.div>
          </div>
        </Container>
      </motion.section>
    </>
  );
}
