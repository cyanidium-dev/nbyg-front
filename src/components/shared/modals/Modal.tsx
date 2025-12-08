import { Dispatch, ReactNode, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

import IconButton from "../buttons/IconButton";
import CloseIcon from "../icons/CloseIcon";

interface ModalProps {
  isModalShown: boolean;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
  closeButtonClassName?: string;
  variant?: "notification" | "default";
}

export default function Modal({
  isModalShown,
  setIsModalShown,
  children,
  className = "",
  closeButtonClassName = "",
  variant = "default",
}: ModalProps) {
  const variants = {
    notification:
      "linear-gradient(129.15deg, var(--color-gradient-brown-dark) 21.74%, var(--color-black) 103.38%)",
    default:
      "linear-gradient(316.28deg, var(--color-gradient-brown-dark) 6.67%, var(--color-black) 95.76%)",
  };

  return (
    <div
      className={twMerge(
        `${
          isModalShown
            ? " -translate-y-[calc(50dvh-50%)] opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-60"
        } fixed left-1/2 bottom-0 transform -translate-x-1/2 flex transition duration-600 ease-out z-70 max-h-dvh
      md:rounded-[12px] shadow-md bg-black`,
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={twMerge(
          "absolute inset-0 md:rounded-[12px] pointer-events-none",
          variant === "notification" && "rounded-[12px]"
        )}
        style={{
          background: variants[variant],
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <IconButton
        handleClick={() => setIsModalShown(false)}
        className={twMerge(
          "absolute top-8 md:top-5 right-4 md:right-5 w-8 h-8 z-30",
          closeButtonClassName
        )}
      >
        {<CloseIcon className="size-6" />}
      </IconButton>
      {children}
    </div>
  );
}
