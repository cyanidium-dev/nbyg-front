import LoaderIcon from "../icons/LoaderIcon";
import { twMerge } from "tailwind-merge";

interface MainButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  variant?: "fill" | "outline" | "gradient";
  disabled?: boolean;
  isLoading?: boolean;
  textClassName?: string;
  onClick?: () => void;
  loadingText?: string;
  spanClassName?: string;
  icon?: React.ReactNode;
}

export default function MainButton({
  type = "button",
  children,
  className,
  variant = "fill",
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  textClassName,
  spanClassName,
  onClick,
  icon,
}: MainButtonProps) {
  const variants = {
    fill: "bg-white text-black button-shadow-white",
    outline:
      "bg-transparent text-white border border-white enabled:xl:hover:bg-white/10",
    gradient:
      "bg-gradient-to-r from-black to-brown text-white button-shadow-white",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        `group relative overflow-hidden enabled:cursor-pointer flex items-center justify-center rounded-full 
          disabled:opacity-60 enabled:active:scale-[98%] text-[14px] font-normal leading-[143%] will-change-transform transition duration-300 ease-in-out`,
        "w-full",
        variants[variant],
        className
      )}
    >
      <div className="flex lg:items-center justify-between gap-2.5 w-full">
        <p
          className={twMerge(
            "relative z-10 flex justify-center gap-6 lg:gap-[74px] w-full",
            textClassName
          )}
        >
          {isLoading ? loadingText : children}
        </p>
        {icon ? (
          <span
            className={twMerge(
              "absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full",
              spanClassName
            )}
          >
            {icon}
          </span>
        ) : null}
      </div>
      {isLoading ? <LoaderIcon variant={variant === "fill" ? "black" : variant === "outline" ? "white" : "gradient"} /> : null}
    </button>
  );
}
