"use client";

import { useState } from "react";
import Link from "next/link";
import { CancelCircleIcon, Menu01Icon } from "hugeicons-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (session)
    return (
      <div className="relative">
        {/* Button to toggle sidebar (visible on mobile) */}
        <button
          className="p-2 m-2 text-gray-700 lg:hidden absolute top-0 left-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <CancelCircleIcon size={30} color="white" />
          ) : (
            <Menu01Icon size={30} />
          )}
        </button>

        {/* Sidebar */}
        <div
          className={`z-10 fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform lg:translate-x-0 px-4 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:flex lg:flex-col lg:justify-between lg:py-4`}
        >
          <button
            className="p-2 m-2 text-gray-700 lg:hidden w-full flex justify-end"
            onClick={() => setIsOpen(false)}
          >
            <CancelCircleIcon size={30} color="white" />
          </button>

          <div>
            <div className="p-4 text-lg font-bold border-b border-gray-700">
              Accueil
            </div>

            <nav className="flex flex-col gap-2 p-4">
              <Link
                href="/adminDashboard"
                className={`px-4 py-2 hover:bg-gray-700 rounded-md sidebar-link ${
                  pathname === "/adminDashboard" && "text-orange-500 font-bold"
                }`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Gallerie photos
              </Link>
              <Link
                href="/adminDashboard/reviews"
                className={`px-4 py-2 hover:bg-gray-700 rounded-md sidebar-link ${
                  pathname === "/adminDashboard/reviews" &&
                  "text-orange-500 font-bold"
                }`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Avis clients
              </Link>
            </nav>

            <div className="p-4 text-lg font-bold border-b border-gray-700">
              Événements
            </div>

            <nav className="flex flex-col gap-2 p-4">
              <Link
                href="/adminDashboard/eventTypes"
                className={`px-4 py-2 hover:bg-gray-700 rounded-md sidebar-link ${
                  pathname === "/adminDashboard/eventTypes" &&
                  "text-orange-500 font-bold"
                }`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Types d&apos;événements
              </Link>
              <Link
                href="/adminDashboard/upcomingEvents"
                className={`px-4 py-2 hover:bg-gray-700 rounded-md sidebar-link ${
                  pathname === "/adminDashboard/upcomingEvents" &&
                  "text-orange-500 font-bold"
                }`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Événements à venir
              </Link>
            </nav>

            <div className="p-4 text-lg font-bold border-b border-gray-700">
              Divers
            </div>

            <nav className="flex flex-col gap-2 p-4">
              <Link
                href="/adminDashboard/contact"
                className={`px-4 py-2 hover:bg-gray-700 rounded-md sidebar-link ${
                  pathname === "/adminDashboard/contact" &&
                  "text-orange-500 font-bold"
                }`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Contact
              </Link>
              <Link
                href="/adminDashboard/questions"
                className={`px-4 py-2 hover:bg-gray-700 rounded-md sidebar-link ${
                  pathname === "/adminDashboard/questions" &&
                  "text-orange-500 font-bold"
                }`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                FAQ
              </Link>
            </nav>
          </div>

          <button
            className="bg-gray-700 w-fit px-3 py-1 rounded self-center m-4 border-2 border-gray-700 hover:border-white hover:bg-transparent"
            onClick={() => signOut({ callbackUrl: "/adminDashboard/login" })}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    );
};

export default Sidebar;
