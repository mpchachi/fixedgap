"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/navigation-menu";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const productLinks = [
    { href: "/problem", label: "Problem", description: "The gap in stroke recovery" },
    { href: "/solution", label: "Solution", description: "How FixedGap works" },
    { href: "/demo", label: "Demo", description: "See the platform in action" },
  ];

  const companyLinks = [
    { href: "/team", label: "Team", description: "The people behind FixedGap" },
    { href: "/about", label: "Our Story", description: "How we got here" },
    { href: "/manifesto", label: "Manifesto", description: "What we believe" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-slate-900 font-bold text-lg tracking-tight">
          FixedGap
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-slate-500 hover:text-slate-900 bg-transparent hover:bg-slate-100 px-3 py-2">
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-2">
                    {productLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className={`block rounded-md px-3 py-2.5 transition-colors hover:bg-slate-50 ${
                              pathname === link.href ? "bg-slate-50" : ""
                            }`}
                          >
                            <span className="text-sm font-medium text-slate-900">{link.label}</span>
                            <span className="text-xs text-slate-500 mt-0.5 block">{link.description}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-slate-500 hover:text-slate-900 bg-transparent hover:bg-slate-100 px-3 py-2">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-2">
                    {companyLinks.map((link) => (
                      <li key={link.href}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className={`block rounded-md px-3 py-2.5 transition-colors hover:bg-slate-50 ${
                              pathname === link.href ? "bg-slate-50" : ""
                            }`}
                          >
                            <span className="text-sm font-medium text-slate-900">{link.label}</span>
                            <span className="text-xs text-slate-500 mt-0.5 block">{link.description}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/market"
                  className={`inline-flex h-9 items-center justify-center rounded-md px-3 py-2 text-sm transition-colors ${
                    pathname === "/market"
                      ? "text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Market
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/contact"
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors active:scale-[0.98] ml-3"
          >
            Contact
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-600 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 border-t border-slate-200/60 bg-white/90 backdrop-blur-xl">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-4 pb-2">Product</p>
          {productLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2.5 text-sm border-b border-slate-100 ${
                pathname === link.href
                  ? "text-slate-900 font-medium"
                  : "text-slate-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider pt-4 pb-2">Company</p>
          {companyLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2.5 text-sm border-b border-slate-100 ${
                pathname === link.href
                  ? "text-slate-900 font-medium"
                  : "text-slate-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/market"
            onClick={() => setMenuOpen(false)}
            className={`block py-2.5 text-sm border-b border-slate-100 ${
              pathname === "/market" ? "text-slate-900 font-medium" : "text-slate-500"
            }`}
          >
            Market
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="block py-3 text-slate-900 text-sm font-medium mt-2"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
