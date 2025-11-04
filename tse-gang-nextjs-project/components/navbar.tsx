'use client'

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About TSE" },
  { href: "/faq", label: "FAQ" },
];

const Navbar = () => (
  <header className="bg-tse-red shadow-md" aria-label="Primary navigation">
    <div className="mx-auto flex max-w-5xl justify-center px-6 py-3">
      <NavigationMenu className="bg-transparent">
        <NavigationMenuList className="flex-wrap gap-3">
          {NAV_ITEMS.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent px-3 font-semibold text-white hover:bg-transparent hover:text-tse-yellow focus:bg-transparent focus:text-tse-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tse-yellow"
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </header>
);

export default Navbar;
