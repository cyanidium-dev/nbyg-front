import MainButton from "@/components/shared/buttons/MainButton";
import Container from "@/components/shared/container/Container";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import Link from "next/link";

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
    <section className="py-25 lg:pt-[152px] lg:pb-0">
      <Container
        className={`relative ${imageRight ? "md:flex" : "md: flex flex-row-reverse"} gap-9`}
      >
        <div>
          <DecorativeEllipsis className="absolute md:static -top-[44px] left-4 md:mb-9" />
          <SectionTitle className="mb-8 lg:mb-9">{title}</SectionTitle>
          <div className="md:hidden relative h-[328px] mb-8 rounded-[12px] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 786px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <p className="mb-10 lg:mb-9">{description}</p>
          <Link href="/url">
            <MainButton className="h-[58px] px-9 font-medium uppercase">
              {text}
            </MainButton>
          </Link>
        </div>
        <div className="relative hidden md:block h-auto w-[43.6%] shrink-0 rounded-[12px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 786px) 100vw, 50vw"
          />
        </div>
      </Container>
    </section>
  );
}
