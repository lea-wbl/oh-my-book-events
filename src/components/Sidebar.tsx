"use client";

import { useState } from "react";
import Link from "next/link";
import { CancelCircleIcon, Menu01Icon } from "hugeicons-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform lg:translate-x-0 px-4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:flex lg:flex-col lg:justify-start lg:py-4`}
      >
        <button
          className="p-2 m-2 text-gray-700 lg:hidden w-full flex justify-end"
          onClick={() => setIsOpen(false)}
        >
          <CancelCircleIcon size={30} color="white" />
        </button>

        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Accueil
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <Link
            href="/adminDashboard"
            className="px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Gallerie photos
          </Link>
          <Link
            href="/adminDashboard/reviews"
            className="px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Avis clients
          </Link>
        </nav>

        <div className="p-4 text-lg font-bold border-b border-gray-700">
          À propos
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <Link
            href="/adminDashboard/questions"
            className="px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            FAQ
          </Link>
        </nav>

        <div className="p-4 text-lg font-bold border-b border-gray-700">
          Événements
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <Link
            href="/adminDashboard/eventTypes"
            className="px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Types d'événements
          </Link>
          <Link
            href="/adminDashboard/upcomingEvents"
            className="px-4 py-2 hover:bg-gray-700 rounded-md"
          >
            Événements à venir
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
