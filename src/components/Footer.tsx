"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { InstagramIcon, TiktokIcon } from "hugeicons-react";

const Footer = () => {
  return (
    <footer className="bg-[#fff] shadow-sm">
      {/* NEWSLETTER SUBSCRIPTION */}
      <div className="bg-[#FCC0C5] shadow-md relative">
        <div
          className="absolute top-0 left-0 h-full w-full rotate-180 z-0"
          style={{ boxShadow: "0px 5px 10px 0px rgb(179 96 103 / 10%)" }}
        ></div>
        <div className="mx-auto w-full max-w-screen-2xl px-6 md:px-12 py-8 md:py-12">
          <div className="bg-[#FCC0C5] flex flex-col md:flex-row gap-8 md:gap-4 justify-around relative z-10">
            <Image
              src="/heart-doodle.png"
              alt="heart"
              width={50}
              height={50}
              priority
              aria-hidden
              className="w-10 md:w-16 h-auto absolute top-6 left-6 md:-top-4 md:left-6 rotate-[30deg] md:-rotate-6"
            />
            <div className="flex gap-8 relative">
              <div className="md:w-2/3">
                <div className="grid justify-items-center gap-1 text-white">
                  <span className="text-4xl">Inscription</span>
                  <div className="flex items-center gap-2">
                    <hr className="border-white border-[1px] w-16" />
                    <span className="text-2xl">à la</span>
                    <hr className="border-white border-[1px] w-16" />
                  </div>
                  <span className="font-bold text-5xl font-headline">
                    NEWSLETTER
                  </span>
                </div>
              </div>
            </div>

            <div className="w-40 h-fit">
              <Image
                src="/letter2.png"
                alt="enveloppe"
                width={500}
                height={500}
                className="rotate-[20deg] hidden md:block w-full h-auto"
                priority
                aria-hidden
              />
            </div>

            {/* contact form */}
            <div className="flex gap-8">
              <form
                className="flex flex-col gap-4 flex-1 md:max-w-[25rem] h-fit"
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
                  className="border border-stone-200 px-2 py-1 focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-red-200 rounded flex-1 md:max-w-[25rem]"
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
                width={50}
                height={50}
                priority
                aria-hidden
                className="hidden md:block w-auto h-4/5"
              />
            </div>
          </div>
        </div>
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
              <Link href="/about" className="footer-link relative">
                À propos
              </Link>
            </li>
            <li className="footer-link-container z-0">
              <Link href="/faq" className="footer-link relative">
                FAQ
              </Link>
            </li>
            <li className="footer-link-container z-0">
              <Link href="/contact" className="footer-link relative">
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
