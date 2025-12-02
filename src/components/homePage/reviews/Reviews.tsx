import Container from "../../shared/container/Container";
import SectionTitle from "../../shared/titles/SectionTitle";
import { reviewsData } from "./reviewsData";
import ReviewsBlock from "./ReviewsBlock";
import Image from "next/image";
import ReviewsDecorations from "./ReviewsDecorations";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

export default function Reviews() {
    return (
        <section className="py-25 lg:pt-[138px] lg:pb-0">
            <Container className="relative">
                <ReviewsDecorations />
                <div className="mb-10 lg:mb-[78px] md:flex items-center justify-between">
                    <div>
                        <SectionTitle className="mb-8 xl:text-[64px] md:mb-[59px]">
                            Anmeldelser
                        </SectionTitle>
                        <motion.p
                            variants={fadeInAnimation({ delay: 0.2, y: 20 })}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true, amount: 0.1 }}
                            className="text-[18px] leading-[111%] font-light"
                        >
                            Hvad vores kunder siger om os
                        </motion.p>
                    </div>
                    <motion.div
                        variants={fadeInAnimation({
                            delay: 0.4,
                            x: 20,
                            scale: 0.8,
                        })}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative hidden md:block h-[156px] w-[46.12%] rounded-[8px] overflow-hidden"
                    >
                        <Image
                            src="/images/homePage/reviews/reviewImage.webp"
                            alt="Reviews"
                            fill
                            className="object-cover object-[center_23%]"
                        />
                    </motion.div>
                </div>
                <ReviewsBlock reviews={reviewsData} />
                <motion.div
                    variants={fadeInAnimation({ delay: 0.8, y: 20 })}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    className="md:hidden relative mt-[54px] w-full h-auto aspect-328/156 rounded-[8px] overflow-hidden"
                >
                    <Image
                        src="/images/homePage/reviews/reviewImage.webp"
                        alt="Reviews"
                        fill
                        className="object-cover object-top"
                    />
                </motion.div>
            </Container>
        </section>
    );
}
