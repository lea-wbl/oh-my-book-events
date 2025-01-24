import React, { FC, ReactNode } from "react";
import {
  Swiper,
  SwiperSlide,
  SwiperProps as BaseSwiperProps,
} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

type LandingSwiperProps = BaseSwiperProps & {
  images: string[];
  mobileOnly: boolean;
};

const LandingSwiper: FC<LandingSwiperProps> = ({
  images,
  mobileOnly,
  ...swiperProps
}) => {
  return (
    // éviter de mettre 2 formats portrait à la suite - mauvais affichage
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        {...swiperProps}
        pagination={false}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        centeredSlides
        className={`${mobileOnly && "block md:hidden"} landingSwiper`}
      >
        {images.map((image, index) => (
          <SwiperSlide className="w-fit" key={image}>
            <Image
              aria-hidden
              src={`/${image}.jpg`}
              alt="File icon"
              width={500}
              height={500}
              // objectFit="cover"
              className="h-full w-auto"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default LandingSwiper;
