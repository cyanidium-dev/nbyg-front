import Link from 'next/link';
import { mainNavList } from './NavList';

export const NavMenu = () => {
  return (
    <nav className="flex items-center justify-between hidden lg:block">
      <ul className="flex items-center gap-[32px] font-light uppercase leading-[120%] text-[16px]">
        {mainNavList.map(item => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
