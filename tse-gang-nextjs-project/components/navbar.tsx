"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BurgerMenu } from "@/components/burger-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DropdownMenuItem } from "./ui/dropdown-menu";

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

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="bg-tse-red shadow-md" aria-label="Primary navigation">
      {/* keep a consistent navbar height so the logo never overflows */}
      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-3 min-h-[72px]">
        {/* offset the brand block from the center to keep nav links centered */}
        <div className="flex items-center gap-3 mr-6 justify-between w-full md:w-auto">
          {/* clamp the logo to navbar height via the container */}
          <div className="flex gap-2 w-fit">
            <Link
              href="/"
              className="flex h-13 w-11 overflow-hidden items-center rounded-md bg-white/80 -mt-1 p-1 backdrop-blur-sm"
              aria-label="TSE home"
            >
              <Image
                src="/TSE_Logo_Border4x_nobg.png"
                alt="TSE logo"
                className="h-full w-full object-contain -translate-y-0.5"
                fill
                priority
              />
            </Link>
            <Link
              href="/"
              className="flex flex-col text-left text-white font-semibold text-xs leading-[1.1]"
            >
              <span>Twisted</span>
              <span>Saints</span>
              <span>Esports</span>
            </Link>
          </div>
        </div>
        <BurgerMenu>
          {NAV_ITEMS.map((item) => (
            <DropdownMenuItem key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </DropdownMenuItem>
          ))}
        </BurgerMenu>
        <NavigationMenu className="bg-transparent hidden md:flex">
          <NavigationMenuList className="flex-wrap items-center justify-center gap-3">
            {NAV_ITEMS.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "font-semibold text-white px-4 py-2 rounded hover:text-gray-100 focus:text-gray-100",
                    pathname === item.href && "bg-[#6e1315]"
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
};

export default Navbar;
