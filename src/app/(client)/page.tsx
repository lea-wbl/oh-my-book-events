"use client";

import CardsSwiper from "@/components/CardsSwiper";
import Countdown from "@/components/Countdown";
import DynamicSwiper from "@/components/DynamicSwiper";
import LandingSwiper from "@/components/LandingSwiper";
import PartnersSlider from "@/components/PartnersSlider";
import Image from "next/image";
import { Location04Icon, Clock05Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "@/interfaces/interfaces";
import ReviewSwiper2 from "@/components/ReviewSwiper2";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const objectifs = [
  {
    title: "Rencontrer de nouvelles personnes",
    text: (
      <p className="text-justify">
        <strong>
          Parce qu’on sait ce que c’est d’aimer un livre et de n’avoir personne
          à qui en parler.
        </strong>{" "}
        Tu termines un roman qui t’a bouleversé, et là… rien. Personne avec qui
        partager ton émotion, personne à harceler pour revivre CETTE scène. Avec
        nous,{" "}
        <span className="text-orange-500 font-handwritten text-3xl leading-5">
          tu ne vivras plus jamais ça !
        </span>{" "}
        Nos événements sont pensés pour te connecter à des gens qui te
        comprennent, dans une ambiance bienveillante et authentique. Viens comme
        tu es, repars avec des amitiés qui comptent.
      </p>
    ),
  },
  {
    title: "Vivre des expériences uniques",
    text: (
      <p className="text-justify">
        <strong>
          Ici, on ne fait pas juste des événements : on crée des souvenirs.
        </strong>{" "}
        Oublie les clubs de lecture et les rencontres classiques, on t’embarque
        dans des mondes où tu as un rôle à jouer, où chaque événement est une
        aventure. Plonge dans des soirées immersives et des expériences
        littéraires où l’ennui n’a pas sa place. On veut que tu ressortes avec{" "}
        <span className="text-orange-500 font-handwritten text-3xl leading-5 mr-1">
          des étoiles dans les yeux
        </span>
        {"  "}
        et cette sensation rare d’avoir vécu un moment hors du temps.
      </p>
    ),
  },
  {
    title: "Découvrir des pépites littéraires",
    text: (
      <p className="text-justify">
        <strong>
          Que tu sois un lecteur occasionnel ou un dévoreur de livres, ici, tout
          le monde a sa place.
        </strong>{" "}
        Notre mission ? Te faire découvrir des romans incroyables, ceux qui
        méritent d’être sous les projecteurs. Fini les recommandations vues et
        revues, ici, on met en lumière des histoires qui bousculent, qui
        marquent et qui font vibrer.{" "}
        <span className="text-orange-500 font-handwritten text-3xl leading-5 mr-1">
          Des récits qui méritent qu’on en parle
        </span>{" "}
        et qui, peut-être, deviendront tes prochains coups de cœur.
      </p>
    ),
  },
];

const goalsSlides = objectifs.map((obj) => (
  <div
    className="notes shadow-lg md:w-1/3 p-8 pt-12 h-full md:h-auto z-10"
    key={obj.title}
  >
    <h3 className="text-xl font-medium font-headline pb-4">{obj.title}</h3>
    {obj.text}
  </div>
));

export default function Home() {
  const [sliderImages, setSliderImages] = useState([]);
  const [nextEvent, setNextEvent] = useState<Event>({
    images: [],
    name: "",
    type: "",
    typeId: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    location: "",
    address: "",
    ticketLink: "",
    partners: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/gallery").then((res) => {
      setSliderImages(res.data);
    });

    axios
      .get("/api/events?closest=true")
      .then((res) => {
        setNextEvent(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de l'événement", error);
        toast.error("Erreur lors du chargement de l'événement");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const mixUpArray = (arr: any[]) => {
    let middle = Math.floor(arr.length / 2);
    return arr.slice(middle).concat(arr.slice(0, middle));
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      {/* LANDING V2 */}
      <section className="flex flex-col h-screen-minus-header-mobile md:h-screen-minus-header bg-[#F6838D] md:py-6 py-0 gap-4 relative">
        <LandingSwiper images={sliderImages} dir="ltr" mobileOnly={false} />
        <LandingSwiper
          images={mixUpArray(sliderImages)}
          dir="rtl"
          mobileOnly={false}
        />
        <LandingSwiper
          images={sliderImages.reverse()}
          dir="ltr"
          mobileOnly={true}
        />
        <LandingSwiper
          images={mixUpArray(sliderImages).reverse()}
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
              <span className="mx-2 text-5xl md:text-7xl !leading-[3.2rem] font-handwritten align-bottom">
                souvenirs
              </span>{" "}
              uniques
            </p>
          </div>
        </div>
      </section>

      {/* GOALS */}
      <section className="h-fit md:h-screen-minus-header bg-amber-200 custom-bg1 md:px-12 md:py-6 px-6 py-8 relative  overflow-hidden">
        <div className="flex flex-col justify-center h-full gap-12 md:-mt-6">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight2 relative z-0 w-fit">
            Pourquoi nous rejoindre ?
          </h1>
          <div className="hidden md:flex md:gap-4">{goalsSlides}</div>
          <div className="md:hidden">
            <DynamicSwiper slides={goalsSlides} />
          </div>
        </div>
      </section>

      {/* UPCOMING EVENT */}
      <section className="flex flex-col md:flex-row gap-12 h-fit md:h-screen-minus-header bg-[#FCC0C5] custom-bg2 md:p-12 py-12 items-center">
        <div className="flex-1 flex flex-col justify-center gap-12 w-full md:w-1/2 self-start">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight4 relative z-0 w-fit">
            Prochain événement
          </h1>
          {/* POLAROIDS */}
          <div className="h-full w-full flex -mt-2">
            {/* pol 1 */}
            <div className="w-fit h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white transform translate-x-12 rotate-6 z-0 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-left ease-in">
              <div className="bg-gray-300 w-52 aspect-square">
                <Image
                  aria-hidden
                  // src="/presentation.jpg"
                  src={`https://ucarecdn.com/${nextEvent.images[0].uuid}/`}
                  alt="File icon"
                  fill
                  className="shadow object-cover"
                />
              </div>
            </div>
            {/* pol 2 */}
            <div className="w-fit h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white transform translate-y-12 -rotate-2 z-10 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-center ease-in">
              <div className="bg-gray-300 w-52 aspect-square overflow-hidden grid align-center">
                <Image
                  aria-hidden
                  // src="/library.jpg"
                  src={`https://ucarecdn.com/${nextEvent.images[1].uuid}/`}
                  alt="File icon"
                  fill
                  className="shadow object-cover"
                />
              </div>
            </div>
            {/* pol 3 */}
            <div className="w-fit h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white transform -translate-x-12 rotate-[4deg] z-20 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-right ease-in">
              <div className="bg-gray-300 w-52 aspect-square overflow-hidden grid align-center">
                <Image
                  aria-hidden
                  // src="/books.jpg"
                  src={`https://ucarecdn.com/${nextEvent.images[2].uuid}/`}
                  alt="File icon"
                  fill
                  className="shadow object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* EVENT INFOS */}
        <div className="bg-white rounded-xl w-full md:w-2/5 p-6 md:p-8 shadow-md h-fit">
          {/* header */}
          <div className="flex justify-between items-center border-b-2 pb-2">
            <div>
              <h3 className="font-headline text-2xl">{nextEvent.name}</h3>
              <h4 className="text-gray-500">{nextEvent.type}</h4>
            </div>
            <div className="grid justify-items-center content-center py-1 px-3 bg-red-200 rounded-md shadow-sm -mt-2">
              <span className="font-bold text-3xl leading-7">
                {new Date(nextEvent.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                })}
              </span>
              <span>
                {new Date(nextEvent.date)
                  .toLocaleDateString("fr-FR", {
                    month: "short",
                  })
                  .toUpperCase()}
              </span>
            </div>
          </div>

          <div className="py-4 gap-4 grid">
            <div className="flex gap-4 items-center">
              <Location04Icon size={34} color="black" className="" />
              <p>
                <span className="font-bold">{nextEvent.location}</span>
                <br />
                <span>{nextEvent.address}</span>
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-[34px]">
                  <Clock05Icon size={28} color="black" className="" />
                </div>
                <p>
                  De {nextEvent.timeStart} à {nextEvent.timeEnd}
                </p>
              </div>
              <button
                onClick={() => window.open(nextEvent.ticketLink, "_blank")}
                className="shadow-sm rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]"
              >
                En savoir plus
              </button>
            </div>
          </div>

          <div className="m-auto mt-4">
            <Countdown
              targetDate={`${nextEvent.date.toString().slice(0, 10)}T${
                nextEvent.timeStart
              }:00.000`}
            />
          </div>

          <div className="py-2">
            <PartnersSlider />
          </div>
        </div>
      </section>

      {/* CUSTOMERS REVIEWS */}
      <section className="bg-[#F6838D] custom-bg3 h-fit md:h-screen-minus-header pt-10 pb-16 md:pb-8 gap-4 overflow-x-hidden relative">
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
            <ReviewSwiper2 />
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
