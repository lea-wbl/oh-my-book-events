"use client";

import GoogleMap from "@/components/GoogleMap";
import {
  CalendarLove02Icon,
  Clock05Icon,
  Location04Icon,
} from "hugeicons-react";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import PartnersSlider from "@/components/PartnersSlider";
import Countdown from "@/components/Countdown";
import axios from "axios";
import { Event } from "@/interfaces/interfaces";

const programation = [
  {
    title: "Speed meeting",
    text: "Aptent taciti elementum libero eleifend etiam. Lobortis consequat lacus hac, donec sit diam viverra quis.",
    img: "/chai-latte.png",
  },
  {
    title: "Découvrir le parcours d'autrices",
    text: " Imperdiet conubia sociosqu litora lobortis convallis quam ligula. Facilisi facilisi luctus mus id imperdiet primis, non fusce. ",
    img: "/chai-latte.png",
  },
  {
    title: "Une conso offerte",
    text: " Interdum non pulvinar massa habitasse, mauris eleifend magna aliquet erat. Etiam viverra vehicula nam molestie ornare! ",
    img: "/chai-latte.png",
  },
];

const Details = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const [event, setEvent] = useState<Event>({
    _id: "",
    images: [],
    name: "",
    type: "",
    typeId: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    location: "",
    address: "",
    ticketLink: "",
    tagline: "",
    description: "",
    programCards: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/events?id=${slug}`).then((res) => {
      console.log("SINGLE EVENT details", res.data);
      setEvent(res.data[0]);
      setIsLoading(false);
    });
  }, [slug]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {/* EVENT INFOS */}
      <section className="h-fit md:h-screen-minus-header bg-[#F6838D] md:px-12 md:py-6 px-6 py-8 relative  overflow-hidden grid content-evenly">
        <div className="flex flex-col justify-center gap-12 pt-4">
          {/* content */}
          <div className="flex gap-12">
            {/* polaroids */}
            <div className="hidden md:flex justify-center items-center mb-8 w-1/2">
              <div className="shadow-md w-1/2 border rounded-t -rotate-6 h-fit">
                <div className="border-[1.2rem] border-white w-full aspect-square relative rounded-t">
                  <Image
                    aria-hidden
                    src={`https://ucarecdn.com/${event.images[0].uuid}/`}
                    alt="File icon"
                    width={500}
                    height={500}
                    className="shadow w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white w-full h-12 -mt-1 rounded-b"> </div>
              </div>
              <div className="shadow-md w-1/2 border rounded-t rotate-12 -ml-10 h-fit">
                <div className="border-[1.2rem] border-white w-full aspect-square relative rounded-t">
                  <Image
                    aria-hidden
                    src={`https://ucarecdn.com/${event.images[1].uuid}/`}
                    alt="File icon"
                    width={500}
                    height={500}
                    className="shadow w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white w-full h-12 -mt-1 rounded-b"></div>
              </div>
            </div>
            {/* infos */}
            <div className="text-xl w-1/2 text-white">
              <div>
                <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
                  {event.name}
                </h1>
                <h2 className="text-4xl py-4">{event.type}</h2>
              </div>
              <div className="grid gap-4 text-2xl">
                <div className="flex gap-4 items-center">
                  <div className="w-[34px]">
                    <CalendarLove02Icon size={28} color="white" className="" />
                  </div>
                  <p>
                    {new Date(event.date)
                      .toLocaleDateString("fr-FR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                      .charAt(0)
                      .toUpperCase() +
                      new Date(event.date)
                        .toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                        .slice(1)}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-[34px]">
                    <Clock05Icon size={28} color="white" className="" />
                  </div>
                  <p>
                    De {event.timeStart} à {event.timeEnd}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <Location04Icon size={34} color="white" className="" />
                  <p>
                    <span className="font-bold">{event.location}</span>
                    <br />
                    <span>{event.address}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => window.open(event.ticketLink, "_blank")}
                className="flex-1 shadow-sm rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]"
              >
                Acheter mon billet
              </button>
            </div>
          </div>
        </div>
        <div className="py-2">
          <PartnersSlider />
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="px-6 py-8 md:px-12 md:py-6 flex flex-col gap-8 h-screen-minus-header justify-center">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
          {event.tagline}
        </h1>
        <p>{event.description}</p>
        {/* <div className="flex flex-col gap-3 text-justify text-lg">
          <p>
            Les rumeurs sont vraies… et on ne pouvait pas rêver mieux pour notre
            tout premier événement Oh My Book : samedi 1er mars au Titi Palacio
            (oui, l’endroit parfait pour des rencontres magiques).{" "}
          </p>{" "}
          <p>
            ✨ Au programme : Speed meeting & découvertes littéraires : un
            moment d’échange en petits groupes, sans pression, pour rencontrer
            de nouvelles personnes, mais aussi pour plonger dans l’univers de
            l’autoédition, découvrir des parcours d’autrices inspirants et des
            livres qu’on ne voit pas assez sur nos étagères !{" "}
          </p>
          <p>
            Deux autrices incroyables : - Emy et son envoûtant roman Stellifer -
            Mathilde avec ses recueils de poèmes empreints de douceur Elles
            partageront leurs parcours et leurs romans (des coups de cœur…) et
            crois-moi, tu vas repartir avec une liste de lectures beaucoup trop
            longue...{" "}
          </p>
          <p>
            Un petit plaisir offert pour trinquer ensemble et des surprises
            (parce que c’est Oh My Book quand même !){" "}
          </p>
          <p>
            Ce premier événement Plume & Rencontre, c’est l’occasion parfaite de
            découvrir une toute nouvelle manière de vivre la littérature… et
            promis, cette journée va marquer le début d’une belle aventure !
          </p>
        </div> */}
      </section>

      {/* AU PROGRAMME */}
      <section className="h-fit md:h-screen-minus-header bg-amber-200 md:px-12 md:py-6 px-6 py-8 relative  overflow-hidden">
        <div className="flex flex-col justify-center h-full gap-12 md:-mt-6">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
            Au programme
          </h1>
          {/* content */}
          <div className="flex gap-8">
            {event.programCards.map((card) => (
              <div
                className="notes shadow-lg md:w-1/3 p-8 pt-12 h-full md:h-auto z-10 grid justify-items-center"
                key={card.title}
              >
                <div className="mb-4 h-40">
                  <Image
                    aria-hidden
                    src={`https://ucarecdn.com/${card.image.uuid}/`}
                    alt="drink"
                    width={500}
                    height={500}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-medium font-headline pb-4">
                  {card.title}
                </h3>
                <p className="text-center">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFOS PRATIQUES */}
      <section className="px-6 py-8 md:px-12 md:py-6 flex flex-col gap-8 h-screen-minus-header justify-center">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
          Infos pratiques
        </h1>
        {/* content */}
        <div className="flex gap-8 h-1/2">
          {/* infos */}
          <div className="w-1/2 grid gap-4 content-center justify-center text-2xl">
            <div className="flex gap-4 items-center">
              <div className="w-[34px]">
                <CalendarLove02Icon size={28} color="black" className="" />
              </div>
              <p>
                {new Date(event.date)
                  .toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                  .charAt(0)
                  .toUpperCase() +
                  new Date(event.date)
                    .toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    .slice(1)}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-[34px]">
                <Clock05Icon size={28} color="black" className="" />
              </div>
              <p>
                De {event.timeStart} à {event.timeEnd}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <Location04Icon size={34} color="black" className="" />
              <p>
                <span className="font-bold">{event.location}</span>
                <br />
                <span>{event.address}</span>
              </p>
            </div>
          </div>
          {/* google map */}
          <div className="w-1/2">
            <GoogleMap
              address={`${event.location}, ${event.address}, France`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
