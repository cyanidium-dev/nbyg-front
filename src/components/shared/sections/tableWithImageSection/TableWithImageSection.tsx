import type { TableWithImageSection as TableWithImageSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import TableList from "../tableSection/TableList";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";

interface TableWithImageSectionProps extends TableWithImageSectionData {
  uniqueKey?: string;
}

const TableWithImageSection = (_props: TableWithImageSectionProps) => {
  const { title, tablePosition, image, columns, uniqueKey } = _props;

  return (
    <section className="py-25 lg:pt-[152px] lg:pb-0">
      <Container className="relative">
        <div className="relative flex justify-between items-center mb-8 lg:mb-9">
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            className="md:static absolute -top-[26px] left-0"
          />
          <SectionTitle className="lg:whitespace-pre-line">
            {title}
          </SectionTitle>
        </div>
        <div
          className={`flex  gap-10 xl:gap-[109px] ${tablePosition === "right" ? "flex-col xl:flex-row" : "flex-col-reverse xl:flex-row-reverse"}`}
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
                src={urlForSanityImage(image).fit("crop").url()}
                fill
                alt="image"
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
