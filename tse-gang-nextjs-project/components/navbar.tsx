'use client'

import Image from "next/image";
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
    {/* keep a consistent navbar height so the logo never overflows */}
    <div className="relative mx-auto flex w-full max-w-5xl items-center justify-center px-6 py-3 min-h-[72px]">
      {/* offset the brand block from the center to keep nav links centered */}
      <div className="absolute left-6 top-1/2 flex -translate-y-1/2 items-center gap-3">
        {/* clamp the logo to navbar height via the container */}
        <Link href="/" className="flex h-12 items-center rounded-md bg-white/80 p-1 backdrop-blur-sm" aria-label="TSE home">
          <Image
            src="/TSE_Logo_Border4x_nobg.png"
            alt="TSE logo"
            className="h-full w-auto rounded"
            width={42}
            height={64}
            priority
          />
        </Link>
        <span className="text-xl font-semibold text-white">Twisted Saints Esports</span>
      </div>
      <NavigationMenu className="bg-transparent">
        <NavigationMenuList className="flex-wrap items-center justify-center gap-3">
          {NAV_ITEMS.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent px-3 font-semibold text-white hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
