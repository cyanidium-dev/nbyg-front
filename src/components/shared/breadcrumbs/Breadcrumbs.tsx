import Container from "../container/Container";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { twMerge } from "tailwind-merge";

interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  crumbs: Breadcrumb[];
  className?: string;
}

export default function Breadcrumbs({
  crumbs,
  className = "",
}: BreadcrumbsProps) {
  return (
    <Container>
      <motion.nav
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInAnimation({})}
        aria-label="breadcrumbs"
        className={twMerge(`flex items-center pt-4 lg:pt-10`, className)}
      >
        <ul className="flex items-center flex-wrap">
          {crumbs.map((crumb, index) => (
            <li
              key={crumb.href}
              className={`flex items-center text-[12px] lg:text-[16px] font-light leading-[120%]`}
            >
              {index === crumbs.length - 1 ? (
                <>
                  <span>{crumb.label}</span>
                </>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className="outline-none text-shadow-white"
                  >
                    {crumb.label}
                  </Link>
                  <span className="inline-block mx-2 lg:mx-3">/</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </motion.nav>
    </Container>
  );
}
