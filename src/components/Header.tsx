"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BurgerMenuBtn from "./BurgerMenuBtn/BurgerMenuBtn";
import { ArrowDown01Icon } from "hugeicons-react";
import axios from "axios";
import { EventType } from "@/interfaces/interfaces";

const Header = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [eventTypes, setEventTypes] = useState([]);
  const [openEventsSubmenu, setOpenEventsSubmenu] = useState(false);

  const toggleSubmenu = () => setOpenEventsSubmenu((prev) => !prev);

  useEffect(() => {
    axios.get("/api/eventTypes?field=name").then((res) => {
      console.log(res.data);
      setEventTypes(res.data);
    });
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/events")) setOpenEventsSubmenu(true);
    else if (openEventsSubmenu && !pathname.startsWith("/events"))
      setOpenEventsSubmenu(false);
  }, [pathname]);

  return (
    <header className="bg-white shadow-md sticky top-0 h-14 md:h-20 w-full z-50 flex">
      <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-12 flex justify-between items-center h-full">
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
        <nav className="header-desktop hidden md:block h-full">
          <ul className="flex gap-8 h-full">
            {[
              { href: "/", label: "Accueil" },
              { href: "/about", label: "À propos" },
              { href: "/events", label: "Événements" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <li key={link.href} className="navlink-container group">
                <span className="h-full flex items-center">
                  <Link
                    href={link.href}
                    className={`navlink relative flex ${
                      pathname.startsWith(link.href) && link.href !== "/"
                        ? "active"
                        : link.href === "/" && pathname === link.href
                        ? "active"
                        : ""
                    }`}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    {link.label}{" "}
                    {link.href === "/events" && (
                      <ArrowDown01Icon
                        className="ml-1 mt-[2px] -mr-[5px]"
                        size={20}
                        color="black"
                      />
                    )}
                  </Link>
                </span>
                {link.href === "/events" && (
                  <ul className="absolute bg-white shadow-md rounded-b-lg px-6 py-4 top-full transform -translate-x-1/4 scale-y-0 origin-top grid gap-4 group-hover:scale-y-100 transition-transform duration-300 ease-in-out border-t-2 border-OMBpink">
                    <li className="sublink-container">
                      <Link
                        href="/events"
                        className={`sublink relative z-0 ${
                          pathname === "/events" ? "active" : ""
                        }`}
                      >
                        Tous nos événements
                      </Link>
                    </li>
                    {eventTypes.map((eventType: any) => (
                      <li key={eventType._id} className="sublink-container">
                        <Link
                          href={`/events/${eventType._id}`}
                          className={`sublink relative z-0 ${
                            pathname === `/events/${eventType._id}`
                              ? "active"
                              : ""
                          }`}
                        >
                          {eventType.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        {/* <nav
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
              <li key={link.href} className="navlink-container text-center">
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
                  onClick={() => setOpenMenu(false)}
                >
                  <span
                    className={`${
                      link.href === "/events" && "flex justify-center"
                    }`}
                  >
                    {link.label}
                    {link.href === "/events" && (
                      <ArrowDown01Icon
                        className="ml-1 mt-[2px] -mr-[5px]"
                        size={20}
                        color="black"
                      />
                    )}
                  </span>
                </Link>
                {link.href === "/events" && (
                  <ul className="grid gap-4 text-[0.75em] text-center mt-2">
                    <li className="sublink-container">
                      <Link
                        href="/events"
                        className={`sublink relative z-0 ${
                          pathname === "/events" ? "active" : ""
                        }`}
                      >
                        Tous nos événements
                      </Link>
                    </li>
                    {eventTypes.map((eventType: EventType) => (
                      <li key={eventType._id} className="sublink-container">
                        <Link
                          href={`/events/${eventType._id}`}
                          className={`sublink relative z-0 ${
                            pathname === `/events/${eventType._id}`
                              ? "active"
                              : ""
                          }`}
                          onClick={() => setOpenMenu(false)}
                        >
                          {eventType.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav> */}

        <nav
          className={`header-mobile bg-white fixed top-14 right-0 w-full h-screen-minus-header-mobile md:hidden ${
            openMenu && "show"
          }`}
        >
          <ul className="flex flex-col min-h-full gap-8 place-items-center p-12 text-3xl w-full">
            <li className="navlink-container text-center">
              <Link
                href="/"
                className={`navlink relative ${pathname === "/" && "active"}`}
                onClick={() => setOpenMenu(false)}
              >
                Accueil
              </Link>
            </li>
            <li className="navlink-container text-center">
              <Link
                href="/about"
                className={`navlink relative ${
                  pathname === "/about" && "active"
                }`}
                onClick={() => setOpenMenu(false)}
              >
                À propos
              </Link>
            </li>

            <li className="navlink-container text-center grid ml-4 gap-2">
              <button
                onClick={toggleSubmenu}
                className="flex justify-center items-center gap-1"
              >
                <span>Événements</span>
                <span>
                  <ArrowDown01Icon
                    className="ml-1 mt-[2px] -mr-[5px]"
                    size={20}
                    color="black"
                  />
                </span>
              </button>
              <ul
                className={`grid gap-4 text-[0.75em] text-center mt-2 overflow-hidden transition-all duration-300 ${
                  openEventsSubmenu
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <li className="sublink-container">
                  <Link
                    href="/events"
                    className={`sublink relative z-0 ${
                      pathname === "/events" ? "active" : ""
                    }`}
                  >
                    Tous nos événements
                  </Link>
                </li>
                {eventTypes.map((eventType: EventType) => (
                  <li key={eventType._id} className="sublink-container">
                    <Link
                      href={`/events/${eventType._id}`}
                      className={`sublink relative z-0 ${
                        pathname === `/events/${eventType._id}` ? "active" : ""
                      }`}
                      onClick={() => setOpenMenu(false)}
                    >
                      {eventType.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="navlink-container text-center">
              <Link
                href="/contact"
                className={`navlink relative ${
                  pathname === "/contact" && "active"
                }`}
                onClick={() => setOpenMenu(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
