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
  Location04Icon,
  Clock05Icon,
  Agreement01Icon,
  BookBookmark01Icon,
  PaintBoardIcon,
} from "hugeicons-react";

const objectifs = [
  {
    icon: <Agreement01Icon size={34} color="black" className="" />,
    title: "Rencontrer de nouvelles personnes",
    text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
  },
  {
    icon: <BookBookmark01Icon size={34} color="black" className="" />,
    title: "Découvrir de nouvelles lectures",
    text: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  },
  {
    icon: <PaintBoardIcon size={34} color="black" className="" />,
    title: "Participer à des ateliers créatifs",
    text: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
  },
];

const goalsSlides = objectifs.map((obj) => (
  <div
    className="notes shadow-lg md:w-1/3 p-8 pt-12 h-full md:h-auto z-10"
    key={obj.title}
  >
    <h3 className="text-xl font-medium font-headline pb-4">{obj.title}</h3>
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
          dir="ltr"
          mobileOnly={false}
        />
        <LandingSwiper
          images={["f", "g", "h", "i", "j", "a", "b", "c", "d", "e"]}
          dir="rtl"
          mobileOnly={false}
        />
        <LandingSwiper
          images={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].reverse()}
          dir="ltr"
          mobileOnly={true}
        />
        <LandingSwiper
          images={["f", "g", "h", "i", "j", "a", "b", "c", "d", "e"].reverse()}
          dir="rtl"
          mobileOnly={true}
        />
        <div className="absolute top-0 left-0 z-10 flex flex-col justify-center items-center w-full h-full">
          <div className="flex flex-col justify-center items-center h-1/2 md:h-3/4 relative -mt-16 md:-mt-0">
            <Image
              aria-hidden
              src="/logo-borders.png"
              alt="File icon"
              width={500}
              height={500}
              className="h-auto w-4/5 ml-8"
            />
            <p className="relative z-10 text-3xl md:text-[2.5rem] text-center font-bold leading-[3.2rem] -mt-6 mb-4 highlighter px-6 text-white">
              transforme tes lectures{" "}
            </p>{" "}
            <p className="relative z-10 text-3xl md:text-[2.5rem] text-center font-bold leading-[3.2rem] -mt-6 highlighter px-6 text-white">
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
      <section className="h-fit md:h-screen-minus-header bg-amber-200 md:px-12 md:py-6 px-6 py-8 relative  overflow-hidden">
        <div className="flex flex-col justify-center h-full gap-12 md:-mt-6">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight2 relative z-0 w-fit">
            Pourquoi nous rejoindre ?
          </h1>
          <div className="hidden md:flex md:gap-4">{goalsSlides}</div>
          <div className="md:hidden">
            <DynamicSwiper slides={goalsSlides} />
          </div>
        </div>

        {/* <Image
          aria-hidden
          src="/underline-doodle.png"
          alt="doodle"
          width={500}
          height={500}
          className="h-auto w-4/5 md:w-1/5 md:absolute md:right-1/2 md:bottom-8 md:translate-x-1/2 m-auto mt-4 z-0"
        />
        <Image
          aria-hidden
          src="/craft-doodle.png"
          alt="doodle"
          width={500}
          height={500}
          className="h-1/4 w-auto absolute md:right-16 md:top-6 md:translate-x-1/2 m-auto rotate-180 z-0 hidden md:block"
        />
        <Image
          aria-hidden
          src="/photo-doodle.png"
          alt="doodle"
          width={500}
          height={500}
          className="h-1/5 w-auto absolute -right-2 md:left-2 md:top-auto top-4 md:bottom-8 z-0"
        /> */}
      </section>

      {/* UPCOMING EVENT */}
      <section className="flex flex-col md:flex-row gap-12 h-fit md:h-screen-minus-header bg-[#FCC0C5] md:px-12 md:py-8 px-6 py-12">
        <div className="flex-1 flex flex-col justify-center gap-12 w-full md:w-1/2">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
            Prochain événement
          </h1>
          {/* POLAROIDS */}
          <div className="hidden md:flex justify-center items-center">
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
          <p className="hidden">
            Lorem ipsum odor amet, consectetuer adipiscing elit. Et amet
            convallis adipiscing hac posuere turpis. Malesuada tincidunt
            vulputate eget elit sed fringilla habitasse felis? Malesuada
            malesuada varius inceptos; volutpat eros quis. Est vulputate
            porttitor blandit accumsan nascetur nisl odio. Efficitur consectetur
            erat ornare velit tristique suspendisse. Porta inceptos quis dolor
            maximus habitasse semper tortor netus nibh.
          </p>
          <div className="py-2">
            <PartnersSlider />
          </div>
          <div className="flex justify-between gap-4 py-4">
            <button className="flex-1 shadow-sm rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]">
              Acheter mon billet
            </button>
            <button className="flex-1 shadow-sm rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]">
              En savoir plus
            </button>
          </div>

          <div className="md:w-[90%] m-auto mt-4">
            <Countdown targetDate="2025-01-31T00:00:00" />
          </div>
        </div>
      </section>

      {/* CUSTOMERS REVIEWS */}
      <section className="bg-white h-fit md:h-screen-minus-header pt-10 pb-16 md:pb-8 gap-4 overflow-x-hidden relative">
        {/* <Image
          aria-hidden
          src="/3hearts-doodle.png"
          alt="doodle"
          width={500}
          height={500}
          className="h-auto md:w-[10%] w-1/4 absolute right-4 md:right-20"
        /> */}
        <div className="flex flex-col justify-center h-full gap-12 md:-mt-6">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit ml-12">
            Vos avis
          </h1>
          <div className="hidden md:block">
            <ReviewSwiper />
          </div>
          <div className="md:hidden">
            <CardsSwiper />
          </div>
          {/* <Image
            aria-hidden
            src="/what-doodle.png"
            alt="doodle"
            width={500}
            height={500}
            className="h-12 w-auto absolute left-[8%] bottom-6 m-auto z-0 -rotate-[80deg] md:hidden"
          /> */}
        </div>
      </section>
    </div>
  );
}
