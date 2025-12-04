interface TickIconProps {
  className?: string;
}

export default function TickIcon({ className = "" }: TickIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tick icon"
      width="32"
      height="32"
    >
      <path d="M28.769 6.972c-0.281 0.032-0.525 0.172-0.691 0.378l-0.002 0.002-13.563 16.938-9.849-8.203c-0.178-0.151-0.411-0.242-0.664-0.242-0.318 0-0.603 0.144-0.793 0.371l-0.001 0.002c-0.149 0.178-0.24 0.409-0.24 0.662 0 0.32 0.145 0.606 0.374 0.795l0.002 0.001 11.474 9.552 14.875-18.583c0.14-0.175 0.224-0.399 0.224-0.643 0-0.325-0.15-0.614-0.384-0.804l-0.002-0.002c-0.176-0.143-0.403-0.23-0.65-0.23-0.039 0-0.078 0.002-0.115 0.006l0.005-0z"></path>
    </svg>
  );
}

