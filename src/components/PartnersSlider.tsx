import React from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";

const PartnersSlider = () => {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop
        slidesPerView={"auto"}
        spaceBetween={10}
        className="partnersSlider"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((partner) => {
          return (
            <SwiperSlide key={partner}>
              <div className="relative w-28 h-[50px]">
                <Image
                  src={`/partenaire${partner}.png`}
                  alt="Partenaire 1" // dynamic when back office okay
                  fill
                  objectFit="contain"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default PartnersSlider;
