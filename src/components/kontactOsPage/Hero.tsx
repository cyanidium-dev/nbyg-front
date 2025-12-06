import PageTitle from "../shared/titles/PageTitle";
import Container from "../shared/container/Container";
import Image from "next/image";
import { headerVariants } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

export default function Hero() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.01 }}
            variants={headerVariants}
            className="relative rounded-b-[18px] overflow-hidden"
        >
            <Image
                src="/images/kontaktOsPage/heroImage.webp"
                fill
                alt="kontakt os hero image"
                sizes="100vw"
                className="object-cover -z-20"
                priority
                fetchPriority="high"
            />
            <div
                className="absolute inset-0 -z-10"
                style={{
                    background: `
                        linear-gradient(
                            0deg,
                            rgba(0, 0, 0, 0) -36.89%,
                            rgba(0, 0, 0, 0.464) 91.14%,
                            rgba(0, 0, 0, 0) 144.39%
                        ),
                        linear-gradient(
                            240.18deg,
                            rgba(0, 0, 0, 0) 19.24%,
                            rgba(0, 0, 0, 0.8) 82.96%
                        )
                        `,
                }}
            />
            <Container className="pt-[178px] lg:pt-[257px] pb-[102px] lg:pb-[158px]">
                <PageTitle>Kontakt os</PageTitle>
            </Container>
        </motion.section>
    );
}
