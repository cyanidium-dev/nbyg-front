interface MapPointIconProps {
    className?: string;
}

export default function MapPointIcon({ className }: MapPointIconProps) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Map point icon"
        >
            <path
                d="M5.33203 13.5244C5.33203 7.5278 10.1077 2.66663 15.9987 2.66663C21.8897 2.66663 26.6654 7.5278 26.6654 13.5244C26.6654 19.4739 23.2609 26.4165 17.9493 28.8992C16.711 29.478 15.2864 29.478 14.0481 28.8992C8.73646 26.4165 5.33203 19.4739 5.33203 13.5244Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <circle
                cx="16"
                cy="13.3334"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        </svg>
    );
}

