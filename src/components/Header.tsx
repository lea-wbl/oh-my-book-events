"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md sticky top-0 h-[80px] w-full z-50">
      <div className="max-w-screen-2xl w-full mx-auto px-12 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-red-500">
          <Link href="/">
            <Image
              src="/logo-oh-my-book.png"
              alt="Oh My Book"
              width={80}
              height={40}
              className="mt-[2px]"
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav>
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
                    pathname === link.href ? "active" : ""
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
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
