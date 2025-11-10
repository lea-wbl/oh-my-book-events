"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import { Event } from "@/interfaces/interfaces";
import EventCardSwiper from "@/components/EventCardSwiper";
import { isFirstLetterVowel } from "@/app/utils/tools";
import Polaroids from "@/components/Polaroids";
import { Toaster, toast } from "react-hot-toast";
import Loader from "@/components/Loader";

const EventTypeDetail = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const [eventType, setEventType] = useState({
    _id: "",
    name: "",
    summary: "",
    leading: "",
    description: "",
    images: [],
  });
  const [typeEvents, setTypeEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEventType = () => {
    axios.get(`/api/eventTypes?id=${slug}`).then((res) => {
      setEventType(res.data);
    });

    axios
      .get(`/api/events?byType=${slug}`)
      .then((res) => {
        setTypeEvents(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des événements", error);
        toast.error("Erreur lors du chargement des événements");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getEventType();
  }, []);

  if (isLoading) return <Loader admin={false} />;

  return (
    <div className="snap-y snap-mandatory md:h-screen-minus-header overflow-scroll">
      <Toaster />
      <section className="grid px-6 py-8 md:p-12 h-fit md:h-screen-minus-header w-full bg-OMBpink custom-bg3 text-white snap-start">
        <div className="flex gap-12 items-center max-w-screen-2xl mx-auto relative">
          {/* POLAROIDS */}
          <div className="w-1/2 hidden md:block">
            <Polaroids
              images={eventType.images.map((img: any) => img.uuid)}
              fromUCare
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="grid flex-1 h-fit gap-16">
            <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white relative z-0 w-fit">
              <span className="realistic-marker-highlight">
                {eventType.name}
              </span>
            </h1>
            <div className="flex flex-col gap-8">
              <span className="font-bold text-lg">{eventType.leading}</span>
              <p className="leading-7 font-semibold">{eventType.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-200 custom-bg1 h-fit md:h-screen-minus-header pt-10 px-6 py-8 md:p-12 gap-4 overflow-x-hidden relative snap-start">
        <div className="flex flex-col justify-center h-full gap-12 md:-mt-6 max-w-screen-2xl mx-auto">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white relative z-0 w-fit">
            <span className="realistic-marker-highlight2">
              Nos {eventType.name.toLowerCase()} à venir
            </span>
          </h1>
          {/* EVENT INFOS CARD */}
          {typeEvents.length > 0 ? (
            <div>
              <EventCardSwiper events={typeEvents} />
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center justify-center h-1/2 font-semibold">
              <p className="text-center">
                Il n&apos;y a pas{" "}
                {isFirstLetterVowel(eventType.name.toLowerCase())
                  ? "d'"
                  : "de "}
                {eventType.name.toLowerCase()} prévus pour le moment…
              </p>
              <p className="text-center">
                Mais reviens vite, de nouvelles dates arrivent bientôt !
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventTypeDetail;
