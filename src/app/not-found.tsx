import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="landscape h-[100dvh] md:h-screen p-12 !bg-[bottom_left_80%] md:bg-bottom">
      <div className="flex flex-col items-center md:items-start h-full max-w-screen-2xl mx-auto gap-8">
        <div className="text-8xl text-white md:self-start md:ml-8 2xl:-ml-8">
          404
        </div>
        <div className="md:ml-[25%] flex flex-col items-center md:items-start gap-4 w-fit">
          <div className="text-2xl text-white font-semibold text-center md:text-start text-balance">
            Eh bien, on s&apos;est un peu trompé de route, non ?
          </div>
          <p className="text-2xl text-white font-semibold text-center md:text-start text-balance">
            Pas de panique, les vraies aventures sont par ici:
          </p>
          <div className="flex flex-col md:flex-row gap-4 self-center">
            <Link
              href="/"
              className="border-2 border-[#FD9155] hover:border-white text-white font-semibold px-4 py-2 rounded-full shadow bg-[#FD9155] hover:bg-transparent"
            >
              Aller à la page d&apos;accueil
            </Link>
            <Link
              href="/events"
              className="border-2 border-[#FD9155] hover:border-white text-white font-semibold px-4 py-2 rounded-full shadow bg-[#FD9155] hover:bg-transparent"
            >
              Découvrir nos événements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
