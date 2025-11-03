import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

// Main links we want ready in the top bar.
const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About TSE" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

const Navbar = () => (
  <nav
    className="bg-tse-red px-6 py-3 shadow-md"
    aria-label="Primary navigation"
  >
    {/* Keep the links centered and evenly spaced across breakpoints. */}
    <ul className="flex flex-wrap items-center justify-center gap-6 m-0 list-none p-0">
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="inline-block font-semibold text-white tracking-wide transition duration-200 hover:-translate-y-0.5 hover:text-tse-yellow focus-visible:-translate-y-0.5 focus-visible:text-tse-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tse-yellow"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
