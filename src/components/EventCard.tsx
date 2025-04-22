import React, { FC } from "react";
import Image from "next/image";
import { Clock05Icon, Location04Icon } from "hugeicons-react";
import PartnersSlider from "@/components/PartnersSlider";
import { Event } from "@/interfaces/interfaces";
import Countdown from "./Countdown";

interface EventCardProps {
  event: Event;
  isMobile: boolean;
  hasCountdown: boolean;
}

const EventCard: FC<EventCardProps> = ({ event, isMobile, hasCountdown }) => {
  return (
    <div
      className={`${
        isMobile ? "flex-col gap-4" : "gap-8"
      } bg-white rounded-xl p-6 md:p-8 shadow-lg relative flex w-full`}
    >
      {(isMobile || (!isMobile && !hasCountdown)) && (
        <div
          className={`${
            !isMobile && !hasCountdown ? "w-1/3 aspect-[4/5]" : "w-full"
          } relative`}
        >
          <Image
            aria-hidden
            src={`https://ucarecdn.com/${event.images[0].uuid}/`}
            alt="File icon"
            width={500}
            height={500}
            className={`${
              isMobile ? "h-72" : "h-full"
            } object-cover rounded-lg`}
          />
        </div>
      )}

      <div
        className={`${
          !isMobile && !hasCountdown ? "w-3/5" : "w-full relative"
        }`}
      >
        {/* header */}
        <div className="flex justify-between items-center border-b-2 pb-2">
          <div>
            <h3 className="font-headline text-2xl">{event.name}</h3>
            <h4 className="text-gray-500">{event.type}</h4>
          </div>
          <div className="grid justify-items-center content-center py-1 px-3 bg-red-200 rounded-md shadow-sm -mt-2 w-1/5 md:max-w-16 md:min-w-fit">
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

          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <div className="w-[34px]">
                <Clock05Icon size={28} color="black" className="" />
              </div>
              <p>
                De {event.timeStart} à {event.timeEnd}
              </p>
            </div>
            <button
              onClick={() => window.open(event.ticketLink, "_blank")}
              className="shadow-sm rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]"
            >
              Voir plus
            </button>
          </div>
        </div>

        {hasCountdown && (
          <div className="m-auto mb-4">
            <Countdown
              targetDate={`${event.date.toString().slice(0, 10)}T${
                event.timeStart
              }:00.000`}
            />
          </div>
        )}

        <PartnersSlider partners={event.partners} />
      </div>
    </div>
  );
};

export default EventCard;
