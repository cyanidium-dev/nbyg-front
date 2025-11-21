import Link from "next/link";
import Container from "../container/Container";
import SocialsGroup from "./SocialsGroup";
import {
    ADDRESS,
    ADDRESS_URL,
    CONTACT_PHONE,
    CVR,
    EMAIL,
} from "@/constants/constants";
import { contactsPhoneRegex } from "@/regex/regex";
import Rights from "./Rights";

export default function Footer() {
    return (
        <footer className="py-15">
            <Container className="flex flex-col items-center">
                <div className="flex flex-col lg:flex-row lg:justify-between w-full lg:mb-12.5">
                    <div className="flex flex-col items-center lg:items-start mb-4.5 lg:mb-0">
                        <h2 className="text-[14px] leading-[108.28%] uppercase font-light font-find-sans-pro mb-11 text-center">
                            Nbyg Bornholm A<span className="lowercase">p</span>S
                        </h2>
                        <SocialsGroup />
                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:items-start mb-13.5 lg:mb-0">
                        <div className="flex flex-col items-center lg:items-start mb-4.5 lg:mb-0 lg:mr-[143px]">
                            <a
                                href={`tel:${CONTACT_PHONE}`}
                                className="text-[14px] leading-[129%] uppercase font-medium tracking-[0.0016em] mb-3 text-center"
                            >
                                {CONTACT_PHONE.replace(
                                    contactsPhoneRegex,
                                    "+45 $1"
                                )}
                            </a>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="text-[12px] leading-[150%] uppercase font-medium tracking-[0.0016em] text-center"
                            >
                                {EMAIL}
                            </a>
                        </div>
                        <div className="flex flex-col items-center lg:items-start">
                            <a
                                href={CVR}
                                className="text-[12px] leading-[125%] uppercase font-medium mb-4 text-center"
                            >
                                CRV: {CVR}
                            </a>
                            <a
                                href={ADDRESS_URL}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="text-[12px] leading-[125%] uppercase font-medium text-center lg:text-left"
                            >
                                Adresse:{" "}
                                <span className="block">{ADDRESS}</span>
                            </a>
                        </div>
                    </div>
                </div>

                <Rights />
            </Container>
        </footer>
    );
}
