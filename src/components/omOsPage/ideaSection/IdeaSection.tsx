import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import IdeaSectionDecorations from "./IdeaSectionDecorations";
import FormButton from "@/components/shared/buttons/FormButton";

export default function IdeaSection() {
  return (
    <>
      <section>
        <Container className="relative md:flex md:flex-row-reverse md:gap-9 py-25 lg:pt-[152px] lg:pb-0">
          <IdeaSectionDecorations />
          <div>
            <SectionTitle className="mb-8 lg:mb-9">
              Sådan opstod idéen til Nbyg
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
                src="/images/omOsPage/idea/idea.webp"
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
                x: 70,
                y: 30,
                delay: 0.4,
              })}
              className="mb-10 lg:mb-9 whitespace-pre-line"
            >
              {
                "Nbyg er en virksomhed, der ser på renovering gennem kundens øjne.\nEt firma, der ikke blot udfører håndværk, men lytter, forstår og skaber løsninger, hvor kvalitet, funktion og æstetik går hånd i hånd.\n\nVi tror på, at hvert hus og hver lejlighed er unik. Hvert rum har sin egen historie og karakter – og vores opgave er at bevare og fremhæve den.\n\nVi lægger stor vægt på bæredygtige løsninger, brugen af naturlige materialer og især arbejdet med træ, som giver varme, liv og harmoni til ethvert hjem.\n\nGennem årene er vi vokset til et team af erfarne håndværkere, der udfører projekter nøglefærdigt – fra små renoveringer til større fornyelser.\nMen det vigtigste har aldrig ændret sig: respekten for hjemmet, nærheden til kunden og arbejdet med hjertet.\n\nVi renoverer ikke bare – vi giver hjemmet liv igen, fyldt med varme og hygge."
              }
            </motion.p>
            <FormButton className="h-[58px]" animationVariants={fadeInAnimation({ scale: 0.85, delay: 0.8 })}>Kontakt os</FormButton>
          </div>
          <motion.div
            key="desk"
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
            className="hidden md:block not-last:relative h-auto md:w-[30%] xl:w-[43.6%] shrink-0 rounded-[12px] overflow-hidden"
          >
            <Image
              src="/images/omOsPage/idea/idea.webp"
              alt="history section image"
              fill
              sizes="(max-width: 786px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </Container>
      </section>
    </>
  );
}
