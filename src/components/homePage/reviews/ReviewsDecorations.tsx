import Image from "next/image";

export default function ReviewsDecorations() {
    return (
        <div className="absolute -z-10 inset-0 pointer-events-none">
            <div className="absolute right-[-154px] top-[13px] rotate-[-34deg]">
                <Image
                    src="/images/decorations/ellipsis.svg"
                    alt="ellipsis"
                    width="300"
                    height="228"
                    className="w-[300px] h-auto"
                />
            </div>
            <div className="absolute bottom-[-72px] right-[-92px] rotate-[52deg]">
                <Image
                    src="/images/decorations/ellipsis.svg"
                    alt="ellipsis"
                    width="300"
                    height="228"
                    className="w-[300px] h-auto"
                />
            </div>
        </div>
    );
}
