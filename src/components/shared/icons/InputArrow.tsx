interface InputArrowProps {
    className?: string;
    direction?: "up" | "down";
}

export default function InputArrow({
    className = "",
    direction = "up",
}: InputArrowProps) {
    const rotation = direction === "down" ? "rotate-180" : "";

    return (
        <svg
            className={`${className} ${rotation}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label={`${direction === "up" ? "Increment" : "Decrement"} arrow`}
        >
            <path
                d="M12.6654 10L7.9987 6L3.33203 10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
