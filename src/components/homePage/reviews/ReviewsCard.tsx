import Image from "next/image";
import { Review } from "./reviewsData";

interface ReviewsCardProps {
    review: Review;
}

export default function ReviewsCard({ review }: ReviewsCardProps) {
    return (
        <div className="relative rounded-[8px] p-px w-full h-full">
            <div
                className="absolute z-10 inset-0 rounded-[8px] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, var(--color-black), var(--color-brown))",
                    padding: "1px",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
            />
            <div className="w-full h-full rounded-[8px] p-5 flex flex-col">
                <div className="flex gap-[15px] mb-8">
                    <Image
                        src={review.image}
                        alt={review.name}
                        width={52}
                        height={52}
                        className="rounded-full size-[52px] shrink-0"
                    />
                    <div>
                        <p className="text-[16px] md:text-[18px] leading-[125%] md:leading-[111%] mb-2">
                            {review.name}
                        </p>
                        <div className="flex items-center">
                            {review.rating &&
                                Array.from({ length: review.rating }).map(
                                    (_, index) => (
                                        <div
                                            key={index}
                                            className="size-[26px] flex items-center justify-center"
                                        >
                                            <Image
                                                src="/images/homePage/reviews/reviewStar.svg"
                                                alt="Star"
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
                <div className="h-full flex items-center">
                    <p className="text-[12px] leading-[167%] font-light whitespace-pre-line">
                        {review.text}
                    </p>
                </div>
            </div>
        </div>
    );
}
