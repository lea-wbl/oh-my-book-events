import React, { FC, JSX, ReactNode } from "react";
import {
  Swiper,
  SwiperSlide,
  SwiperProps as BaseSwiperProps,
} from "swiper/react";
import { Autoplay, EffectCards, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type CustomSwiperProps = BaseSwiperProps & {
  classes?: string;
  items: any[]; // The array to map
  renderItem: (item: any, index: number) => JSX.Element; // Function to render each slide
  mobileOnly?: boolean;
};

const CustomSwiper: FC<CustomSwiperProps> = ({
  classes,
  items,
  renderItem,
  mobileOnly,
  ...swiperProps
}) => {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination, EffectCards, Autoplay]}
      {...swiperProps}
      className={`customSwiper ${classes}`}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>{renderItem(item, index)}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
