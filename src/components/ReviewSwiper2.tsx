"use client";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import axios from "axios";
import Image from "next/image";

const quotes = [
  "/quote-pink.png",
  "/quote-yellow.png",
  "/quote-pastel.png",
  "/quote-orange.png",
];

const ReviewSwiper2 = () => {
  const [reviews, setReviews] = useState<
    { _id: string; name: string; content: string }[]
  >([]);

  const randomRotation = (index: number) => {
    return `${Math.floor(Math.random() * 7) * (index % 2 === 0 ? -1 : 1)}deg`;
  };

  useEffect(() => {
    axios.get("/api/reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        loop={true}
        grabCursor={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="reviewSwiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={review._id} className="p-4">
            <div
              className="grid items-center sticky-note p-8 aspect-square overflow-scroll relative shadow-lg overflow-y-scroll"
              style={{
                transform: `rotate(${randomRotation(index)})`,
              }}
            >
              <Image
                aria-hidden
                src={`${quotes[index % quotes.length]}`}
                alt="quotation marks"
                width={500}
                height={500}
                className="h-auto w-1/3 absolute top-8 left-8"
                priority
              />
              <div className="flex flex-col gap-4 z-10">
                <blockquote className="mt-2 italic whitespace-pre-line">
                  {review.content}
                </blockquote>
                <cite className="block not-italic font-bold h-fit text-right">
                  {review.name}
                </cite>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ReviewSwiper2;
