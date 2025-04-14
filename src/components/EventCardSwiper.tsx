import React, { FC, ReactNode, useEffect, useState } from "react";
import {
  Swiper,
  SwiperSlide,
  SwiperProps as BaseSwiperProps,
} from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import EventCard from "./EventCard";
import { Event } from "@/interfaces/interfaces";

type EventCardSwiperProps = BaseSwiperProps & {
  events: Event[];
};

const EventCardSwiper: FC<EventCardSwiperProps> = ({
  events,
  ...swiperProps
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Run on first mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Swiper
      slidesPerView={isMobile ? 1 : 2}
      spaceBetween={32}
      pagination={true}
      modules={[Pagination]}
      {...swiperProps}
      className="eventCardSwiper w-full"
    >
      {events.map((event, index) => (
        <SwiperSlide key={index}>
          <EventCard event={event} isMobile={isMobile} hasCountdown={false} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EventCardSwiper;
