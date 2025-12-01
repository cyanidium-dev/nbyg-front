import Image from "next/image";

export default function ReviewsDecorations() {
    return (
        <div className="absolute -z-10 inset-0 pointer-events-none">
            <div className="absolute right-[-154px] md:right-auto md:left-[313px] top-[13px] md:top-auto md:bottom-[-118px] rotate-[-34deg] md:rotate-[240deg]">
                <Image
                    src="/images/decorations/ellipsis.svg"
                    alt="ellipsis"
                    width="300"
                    height="228"
                    className="w-[300px] h-auto"
                />
            </div>
            <div className="absolute bottom-[-72px] md:bottom-[-46px] right-[-92px] md:right-auto md:left-[313px] rotate-[52deg] md:rotate-[240deg]">
                <Image
                    src="/images/decorations/ellipsis.svg"
                    alt="ellipsis"
                    width="300"
                    height="228"
                    className="w-[300px] h-auto"
                />
            </div>
            <div className="hidden md:block absolute z-1 bottom-[70px] left-[313px] w-[416px] h-[309px] bg-black blur-[48.1453px]" />
        </div>
    );
}
