import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface BackdropProps {
  isVisible: boolean;
  onClick: () => void;
  className?: string;
  transparent?: boolean;
}

export default function Backdrop({
  isVisible = false,
  onClick,
  className = "",
  transparent = false,
}: BackdropProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVisible) {
        onClick();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible, onClick]);

  return (
    <div
      className={twMerge(`fixed z-60 inset-0 w-dvw h-dvh ${
        transparent ? "bg-transparent" : "bg-black/60"
      } transition-opacity duration-1000 ease-in-out ${
          isVisible
            ? "opacity-100 no-doc-scroll"
            : "opacity-0 pointer-events-none"
        }`,
        className
      )}
      onClick={onClick}
    />
  );
}
