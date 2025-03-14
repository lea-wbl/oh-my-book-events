"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BurgerMenuBtn from "./BurgerMenuBtn";

const Header = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 h-14 md:h-20 w-full z-50">
      <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-12 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-red-500 w-16 h-12 md:w-20 md:h-16 relative">
          <Link href="/">
            <Image
              src="/logo-oh-my-book.png"
              alt="Oh My Book"
              // width={80}
              // height={40}
              className="md:mt-[2px] mt-[-2px]"
              priority
              fill
              // sizes="(max-width: 768px) 3rem, (max-width: 1200px) 5rem"
            />
          </Link>
        </div>

        <BurgerMenuBtn open={openMenu} setOpen={setOpenMenu} />

        {/* Navigation */}
        <nav className="header-desktop hidden md:block">
          <ul className="flex gap-8">
            {[
              { href: "/", label: "Accueil" },
              { href: "/about", label: "À propos" },
              { href: "/events", label: "Événements" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href} className="navlink-container">
                <Link
                  href={link.href}
                  className={`navlink relative ${
                    pathname.startsWith(link.href) && link.href !== "/"
                      ? "active"
                      : link.href === "/" && pathname === link.href
                      ? "active"
                      : ""
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav
          className={`header-mobile bg-white fixed top-14 right-0 w-full h-screen-minus-header-mobile md:hidden ${
            openMenu && "show"
          }`}
        >
          <ul className="grid gap-8 place-items-center p-12 text-3xl w-full">
            {[
              { href: "/", label: "Accueil" },
              { href: "/about", label: "À propos" },
              { href: "/events", label: "Événements" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href} className="navlink-container">
                <Link
                  href={link.href}
                  className={`navlink relative ${
                    pathname === link.href ? "active" : ""
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                  onClick={() => setOpenMenu(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
