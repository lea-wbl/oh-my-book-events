import React, { FC, ReactNode } from "react";
import {
  Swiper,
  SwiperSlide,
  SwiperProps as BaseSwiperProps,
} from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type EventCardSwiperProps = BaseSwiperProps & {
  slides: ReactNode[];
};

const EventCardSwiper: FC<EventCardSwiperProps> = ({
  slides,
  ...swiperProps
}) => {
  const boop = [...slides, ...slides, ...slides];
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={32}
      pagination={true}
      modules={[Pagination]}
      {...swiperProps}
      className="eventCardSwiper w-full"
    >
      {boop.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default EventCardSwiper;
