import Container from "../../shared/container/Container";
import SectionTitle from "../../shared/titles/SectionTitle";
import { reviewsData } from "./reviewsData";
import ReviewsBlock from "./ReviewsBlock";
import Image from "next/image";
import ReviewsDecorations from "./ReviewsDecorations";

export default function Reviews() {
    return (
        <section className="py-25 lg:py-[138px]">
            <Container className="relative">
                <ReviewsDecorations />
                <div className="mb-10 lg:mb-[78px] md:flex items-center justify-between">
                    <div>
                        <SectionTitle className="mb-8 xl:text-[64px] md:mb-[59px]">
                            Anmeldelser
                        </SectionTitle>
                        <p className="text-[18px] leading-[111%] font-light">
                            Hvad vores kunder siger om os
                        </p>
                    </div>
                    <div className="relative hidden md:block h-[156px] w-[46.12%] rounded-[8px] overflow-hidden">
                        <Image
                            src="/images/homePage/reviews/reviewImage.webp"
                            alt="Reviews"
                            fill
                            className="object-cover object-[center_23%]"
                        />
                    </div>
                </div>
                <ReviewsBlock reviews={reviewsData} />
                <div className="md:hidden relative mt-[54px] w-full h-auto aspect-328/156 rounded-[8px] overflow-hidden">
                    <Image
                        src="/images/homePage/reviews/reviewImage.webp"
                        alt="Reviews"
                        fill
                        className="object-cover object-top"
                    />
                </div>
            </Container>
        </section>
    );
}
