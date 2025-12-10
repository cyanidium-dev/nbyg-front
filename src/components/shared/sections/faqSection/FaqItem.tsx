"use client";
import { useState } from "react";
import * as motion from "motion/react-client";
import { listItemVariantsLeft } from "@/utils/animationVariants";
import ShevronIcon from "../../icons/ShevronIcon";
import Link from "next/link";
import MainButton from "../../buttons/MainButton";
import FormButton from "../../buttons/FormButton";

interface FaqItemProps {
  faqItem: {
    _key?: string;
    question: string;
    answer: string;
    buttons?: string[];
  };
}

const buttonConfig: Record<
  string,
  { label: string; href?: string; modal?: string }
> = {
  calculatorTerrace: {
    label: "Terrasseberegner",
    href: "/terrasseprisberegner",
  },
  calculatorRoof: {
    label: "Tagberegner",
    href: "/tagprisberegner",
  },
  services: {
    label: "Byggeydelser",
    href: "/byggeydelser",
  },
  contact: {
    label: "Kontakt os",
    modal: "contact",
  },
};

export default function FaqItem({ faqItem }: FaqItemProps) {
  const [isShownMore, setIsShownMore] = useState(false);

  const toggleShowMore = () => setIsShownMore(!isShownMore);
  const { question, answer, buttons } = faqItem;

  return (
    <motion.li
      viewport={{ once: true, amount: 0.2 }}
      variants={listItemVariantsLeft}
      onClick={toggleShowMore}
      className={`relative group cursor-pointer px-4 py-6 lg:py-[26px] rounded-[8px] backdrop-blur-[38px]`}
    >
      <div
        className="absolute z-10 inset-0 rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] pointer-events-none 
      "
      />
      <div className={`flex items-center gap-6 justify-between`}>
        <h3
          className={`w-full text-[16px] lg:text-[18px] font-normal leading-[120%] shadow-white-universal`}
        >
          {question}
        </h3>
        <ShevronIcon
          className={`size-6 shrink-0 rotate-180 svg-shadow-white`}
        />
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-700 will-change-transform ${
          isShownMore ? "max-h-[1000px] ease-in" : "max-h-0 ease-out"
        }`}
      >
        <p
          className={`pt-8 pr-10 lg:pt-[38px] text-[14px] font-light leading-[143%] whitespace-pre-line`}
        >
          {answer}
        </p>
        {buttons && buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 pt-7">
            {buttons.map((btnKey) => {
              const cfg = buttonConfig[btnKey];
              if (!cfg) return null;

              if (cfg.href) {
                return (
                  <Link key={btnKey} href={cfg.href} className="">
                    <MainButton
                      variant="outline"
                      className="h-12 min-w-[179px] px-11"
                    >
                      {cfg.label}
                    </MainButton>
                  </Link>
                );
              }

              if (cfg.modal) {
                return (
                  <FormButton
                    key={btnKey}
                    variant="outline"
                    className="w-fit h-12 min-w-[210px] px-11"
                    faq
                  >
                    {cfg.label}
                  </FormButton>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>
    </motion.li>
  );
}
