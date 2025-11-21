interface BurgerButtonIconProps {
    className?: string;
}

export default function BurgerButtonIcon({ className }: BurgerButtonIconProps) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Burger menu icon"
        >
            <path d="M24 4H0V6H24V4Z" fill="currentColor" />
            <path d="M24 9H0V11H24V9Z" fill="currentColor" />
            <path d="M24 19H0V21H24V19Z" fill="currentColor" />
            <path d="M24 14H0V16H24V14Z" fill="currentColor" />
        </svg>
    );
}
