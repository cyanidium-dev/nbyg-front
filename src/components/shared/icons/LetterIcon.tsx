interface LetterIconProps {
    className?: string;
}

export default function LetterIcon({ className }: LetterIconProps) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Letter icon"
        >
            <path
                d="M2.66797 16C2.66797 10.9717 2.66797 8.45757 4.23007 6.89547C5.79216 5.33337 8.30632 5.33337 13.3346 5.33337H18.668C23.6963 5.33337 26.2104 5.33337 27.7725 6.89547C29.3346 8.45757 29.3346 10.9717 29.3346 16C29.3346 21.0284 29.3346 23.5425 27.7725 25.1046C26.2104 26.6667 23.6963 26.6667 18.668 26.6667H13.3346C8.30632 26.6667 5.79216 26.6667 4.23007 25.1046C2.66797 23.5425 2.66797 21.0284 2.66797 16Z"
                stroke="currentColor"
                strokeWidth="1.5"
            />
            <path
                d="M8 10.6666L10.8785 13.0654C13.3274 15.1061 14.5518 16.1265 16 16.1265C17.4482 16.1265 18.6726 15.1061 21.1215 13.0654L24 10.6666"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

