import type { TableSection as TableSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import Image from "next/image";
import TableList from "./TableList";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";

interface TableSectionProps extends TableSectionData {
  uniqueKey?: string;
}

const TableSection = (_props: TableSectionProps) => {
  const {
    title,
    description,
    desktopAlignment,
    showDecorativeCircles,
    columns,
    uniqueKey,
  } = _props;

  return (
    <section className="py-25 lg:pt-[138px] lg:pb-0">
      <Container
        className={`relative flex flex-col gap-10 xl:gap-20 xl:items-end ${desktopAlignment === "right" ? "xl:flex-row" : "xl:flex-row-reverse"}`}
      >
        <motion.div
          key={`${uniqueKey}-table-section-ellipsis`}
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
              className="lg:hidden absolute -top-[26px] left-0 lg:left-auto lg:top-auto lg:right-0 lg:bottom-5"
            />
            <SectionTitle>{title}</SectionTitle>
          </div>
          {description ? (
            <motion.p
              key={`${uniqueKey}-table-section-description`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.3, y: 30 })}
              className="whitespace-pre-line"
            >
              {description}
            </motion.p>
          ) : null}
          {showDecorativeCircles ? (
            <DecorativeEllipsis
              uniqueKey={uniqueKey}
              className="hidden xl:flex mt-1"
            />
          ) : null}
        </div>
        <TableList columns={columns} uniqueKey={uniqueKey} />
      </Container>
    </section>
  );
};

export default TableSection;
