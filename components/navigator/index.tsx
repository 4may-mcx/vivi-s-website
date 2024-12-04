'use client';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navMenuConfig } from './config';

const NavigationInnerMenu = () => {
  return (
    <NavigationMenu className="font-mono">
      <NavigationMenuList>
        {navMenuConfig.map((item) => (
          <NavigationMenuItem key={item.path}>
            <Link href={item.path} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {item.name}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const LogoCell = () => (
  <div className="flex h-full cursor-pointer items-center justify-center font-serif text-lg font-semibold">
    <Link href="/">{'Vivi & cC3Bad'}</Link>
  </div>
);

export const NavBar = () => {
  return (
    <div className="fixed top-0 flex h-14 w-full justify-between bg-white px-10 py-2 shadow-md">
      <LogoCell />
      <NavigationInnerMenu />
    </div>
  );
};
