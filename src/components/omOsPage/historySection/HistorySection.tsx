import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import HistorySectionDecorations from "./HistorySectionDecorations";

export default function HistorySection() {
  return (
    <section className="lg:overflow-hidden">
      <Container className="relative md:flex md:gap-9 py-25 lg:pt-[127px] lg:pb-0">
        <HistorySectionDecorations />
        <div>
          <SectionTitle className="mb-8 lg:mb-9">
            Det hele begyndte med et gammelt hus på Bornholm.
          </SectionTitle>
          <motion.div
            key="mob"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.01 }}
            variants={fadeInAnimation({
              scale: 0.85,
              delay: 0.4,
            })}
            className="md:hidden relative z-10 w-full h-[328px] mb-8 rounded-[12px] overflow-hidden"
          >
            <Image
              src="/images/omOsPage/history/history.jpg"
              alt="history section image"
              fill
              sizes="(max-width: 786px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({
              scale: 0.85,
              x: -70,
              y: 30,
              delay: 0.4,
            })}
            className="whitespace-pre-line"
          >
            {
              "Vi boede i et gammelt hus på Bornholm. Om vinteren var der smukt – men koldt. Meget koldt.\nOpvarmningen fungerede næsten ikke, og vinden sneg sig ind gennem de gamle trævinduer. Ingen virksomhed kunne rigtig føre vores idéer ud i livet på den måde, vi selv forestillede os det.\n\nVi var frustrerede. Huset var koldt, væggene fugtige, og for hvert vindpust føltes det, som om huset var ved at falde sammen.\nMen i stedet for at give op besluttede vi os for at handle.\nVi gik selv i gang – for vi indså, at ingen andre kunne gøre det, sådan som vi drømte om.\n\nVi ønskede ikke bare at renovere et hus, men at give det nyt liv – et liv, man kan mærke.\nTrin for trin fandt vi løsninger og brugte meget træ, fordi vi ønskede, at huset skulle føles varmt, levende og naturligt."
            }
          </motion.p>
        </div>
        <motion.div
          key="desk"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            scale: 0.85,
            x: 70,
            y: 30,
            delay: 0.4,
          })}
          className="hidden md:block not-last:relative h-auto md:w-[30%] xl:w-[43.6%] shrink-0 rounded-[12px] overflow-hidden"
        >
          <Image
            src="/images/omOsPage/history/history.jpg"
            alt="history section image"
            fill
            sizes="(max-width: 786px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </Container>
    </section>
  );
}
