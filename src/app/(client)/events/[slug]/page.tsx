"use client";

import PartnersSlider from "@/components/PartnersSlider";
import { Clock05Icon, Location04Icon } from "hugeicons-react";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Event } from "@/interfaces/event.interface";

const eventTypes = [
  { id: "1", title: "Événements immersifs" },
  { id: "2", title: "Ateliers créatifs" },
  { id: "3", title: "Rencontres littéraires" },
];

const EventTypeDetail = ({ params }: { params: Promise<{ slug: string }> }) => {
  const router = useRouter();
  const { slug } = use(params);
  const [eventType, setEventType] = useState({ _id: "", name: "", desc: "" });
  const [typeEvents, setTypeEvents] = useState<Event[]>([]);

  const getEventType = () => {
    axios.get(`/api/eventTypes?id=${slug}`).then((res) => {
      setEventType(res.data);
    });

    axios.get(`/api/events?byType=${slug}`).then((res) => {
      setTypeEvents(res.data);
    });
  };

  useEffect(() => {
    getEventType();
  }, []);

  return (
    <div>
      <section className="px-6 py-8 md:px-12 md:py-6 grid gap-8 h-screen-minus-header content-center">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
          {eventType.name}
        </h1>
        {/* POLAROIDS */}
        <div className="hidden md:flex justify-center items-center">
          <div className="shadow-md w-[10%] border rounded-t -rotate-6 h-fit">
            <div className="border-[1.2rem] border-white w-full aspect-square relative rounded-t">
              <Image
                aria-hidden
                src="/brunch.jpg"
                alt="File icon"
                objectFit="cover"
                fill
                className="shadow"
              />
            </div>
            <div className="bg-white w-full h-12 -mt-1 rounded-b"> </div>
          </div>
          <div className="shadow-md w-[10%] border rounded-t rotate-12 -ml-10 h-fit">
            <div className="border-[1.2rem] border-white w-full aspect-square relative rounded-t">
              <Image
                aria-hidden
                src="/books.jpg"
                alt="File icon"
                objectFit="cover"
                fill
                className="shadow"
              />
            </div>
            <div className="bg-white w-full h-12 -mt-1 rounded-b"></div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:px-12 md:py-6 grid gap-8 h-screen-minus-header content-center bg-[#F6838D]">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
          Nos {eventType.name.toLowerCase()} à venir
        </h1>
        {/* EVENT INFOS CARD */}
        {typeEvents.map((event) => (
          <div className="bg-white rounded-xl w-full md:w-1/2 p-6 md:p-8 shadow-md relative flex gap-8">
            <div className="w-2/3">
              <Image
                aria-hidden
                src={`https://ucarecdn.com/${event.images[0].uuid}/`}
                alt="File icon"
                width={500}
                height={500}
                className="h-full object-cover rounded-lg"
              />
            </div>

            <div className="w-3/5">
              {/* header */}
              <div className="flex justify-between items-center border-b-2 pb-2">
                <div>
                  <h3 className="font-headline text-2xl">{event.name}</h3>
                  <h4 className="text-gray-500">{event.type}</h4>
                </div>
                <div className="grid justify-items-center content-center py-1 px-3 bg-red-200 rounded-md shadow-sm -mt-2">
                  <span className="font-bold text-3xl leading-7">
                    {new Date(event.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                    })}
                  </span>
                  <span>
                    {new Date(event.date)
                      .toLocaleDateString("fr-FR", {
                        month: "short",
                      })
                      .toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="py-4 gap-4 grid">
                <div className="flex gap-4 items-center">
                  <Location04Icon size={34} color="black" className="" />
                  <p>
                    <span className="font-bold">{event.location}</span>
                    <br />
                    <span>{event.address}</span>
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
              </div>
              <p className="hidden">{event.description}</p>
              {/* <div className="py-2"> */}
              <PartnersSlider />
              {/* </div> */}
              <div className="flex justify-between gap-4 pt-4">
                <button
                  onClick={() => window.open(event.ticketLink, "_blank")}
                  className="flex-1 shadow-sm rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]"
                >
                  Billeterie
                  {/* Acheter mon billet */}
                </button>
                <button
                  onClick={() => router.push(`/events/details/${event._id}`)}
                  className="flex-1 shadow-sm rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]"
                >
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EventTypeDetail;
