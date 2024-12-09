'use client';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { navMenuConfig } from './config';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const ClerkSignInStatus = () => (
  <>
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton>
        <Button variant="ghost">
          <LogIn size={16} />
        </Button>
      </SignInButton>
    </SignedOut>
  </>
);

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
        <ClerkSignInStatus />
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
    <header className="fixed top-0 flex h-14 w-full justify-between bg-white px-10 py-2 shadow-md">
      <LogoCell />
      <NavigationInnerMenu />
    </header>
  );
};
