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
  images: { _id: string; uuid: string; name: string }[];
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
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={50000}
        freeMode={true}
        loop={true}
        className={`${mobileOnly && "md:hidden"}`}
      >
        {images.map((image, index) => (
          <SwiperSlide className="!w-fit" key={image._id}>
            <Image
              aria-hidden
              src={`https://ucarecdn.com/${image.uuid}/`}
              alt="File icon"
              width={500}
              height={500}
              className="h-full w-auto object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default LandingSwiper;
