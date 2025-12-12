import type { LargeTableSection as LargeTableSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import TableList from "../tableSection/TableList";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";
import MainButton from "../../buttons/MainButton";
import LargeTableSlider from "./LargeTableSlider";
import LargeTableSectionDecorations from "./LargeTableSectionDecorations";
import Link from "next/link";

interface LargeTableSectionProps extends LargeTableSectionData {
  uniqueKey?: string;
}

const LargeTableSection = (_props: LargeTableSectionProps) => {
  const {
    title,
    description,
    description2,
    image,
    columns,
    uniqueKey,
    buttonText,
    buttonLink,
  } = _props;

  return (
    <section className="py-25 lg:pt-[127px] lg:pb-0">
      <Container className="relative">
        <LargeTableSectionDecorations uniqueKey={uniqueKey} />
        <div className="relative lg:flex lg:justify-between lg:items-center lg:gap-25 xl:gap-25 mb-8 lg:mb-9">
          <SectionTitle className="lg:max-w-[467px] xl:max-w-[567px] lg:whitespace-pre-line shrink-0">
            {title}
          </SectionTitle>
          <div className="flex flex-col gap-5 justify-between">
            <motion.p
              key={`${uniqueKey}-large-table-description2-desk`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.3, x: 30 })}
              className="hidden lg:block whitespace-pre-line"
            >
              {description2}
            </motion.p>
            <DecorativeEllipsis
              uniqueKey={uniqueKey}
              className="absolute lg:static lg:hidden xl:flex -top-[26px] left-0 lg:ml-auto mb-5"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 xl:gap-[109px] mb-8 lg:mb-12">
          <div className="flex flex-col gap-4 lg:gap-[30px]">
            <motion.div
              key={`${uniqueKey}-large-table-description1`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.3, y: 30 })}
              className=""
            >
              <p className="whitespace-pre-line">{description}</p>
            </motion.div>
            <motion.div
              key={`${uniqueKey}-large-table-description2`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.4, y: 30 })}
              className="lg:hidden"
            >
              <p className="whitespace-pre-line">{description2}</p>
            </motion.div>

            <motion.div
              key={`${uniqueKey}-large-table-section-button-desk`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.7, x: -30 })}
              className="hidden lg:block"
            >
              <Link href={buttonLink}>
                <MainButton className="h-[58px]">{buttonText}</MainButton>
              </Link>
            </motion.div>
          </div>

          <motion.div
            key={`${uniqueKey}-large-table-section-image`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.5, x: 30 })}
            className="relative w-full lg:max-w-[467px] xl:max-w-[567px] h-50 lg:h-auto rounded-[8px] overflow-hidden shrink-0"
          >
            <Image
              src={urlForSanityImage(image).url()}
              fill
              alt={image?.alt || "Billede"}
              className="object-cover"
            />
          </motion.div>

          <motion.div
            key={`${uniqueKey}-large-table-section-button-mob`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.5, x: -30 })}
            className="lg:hidden"
          >
            <Link href={buttonLink}>
              <MainButton className="h-[58px]">{buttonText}</MainButton>
            </Link>
          </motion.div>
        </div>
        <div id="prices" className="scroll-mt-22 lg:scroll-mt-32">
          <div className="hidden lg:flex lg:items-stretch">
            <div className="flex lg:gap-20 xl:gap-[172px] w-full large-table-wrapper lg:items-stretch">
              <div className="flex-1 min-w-0 lg:h-full">
                <TableList
                  columns={columns.slice(0, 2)}
                  uniqueKey={`${uniqueKey}-table-1`}
                />
              </div>
              <div className="flex-1 min-w-0 lg:h-full">
                <TableList
                  columns={columns.slice(2, 4)}
                  uniqueKey={`${uniqueKey}-table-2`}
                />
              </div>
            </div>
          </div>
          <LargeTableSlider columns={columns} uniqueKey={uniqueKey} />
        </div>
      </Container>
    </section>
  );
};

export default LargeTableSection;
