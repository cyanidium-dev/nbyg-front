import { twMerge } from "tailwind-merge";

interface SectionTitleProps {
  children: string;
  className?: string;
}

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={twMerge(
        "font-find-sans-pro text-[24px] lg:text-[48px] font-light leading-[120%] uppercase",
        className
      )}
    >
      {children}
    </h2>
  );
}
