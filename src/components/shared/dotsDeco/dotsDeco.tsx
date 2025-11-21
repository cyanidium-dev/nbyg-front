import { twMerge } from "tailwind-merge";

interface DotsDecoProps {
    className?: string;
}

export default function DotsDeco({ className }: DotsDecoProps) {
    return (
        <div className={twMerge("flex gap-3", className)}>
            <div className="size-4 bg-brown rounded-full" />
            <div className="size-4 bg-linear-[167.47deg] from-beige from-9.09% to-brown to-105.68% rounded-full" />
            <div className="size-4 bg-white rounded-full" />
        </div>
    );
}
