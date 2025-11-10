'use client';
import Container from '../container/Container';
import Link from 'next/link';
import Image from 'next/image';
import { NavMenu } from '../Navigation/Navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    const SCROLL_THRESHOLD = 5;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = currentScrollY - lastScrollY;

          if (currentScrollY <= 10) {
            setIsHeaderVisible(true);
            setIsScrolledDown(false);
          } else if (
            scrollDifference > SCROLL_THRESHOLD &&
            currentScrollY > 100
          ) {
            setIsHeaderVisible(false);
            setIsScrolledDown(true);
          } else if (
            scrollDifference < -SCROLL_THRESHOLD &&
            currentScrollY > 10
          ) {
            setIsHeaderVisible(true);
            setIsScrolledDown(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={71}
              height={71}
              className="rounded-full"
            />
          </Link>
          <NavMenu />
          <button className="flex items-center justify-center font-normal text-[12px] leading-[20px] border border-white rounded-full w-[140px] h-[32px]">
            Kontakt os
          </button>
          <button>burger menu</button>
        </div>
      </Container>
    </header>
  );
};
