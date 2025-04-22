import React from "react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";

const PartnersSlider = ({
  partners,
}: {
  partners: { _id: string; uuid: string; name: string }[];
}) => {
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
        {partners.map((partner) => {
          return (
            <SwiperSlide key={partner.uuid}>
              <div className="relative w-28 h-[50px]">
                <Image
                  src={`https://ucarecdn.com/${partner.uuid}/`}
                  alt="Partenaire de l'événement"
                  fill
                  className="object-contain"
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
