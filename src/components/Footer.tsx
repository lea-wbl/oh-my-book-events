"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, TiktokIcon } from "hugeicons-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="bg-[#fff] shadow-sm">
      {/* NEWSLETTER SUBSCRIPTION */}
      <div className="bg-red-200 shadow-md">
        <MaxWidthWrapper>
          <div className="bg-red-200 flex flex-col md:flex-row gap-8 md:gap-4 justify-between">
            <div className="flex gap-8 relative">
              <div className="md:w-2/3">
                <h3 className="text-xl mb-4 font-headline text-[#232323]">
                  Inscription à la{" "}
                  <span className="circle-sketch-highlight z-0">
                    NEWSLETTER
                  </span>
                </h3>
                <div className="relative">
                  <p className="text-[#232323]">
                    Placerat arcu est metus nec egestas commodo. Rutrum porta
                    maecenas posuere duis per auctor lacus.
                  </p>
                  <div className="absolute top-12 right-4 md:top-8 md:right-28 rotate-[25deg] md:rotate-0 md:aspect-[2/3] md:h-16 h-[40px]">
                    <Image
                      src="/heart-doodle.png"
                      alt="heart"
                      fill
                      // width={50}
                      // height={25}
                      priority
                      aria-hidden
                    />
                  </div>
                </div>
              </div>

              <Image
                src="/letter2.png"
                alt="enveloppe"
                width={160}
                height={40}
                className="rotate-[20deg] absolute right-12 top-2 hidden md:block"
                priority
                aria-hidden
              />
            </div>

            {/* contact form */}
            <div className="flex gap-8">
              <form
                className="flex flex-col gap-4 flex-1"
                //onSubmit={handleSubmit}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <label htmlFor="firstname" className="sr-only">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Prénom"
                    className="border border-stone-200 px-2 py-1 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-200 rounded flex-1 md:max-w-48"
                    // onChange={handleChange}
                    // value={contactInfo.name}
                    required
                  />
                  <label htmlFor="lastname" className="sr-only">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Nom"
                    className="border border-stone-200 px-2 py-1 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-200 rounded flex-1 md:max-w-48"
                    // onChange={handleChange}
                    // value={contactInfo.name}
                    required
                  />
                </div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="border border-stone-200 px-2 py-1 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-200 rounded max-w-[25rem]"
                  // onChange={handleChange}
                  // value={contactInfo.email}
                  required
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#f7a976] text-white px-2 py-1 mt-2"
                >
                  S'inscrire
                </button>
              </form>
              <Image
                src="/sparkles3.png"
                alt="sparkles"
                width={80}
                height={40}
                priority
                aria-hidden
                className="hidden md:block"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* FOOTER INFOS */}
      <div className="flex flex-col md:flex-row px-6 py-8 md:p-12 justify-evenly text-sm gap-4">
        {/* CONTACT */}
        <div className="grid gap-2 place-items-center md:place-items-start">
          <h3 className="text-lg md:mb-2 font-headline text-[#232323]">
            Contact
          </h3>
          <p>contact@ohmybook.com</p>
          <p>06 01 02 03 04</p>
          <div className="flex gap-4 ml-[-2px]">
            <InstagramIcon size={24} color="black" className="cursor-pointer" />
            <TiktokIcon size={24} color="black" className="cursor-pointer" />
          </div>
        </div>
        {/* PAGES INFOS */}
        <div className="grid gap-2 md:gap-4 place-items-center md:place-items-start">
          <h3 className="text-lg font-headline text-[#232323]">Liens utiles</h3>
          <ul className="grid gap-2 place-items-center md:place-items-start">
            <li className="footer-link-container z-0">
              <Link href="/" className="footer-link relative">
                À propos
              </Link>
            </li>
            <li className="footer-link-container z-0">
              <Link href="/" className="footer-link relative">
                FAQ
              </Link>
            </li>
            <li className="footer-link-container z-0">
              <Link href="/" className="footer-link relative">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* INFOS LEGALES */}
        <div className="grid gap-2 md:gap-4 place-items-center md:place-items-start">
          <h3 className="text-lg font-headline text-[#232323]">
            Infos légales
          </h3>
          <ul className="grid place-items-center md:place-items-start gap-2">
            <li className="footer-link-container z-0">
              <Link href="/" className="footer-link relative">
                Mentions légales
              </Link>
            </li>
            <li className="footer-link-container z-0">
              <Link href="/" className="footer-link relative">
                Politique de confidentialité
              </Link>
            </li>
            <li className="footer-link-container z-0">
              <Link href="/" className="footer-link relative">
                Conditions générales d'utilisation
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* CREDITS */}
      <div className="grid justify-center text-center pb-2 text-sm">
        <p>© 2025 Oh My Book. Tous droits réservés.</p>
        <p>Conception et développement Acherontia Dev.</p>
      </div>
    </footer>
  );
};

export default Footer;
