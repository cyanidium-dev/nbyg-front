import clsx from "clsx";

interface MainButtonProps {
    children: React.ReactNode;
    as: "button" | "a";
    href?: string;
    className?: string;
    variant?: "fill" | "outline" | "gradient";
    props?: React.ComponentProps<"button" | "a">;
}

export default function MainButton({
    children,
    as = "button",
    href,
    className,
    variant = "fill",
    ...props
}: MainButtonProps) {
    const variants = {
        fill: "bg-white text-black",
        outline:
            "bg-transparent text-white border border-white hover:bg-white/10",
        gradient:
            // fill in later
            "",
    };
    const Component = as;

    return (
        <Component
            href={as === "a" ? href : undefined}
            {...props}
            className={clsx(
                "cursor-pointer items-center justify-center text-3 md:text-3.5 leading-5 rounded-full w-[140px] h-8 md:w-[217px] md:h-12 transition duration-300",
                variants[variant],
                className
            )}
        >
            {children}
        </Component>
    );
}
