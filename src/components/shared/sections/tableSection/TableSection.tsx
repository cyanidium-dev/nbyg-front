import type { TableSection as TableSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import TableList from "./TableList";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";

interface TableSectionProps extends TableSectionData {
  uniqueKey?: string;
}

const TableSection = (_props: TableSectionProps) => {
  const { title, description, image, desktopAlignment, columns, uniqueKey } =
    _props;

  return (
    <section className="py-25 lg:pt-[138px] lg:pb-0">
      <Container
        className={`relative flex flex-col gap-10 xl:gap-[70px] xl:items-center ${desktopAlignment === "right" ? "xl:flex-row" : "xl:flex-row-reverse"}`}
      >
        <motion.div
          key={`${uniqueKey}-cta-section-image1`}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
          className="lg:hidden absolute -top-30 right-[calc(50%-332px)] sm:right-[calc(50%-500px)] w-[337px] h-[421px]"
        >
          <Image
            src="/images/decorations/ellipsis.svg"
            width="337"
            height="421"
            alt="ellipsis"
          />
        </motion.div>

        <div className="flex flex-col gap-8 lg:gap-9">
          <div className="relative">
            <DecorativeEllipsis
              uniqueKey={uniqueKey}
              className="absolute -top-[26px] left-0 lg:left-auto lg:top-auto lg:right-0 lg:bottom-5"
            />
            <SectionTitle>{title}</SectionTitle>
          </div>
          {image ? (
            <div className="relative min-h-[95px] lg:min-h-[162px] h-auto">
              <Image
                src={urlForSanityImage(image).fit("crop").url()}
                alt="table section image"
                fill
                className="object-cover"
              />
            </div>
          ) : null}
          {description ? (
            <p className="whitespace-pre-line">{description}</p>
          ) : null}
        </div>
        <TableList columns={columns} />
      </Container>
    </section>
  );
};

export default TableSection;
