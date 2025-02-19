"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const eventTypes = [
  {
    id: "1",
    title: "Événements immersifs",
    text: "Eu molestie nascetur conubia fermentum luctus sed cubilia euismod curae. Tempus finibus vestibulum arcu torquent habitasse lacus. Orci justo turpis justo; feugiat consequat eleifend.",
  },
  {
    id: "2",
    title: "Ateliers créatifs",
    text: "Libero ullamcorper augue tincidunt dis parturient. Erat sollicitudin dis lacinia felis amet velit commodo.",
  },
  {
    id: "3",
    title: "Rencontres littéraires",
    text: "Elementum etiam nec nulla tristique cras quis diam hendrerit. Interdum ridiculus vivamus ipsum ante himenaeos curabitur sollicitudin semper lobortis. Feugiat diam quisque quis porta scelerisque.",
  },
];

const Events = () => {
  const router = useRouter();
  const [eventTypes, setEventTypes] = React.useState<
    { _id: string; name: string; desc: string }[]
  >([]);

  const discover = (id: string) => {
    router.push(`/events/${id}`);
  };

  useEffect(() => {
    axios.get("/api/eventTypes").then((res) => setEventTypes(res.data));
  }, []);

  return (
    <section className="px-6 py-8 md:px-12 md:py-6 grid gap-8 h-screen-minus-header content-center">
      <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
        Nos événements
      </h1>
      <p className="text-center">
        Vel porta malesuada, inceptos ex tempus egestas lacus. Molestie purus
        taciti augue ad pulvinar proin faucibus. Et praesent est lacus eros
        tincidunt egestas sit faucibus non. Purus erat a justo orci molestie
        pharetra lobortis. Quisque ad risus conubia lacus finibus condimentum
        tortor purus. Potenti convallis odio a volutpat vivamus ullamcorper
        faucibus amet. Augue massa neque mollis massa egestas placerat duis.
        Tempor interdum cubilia tempus donec volutpat condimentum. Porta quam
        suscipit fermentum nam ultricies. Finibus elementum eget auctor sed
        fermentum?
      </p>
      {/* CARDS CONTAINER */}
      <div className="flex gap-4">
        {eventTypes.map((type) => (
          <div
            className="flex flex-col flex-1 bg-red-100 rounded-lg justify-between p-8"
            key={type._id}
          >
            <div>
              <h2 className="text-xl font-medium font-headline pb-4">
                {type.name}
              </h2>
              <p>{type.desc}</p>
            </div>
            <button
              onClick={() => discover(type._id)}
              className="rounded-full bg-[#F7A976] text-white px-4 py-1 self-end"
            >
              Découvrir
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
