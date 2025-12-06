import * as motion from "motion/react-client";
import { headerVariants } from "@/utils/animationVariants";
import SectionTitle from "../shared/titles/SectionTitle";
import ContactForm from "../shared/form/ContactForm";

export default function ContactFormBlock() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.01 }}
            variants={headerVariants}
            className="relative max-w-[420px] p-px rounded-[16px] h-full"
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(4, 4, 4, 0.4), rgba(4, 4, 4, 0.4)), 
                        linear-gradient(129.15deg, var(--color-gradient-brown-dark) 21.74%, var(--color-black) 103.38%)`,
            }}
        >
            <div className="px-6 py-8 bg-black rounded-[16px] w-full h-full">
                <SectionTitle className="mb-6">Kontakt os</SectionTitle>
                <p className="text-[14px] leading-[121.4%] md:text-[16px] md:leading-[125%] font-light mb-6 tracking-[-0.02rem]">
                    Har du spørgsmål eller ønsker du et tilbud? Udfyld
                    formularen nedenfor – vi vender hurtigt tilbage med
                    rådgivning eller et uforpligtende tilbud.
                </p>
                <ContactForm />
            </div>
        </motion.section>
    );
}
