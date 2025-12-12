import type { TableWithImageSection as TableWithImageSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import TableList from "../tableSection/TableList";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";
import TableWithImageSectionDecorations from "./TableWithImageSectionDecorations";

interface TableWithImageSectionProps extends TableWithImageSectionData {
  uniqueKey?: string;
}

const TableWithImageSection = (_props: TableWithImageSectionProps) => {
  const { title, tablePosition, image, columns, uniqueKey } = _props;

  return (
    <section className="py-16 lg:pt-[109px] lg:pb-0 overflow-hidden">
      <Container className="relative">
        <TableWithImageSectionDecorations tablePosition={tablePosition} />
        <div
          className={`relative md:flex justify-between items-center mb-8 lg:mb-9 ${tablePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            className="hidden md:flex"
          />
          <SectionTitle className="lg:whitespace-pre-line">
            {title}
          </SectionTitle>
        </div>
        <div
          className={`flex  gap-10 xl:gap-[109px] ${tablePosition === "right" ? "flex-col-reverse xl:flex-row-reverse" : "flex-col-reverse xl:flex-row"}`}
        >
          {/* Таблиця */}
          <div className="xl:w-1/2 table-with-image-wrapper">
            <TableList columns={columns} uniqueKey={uniqueKey} />
          </div>

          {/* Зображення */}
          {image ? (
            <motion.div
              key={`${uniqueKey}-table-with-image-section-image`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.4, x: 30 })}
              className="relative w-full xl:w-1/2 h-[300px] xl:h-auto rounded-[12px] overflow-hidden shrink-0"
            >
              <Image
                src={urlForSanityImage(image).url()}
                fill
                alt={image?.alt || "Billede"}
                className="object-cover"
              />
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
};

export default TableWithImageSection;
