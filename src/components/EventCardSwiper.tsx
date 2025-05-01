import React, { FC } from "react";
import {
  Swiper,
  SwiperSlide,
  SwiperProps as BaseSwiperProps,
} from "swiper/react";
import { Pagination, Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import EventCard from "./EventCard";
import { Event } from "@/interfaces/interfaces";
import { useWindowWidth } from "@/hooks/useWindowWidth";

type EventCardSwiperProps = BaseSwiperProps & {
  events: Event[];
};

const EventCardSwiper: FC<EventCardSwiperProps> = ({
  events,
  ...swiperProps
}) => {
    const width = useWindowWidth();

  return (
    <Swiper
      slidesPerView={width < 768 ? 1 : 2}
      spaceBetween={32}
      pagination={{
        clickable: true,
      }}
      keyboard={{
        enabled: true,
      }}
      grabCursor={true}
      navigation={width < 768 ? false : true}
      modules={[Pagination, Navigation, Keyboard]}
      {...swiperProps}
      className="eventCardSwiper w-full"
    >
      {events.map((event, index) => (
        <SwiperSlide key={index}>
          <EventCard event={event} isMobile={width < 768} hasCountdown={false} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EventCardSwiper;
