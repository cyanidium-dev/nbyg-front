import { CODE_SITE_URL, WEB_BOND_URL } from "@/constants/constants";
import Image from "next/image";
import DecorativeEllipsis from "../decorativeEllipsis/DecorativeEllipsis";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Rights() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex flex-col md:flex-row md:justify-between items-center justify-center w-full">
            <motion.p
                variants={fadeInAnimation({ delay: 1 })}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="text-[16px] leading-[181%] uppercase tracking-[0.64px] mb-4.5 md:mb-0"
            >
                © {currentYear} Nbyg Bornholm ApS
            </motion.p>
            <DecorativeEllipsis
                uniqueKey="rights-ellipsis"
                delay={1.4}
                staggerDelay={0.1}
                className="hidden lg:flex"
            />
            <motion.div
                variants={fadeInAnimation({ delay: 1.1 })}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                className="flex flex-col md:flex-row items-center"
            >
                <p className="text-[12px] leading-[125%] uppercase font-medium mb-3 md:mb-0 md:mr-6">
                    Created by
                </p>
                <div className="flex items-center flex-col md:items-start">
                    <motion.div
                        variants={fadeInAnimation({ delay: 1.2 })}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <a
                            href={WEB_BOND_URL}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="py-1 xl:hover:opacity-80 transition-opacity duration-300 inline-block"
                        >
                            <Image
                                src="/images/footer/WebBondLogo.webp"
                                alt="WebBond"
                                width={96}
                                height={32}
                            />
                        </a>
                    </motion.div>
                    <motion.div
                        variants={fadeInAnimation({ delay: 1.3 })}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <a
                            href={CODE_SITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="xl:hover:opacity-80 transition-opacity duration-300 inline-block"
                        >
                            <Image
                                src="/images/footer/CodeSiteLogo.svg"
                                alt="CodeSite"
                                width={126}
                                height={24}
                            />
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
