import { CODE_SITE_URL, WEB_BOND_URL } from "@/constants/constants";
import Image from "next/image";
import DotsDeco from "../dotsDeco/dotsDeco";

export default function Rights() {
    return (
        <div className="flex flex-col lg:flex-row lg:justify-between items-center justify-center w-full">
            <p className="text-[16px] leading-[181%] uppercase font-medium tracking-[0.64px] mb-4.5">
                © 2024 Nbyg Bornholm ApS
            </p>
            <DotsDeco className="hidden lg:flex" />
            <div className="flex flex-col lg:flex-row items-center">
                <p className="text-[12px] leading-[125%] uppercase font-medium mb-3 lg:mb-0 lg:mr-6">
                    Created by
                </p>
                <div>
                    <a
                        href={WEB_BOND_URL}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="xl:hover:opacity-80 transition-opacity duration-300 py-1"
                    >
                        <Image
                            src="/images/footer/WebBondLogo.webp"
                            alt="WebBond"
                            width={96}
                            height={32}
                        />
                    </a>
                    <a
                        href={CODE_SITE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="xl:hover:opacity-80 transition-opacity duration-300"
                    >
                        <Image
                            src="/images/footer/CodeSiteLogo.svg"
                            alt="CodeSite"
                            width={126}
                            height={24}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
