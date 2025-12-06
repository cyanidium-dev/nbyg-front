import Image from "next/image";
import * as motion from "motion/react-client";
import { listItemVariantsLeft } from "@/utils/animationVariants";

interface ValuesCardProps {
  value: { title: string; description: string; icon: string } | string;
}

export default function ValuesCard({ value }: ValuesCardProps) {
  return (
    <motion.li
      viewport={{ once: true, amount: 0.2 }}
      variants={listItemVariantsLeft}
      className="relative md:w-[calc(50%-12px)] rounded-[16px] p-[1.5px]"
    >
      <div
        className="absolute inset-0 rounded-[16px] pointer-events-none"
        style={{
          background:
            "linear-gradient(129.15deg, var(--color-gradient-brown-dark) 21.74%, var(--color-black) 103.38%)",
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          isolation: "isolate",
        }}
      />
      {typeof value === "string" ? (
        <div className="relative h-60 rounded-[16px] overflow-hidden">
          <Image src={value} fill alt="value image" className="object-cover" />
        </div>
      ) : (
        <div className="p-6 lg:p-8">
          <div className="flex lg:flex-col gap-6 items-center lg:items-start mb-6">
            <div className="flex justify-center items-center size-10 rounded-[8px] bg-white shrink-0">
              <Image src={value.icon} width={24} height={24} alt="icon" />
            </div>
            <h3 className="font-find-sans-pro text-[18px] lg:text-[20px] font-light leading-[120%] uppercase">
              {value.title}
            </h3>
          </div>
          <p className="whitespace-pre-line">{value.description}</p>
        </div>
      )}
    </motion.li>
  );
}
