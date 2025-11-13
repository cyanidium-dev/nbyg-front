interface ShevronIconProps {
    className?: string;
}
export default function ShevronIcon({ className }: ShevronIconProps) {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="currentColor"
            className={className}
            aria-label="Shevron icon"
        >
            <path d="M5.907 20.651c-0.359-0.419-0.311-1.051 0.108-1.41l9.333-8c0.374-0.321 0.927-0.321 1.302 0l9.333 8c0.419 0.359 0.468 0.991 0.108 1.41s-0.991 0.468-1.41 0.108l-8.683-7.442-8.683 7.442c-0.419 0.36-1.051 0.311-1.41-0.108z"></path>
        </svg>
    );
}
