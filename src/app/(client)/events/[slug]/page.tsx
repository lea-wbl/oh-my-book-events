"use client";

import PartnersSlider from "@/components/PartnersSlider";
import { Clock05Icon, Location04Icon } from "hugeicons-react";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Event } from "@/interfaces/interfaces";
import EventCardSwiper from "@/components/EventCardSwiper";

const EventTypeDetail = ({ params }: { params: Promise<{ slug: string }> }) => {
  const router = useRouter();
  const { slug } = use(params);
  const [eventType, setEventType] = useState({
    _id: "",
    name: "",
    summary: "",
    leading: "",
    description: "",
  });
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
      <section className="grid px-6 py-8 md:p-12 h-fit md:h-screen-minus-header w-full bg-OMBpink custom-bg3 text-white ">
        <div className="flex gap-12 items-center max-w-screen-2xl mx-auto relative">
          {/* POLAROIDS */}
          <div className="w-1/2 mx-auto relative h-full -ml-12 hidden md:block">
            {/* pol 1 */}
            <div className="w-fit h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white absolute bottom-0 left-1/2 transform rotate-12 z-20 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-bottom-right ease-in">
              <div className="bg-gray-300 w-52 aspect-square">
                <Image
                  aria-hidden
                  src="/presentation.jpg"
                  alt="File icon"
                  fill
                  className="shadow object-cover"
                />
              </div>
            </div>
            {/* pol 2 */}
            <div className="w-fit h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white absolute bottom-0 right-1/2 transform -rotate-6 z-0 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-bottom-left ease-in">
              <div className="bg-gray-300 w-52 aspect-square overflow-hidden grid align-center">
                <Image
                  aria-hidden
                  src="/books.jpg"
                  alt="File icon"
                  fill
                  className="shadow object-cover"
                />
              </div>
            </div>
            {/* pol 3 */}
            <div className="w-fit h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white absolute top-0 left-1/2 transform -translate-x-1/2 rotate-3 z-10 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-top ease-in">
              <div className="bg-gray-300 w-52 aspect-square overflow-hidden grid align-center">
                <Image
                  aria-hidden
                  src="/library.jpg"
                  alt="File icon"
                  fill
                  className="shadow object-cover"
                />
              </div>
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div className="grid flex-1 h-fit gap-16">
            <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
              {eventType.name}
            </h1>
            <div className="flex flex-col gap-8">
              <span className="font-bold text-lg">{eventType.leading}</span>
              <p className="leading-7 font-semibold">{eventType.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-200 custom-bg1 h-fit md:h-screen-minus-header pt-10 px-6 py-8 md:p-12 gap-4 overflow-x-hidden relative">
        <div className="flex flex-col justify-center h-full gap-12 md:-mt-6 max-w-screen-2xl mx-auto">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight2 relative z-0 w-fit">
            Nos {eventType.name.toLowerCase()} à venir
          </h1>
          {/* EVENT INFOS CARD */}
          <div>
            <EventCardSwiper events={typeEvents} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventTypeDetail;
