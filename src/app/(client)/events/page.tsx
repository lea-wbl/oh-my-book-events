"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Events = () => {
  const router = useRouter();
  const [eventTypes, setEventTypes] = React.useState<
    { _id: string; name: string; summary: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const discover = (id: string) => {
    router.push(`/events/${id}`);
  };

  useEffect(() => {
    axios
      .get("/api/eventTypes")
      .then((res) => setEventTypes(res.data))
      .catch((error) => {
        console.error("Erreur lors du chargement des types d'événement", error);
        toast.error("Erreur lors du chargement des types d'événement");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader admin={false} />;

  return (
    <section className="grid px-6 py-8 md:p-12 h-fit md:h-screen-minus-header bg-OMBpink custom-bg3">
      <Toaster />
      <div className="grid content-center gap-8 max-w-screen-2xl mx-auto justify-items-center">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white relative z-0 w-fit">
          <span className="realistic-marker-highlight">Nos événements</span>
        </h1>
        <p className="text-center text-white font-semibold leading-7">
          Oh My Book, ce ne sont pas juste des événements, mais des moments qui
          rassemblent. Avec nous, chaque expériences est une histoire à vivre,
          un moment à partager et une aventure qui laisse une empreinte. Que ce
          soit autour d’un livre, dans un décor immersif ou à travers la
          création, nos événements sont pensés pour faire vibrer, surprendre et
          créer du lien. Viens pour un instant, repars avec une émotion, une
          belle rencontre… et peut-être même ta prochaine obsession littéraire.
        </p>
        <span className="text-center text-white text-xl font-bold -mt-2">
          Parce que la magie ne se trouve pas que dans les livres.
        </span>
        {/* CARDS CONTAINER */}
        <div className="flex flex-col md:flex-row gap-8">
          {eventTypes.map((type) => (
            <div
              className="flex flex-col flex-1 bg-white rounded-xl justify-between p-8 shadow-lg"
              key={type._id}
            >
              <div>
                <h2 className="text-xl font-medium font-headline pb-4">
                  {type.name}
                </h2>
                <p>{type.summary}</p>
              </div>
              <button
                onClick={() => discover(type._id)}
                className="rounded-full bg-[#F7A976] border-2 border-[#F7A976] text-white px-4 py-1 self-end hover:bg-white hover:text-[#f7a976]"
              >
                Découvrir
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
