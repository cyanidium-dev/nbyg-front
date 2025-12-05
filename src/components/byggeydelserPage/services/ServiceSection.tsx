import MainButton from "@/components/shared/buttons/MainButton";
import Container from "@/components/shared/container/Container";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import ServiceSectionDecorations from "./ServiceSectionDecorations";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface ServiceSectionProps {
  service: {
    title: string;
    description: string;
    image: string;
    imageRight: boolean;
    button: { text: string; url: string };
  };
}

export default function ServiceSection({ service }: ServiceSectionProps) {
  const { title, description, image, imageRight, button } = service;
  const { text, url } = button;

  return (
    <section className="relative py-25 lg:pt-[152px] lg:pb-0">
      <ServiceSectionDecorations uniqueKey={title} imageRight={imageRight} />
      <Container
        className={`relative ${imageRight ? "md:flex" : "md: flex flex-row-reverse"} gap-9`}
      >
        <div>
          <DecorativeEllipsis className="absolute md:static -top-[44px] left-4 md:mb-9" />
          <SectionTitle className="mb-8 lg:mb-9">{title}</SectionTitle>
          <motion.div
            key={`${title}-image-mobile`}
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
            className="md:hidden relative h-[328px] mb-8 rounded-[12px] overflow-hidden"
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 786px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <motion.p
            key={`${title}-description`}
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
            className="mb-10 lg:mb-9"
          >
            {description}
          </motion.p>
          <motion.div
            key={`${title}-button`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({
              scale: 0.85,
              delay: 0.4,
            })}
          >
            {" "}
            <Link href={url}>
              <MainButton className="h-[58px] px-9 font-medium uppercase">
                {text}
              </MainButton>
            </Link>
          </motion.div>
        </div>
        <motion.div
          key={`${title}-image-desktop`}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({
            scale: 0.85,
            delay: 0.4,
          })}
          className="relative hidden md:block h-auto md:w-[30%] xl:w-[43.6%] shrink-0 rounded-[12px] overflow-hidden"
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 786px) 100vw, 50vw"
          />
        </motion.div>
      </Container>
    </section>
  );
}
