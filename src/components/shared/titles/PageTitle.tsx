import { twMerge } from "tailwind-merge";

interface PageTitleProps {
  children: string;
  className?: string;
}

export default function PageTitle({
  children,
  className = "",
}: PageTitleProps) {
  return (
    <h1
      className={twMerge(
        "font-find-sans-pro text-[24px] lg:text-[48px] font-light leading-[120%] uppercase",
        className
      )}
    >
      {children}
    </h1>
  );
}
