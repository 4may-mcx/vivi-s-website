"use client";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navMenuConfig } from "./config";

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
  <div className="h-full flex justify-center items-center font-serif font-semibold text-lg cursor-pointer">
    <Link href="/">{"Vivi & cC3Bad"}</Link>
  </div>
);

export const NavBar = () => {
  return (
    <div className="w-full h-14 px-10 py-2 shadow-md flex justify-between fixed">
      <LogoCell />
      <NavigationInnerMenu />
    </div>
  );
};
