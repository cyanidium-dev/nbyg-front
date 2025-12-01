import Container from "../../shared/container/Container";
import SectionTitle from "../../shared/titles/SectionTitle";
import { reviewsData } from "./reviewsData";
import ReviewsBlock from "./ReviewsBlock";
import Image from "next/image";
import ReviewsDecorations from "./ReviewsDecorations";

export default function Reviews() {
    return (
        <section className="py-25 relative">
            <ReviewsDecorations />
            <Container>
                <SectionTitle className="mb-8">Anmeldelser</SectionTitle>
                <p className="mb-10 text-[18px] leading-[111%] font-light">
                    Hvad vores kunder siger om os
                </p>
                <ReviewsBlock reviews={reviewsData} />
                <div className="relative mt-[54px] w-full h-[156px] rounded-[8px] overflow-hidden">
                    <Image
                        src="/images/homePage/reviews/reviewImage.webp"
                        alt="Reviews"
                        fill
                        className="object-cover"
                    />
                </div>
            </Container>
        </section>
    );
}
