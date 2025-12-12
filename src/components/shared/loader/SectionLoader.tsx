import { twMerge } from "tailwind-merge";

interface SectionLoaderProps {
  className?: string;
}

export default function SectionLoader({ className = "" }: SectionLoaderProps) {
  return (
    <div
      className={twMerge(
        "py-25 lg:pt-[138px] flex items-center justify-center min-h-[400px]",
        className
      )}
    >
      <div className="loader"></div>
    </div>
  );
}


