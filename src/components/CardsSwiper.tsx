"use client";

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "../app/globals.css";

// const reviews = [
//   {
//     id: 0,
//     user: "Utilisatrice1",
//     text: "Vous allez réaliser le rêve de plein de gens, je crois en vous !",
//   },
//   {
//     id: 1,
//     user: "Utilisateur2",
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud aliquip ex ea commodo consequat.",
//   },
//   {
//     id: 2,
//     user: "Utilisatrice3",
//     text: "Merci beaucoup pour votre travail exceptionnel !",
//   },
//   {
//     id: 3,
//     user: "Utilisatrice4",
//     text: "Juste merci d'avoir eu cette idée folle. J'ai hâte de découvrir.",
//   },
//   {
//     id: 4,
//     user: "Utilisateur5",
//     text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   },
// ];

const bgColors = ["#FFC0C5", "#F6838D", "#FFCDAC", "#F79D8E"];

// import required modules
import { EffectCards } from "swiper/modules";
import axios from "axios";

export default function CardsSwiper() {
  const [reviews, setReviews] = useState<
    { _id: string; name: string; content: string }[]
  >([]);

  useEffect(() => {
    axios.get("/api/reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <>
      <svg style={{ display: "none" }}>
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="1"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
      </svg>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="cardsSwiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide
            key={review._id}
            style={{
              backgroundColor: `${bgColors[index % bgColors.length]}`,
            }}
          >
            <div className="w-full aspect-square flex flex-col justify-center p-2">
              <cite className="block font-bold">{review.name}</cite>
              <blockquote className="mt-4 italic whitespace-pre-line">
                {review.content}
              </blockquote>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
