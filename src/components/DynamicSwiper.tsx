import React, { FC, ReactNode } from "react";
import {
  Swiper,
  SwiperSlide,
  SwiperProps as BaseSwiperProps,
} from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type DynamicSwiperProps = BaseSwiperProps & {
  slides: ReactNode[];
};

const DynamicSwiper: FC<DynamicSwiperProps> = ({ slides, ...swiperProps }) => {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      {...swiperProps}
      className="dynamicSwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DynamicSwiper;
