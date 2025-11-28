interface ArrowIconProps {
  className?: string;
}

export default function ArrowIcon({ className = "" }: ArrowIconProps) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="arrow icon"
      className={className}
    >
      <path
        d="M20.9876 17.0327L20.9876 7.12776L11.0827 7.12776"
        stroke="currentColor"
        strokeWidth="1.73077"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.9072 20.7779L20.6387 7.04639"
        stroke="currentColor"
        strokeWidth="1.73077"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
