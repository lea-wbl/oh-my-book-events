"use client";

import CardsSwiper from "@/components/CardsSwiper";
import Countdown from "@/components/Countdown";
import DynamicSwiper from "@/components/DynamicSwiper";
import FlipCountdown from "@/components/FlipCountdown";
import LandingSwiper from "@/components/LandingSwiper";
import PartnersSlider from "@/components/PartnersSlider";
import ReviewSwiper from "@/components/ReviewSwiper";
import Image from "next/image";
import {
  LocationFavourite01Icon,
  Location04Icon,
  Clock05Icon,
} from "hugeicons-react";

const objectifs = [
  {
    title: "Rencontrer de nouvelles personnes",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    title: "Découvrir de nouvelles lectures",
    text: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  },
  {
    title: "Participer à des ateliers créatifs",
    text: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
];

const goalsSlides = objectifs.map((obj) => (
  <div className="notes shadow-lg md:w-1/3 p-8 pt-12 h-full" key={obj.title}>
    <h3 className="text-lg font-medium font-headline pb-4">{obj.title}</h3>
    <p>{obj.text}</p>
  </div>
));

export default function Home() {
  return (
    <div>
      {/* LANDING V2 */}
      <section className="flex flex-col h-screen-minus-header-mobile md:h-screen-minus-header bg-[#F6838D] md:py-6 py-0 gap-4 relative">
        <LandingSwiper
          images={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]}
          mobileOnly={false}
        />
        <LandingSwiper
          images={["f", "g", "h", "i", "j", "a", "b", "c", "d", "e"]}
          mobileOnly={false}
        />
        <LandingSwiper
          images={["d", "h", "b", "e", "c", "i", "a", "j", "g", "f"]}
          mobileOnly={true}
        />
        <LandingSwiper
          images={["i", "a", "j", "g", "f", "d", "h", "b", "e", "c"]}
          mobileOnly={true}
        />
        <div className="absolute top-0 left-0 z-10 flex flex-col justify-center items-center w-full h-full">
          <div className="flex flex-col justify-center items-center h-1/2 md:h-3/4 relative">
            <Image
              aria-hidden
              src="/logo-borders.png"
              alt="File icon"
              width={500}
              height={500}
              className="h-auto w-4/5 ml-8"
            />
            <p className="relative z-10 text-2xl md:text-[2.5rem] text-center font-bold leading-[3.2rem] -mt-6 mb-4 highlighter px-6 text-white">
              transforme tes lectures{" "}
            </p>{" "}
            <p className="relative z-10 text-2xl md:text-[2.5rem] text-center font-bold leading-[3.2rem] -mt-6 highlighter px-6 text-white">
              en{" "}
              <span className="text-5xl md:text-7xl font-handwritten leading-[3.5rem] align-bottom mx-2">
                souvenirs
              </span>{" "}
              uniques
            </p>
          </div>
        </div>
      </section>

      {/* GOALS */}
      <section className="h-fit md:h-screen-minus-header bg-amber-200 px-12 py-6">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit mb-8">
          Pourquoi nous rejoindre ?
        </h1>
        <div className="hidden md:flex md:gap-4">{goalsSlides}</div>
        <div className="md:hidden">
          <DynamicSwiper slides={goalsSlides} />
        </div>
      </section>

      {/* UPCOMING EVENT */}
      <section className="flex flex-col gap-4 h-fit md:h-screen-minus-header bg-red-200 md:px-12 md:py-6 px-6 py-8">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
          Prochain événement
        </h1>

        <div className="flex-1 flex flex-col md:flex-row">
          {/* POLAROIDS */}
          <div className="hidden md:flex w-full md:w-1/2 justify-center items-center">
            <div className="shadow-md w-1/2 border rounded-t -rotate-6 h-fit">
              <div className="border-[1.2rem] border-white w-full aspect-square relative rounded-t">
                <Image
                  aria-hidden
                  src="/brunch.jpg"
                  alt="File icon"
                  objectFit="cover"
                  fill
                  className="shadow"
                />
              </div>
              <div className="bg-white w-full h-12 -mt-1 rounded-b"> </div>
            </div>
            <div className="shadow-md w-1/2 border rounded-t rotate-12 -ml-10 h-fit">
              <div className="border-[1.2rem] border-white w-full aspect-square relative rounded-t">
                <Image
                  aria-hidden
                  src="/books.jpg"
                  alt="File icon"
                  objectFit="cover"
                  fill
                  className="shadow"
                />
              </div>
              <div className="bg-white w-full h-12 -mt-1 rounded-b"></div>
            </div>
          </div>

          {/* EVENT INFOS */}
          <div className="bg-white rounded-xl w-full md:w-1/2 p-6 md:p-8 shadow-md">
            {/* header */}
            <div className="flex justify-between items-center border-b-2 pb-2">
              <div>
                <h3 className="font-headline text-2xl">Un Nom d'Event</h3>
                <h4 className="text-gray-500">Brunch littéraire</h4>
              </div>
              <div className="grid justify-items-center content-center py-1 px-3 bg-red-200 rounded-md shadow-sm -mt-2">
                <span className="font-bold text-3xl leading-7">12</span>
                <span>FÉV.</span>
              </div>
            </div>
            <div className="py-4 gap-4 grid">
              <div className="flex gap-4 items-center">
                <Location04Icon size={34} color="black" className="" />
                <p>
                  <span className="font-bold">La Fabuleuse Cantine</span>
                  <br />
                  <span>107 rue de Marseille, 69007 Lyon</span>
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-[34px]">
                  <Clock05Icon size={28} color="black" className="" />
                </div>
                <p>De 10h à 18h</p>
              </div>
            </div>
            <p className="hidden md:block">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Et amet
              convallis adipiscing hac posuere turpis. Malesuada tincidunt
              vulputate eget elit sed fringilla habitasse felis? Malesuada
              malesuada varius inceptos; volutpat eros quis. Est vulputate
              porttitor blandit accumsan nascetur nisl odio. Efficitur
              consectetur erat ornare velit tristique suspendisse. Porta
              inceptos quis dolor maximus habitasse semper tortor netus nibh.
            </p>
            <PartnersSlider />
            <div className="flex justify-between gap-4 py-4">
              <button className="flex-1 shadow-sm rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]">
                Acheter mon billet
              </button>
              <button className="flex-1 shadow-sm rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]">
                En savoir plus
              </button>
            </div>
            <Countdown targetDate="2025-01-31T00:00:00" />
          </div>
        </div>
      </section>

      {/* CUSTOMERS REVIEWS */}
      <section className="flex flex-col bg-white h-fit md:h-screen-minus-header py-6 gap-4 overflow-x-hidden">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit ml-12">
          Vos avis
        </h1>
        <div className="hidden md:block">
          <ReviewSwiper />
        </div>
        <div className="md:hidden">
          <CardsSwiper />
        </div>
      </section>
    </div>
  );
}
