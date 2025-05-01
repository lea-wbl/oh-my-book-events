"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Event } from "@/interfaces/interfaces";
import { Toaster, toast } from "react-hot-toast";
import Loader from "@/components/Loader";
import CustomSwiper from "@/components/CustomSwiper";
import { randomRotation } from "../utils/tools";
import EventCard from "@/components/EventCard";
import LandingSwiper from "@/components/LandingSwiper";
import Polaroids from "@/components/Polaroids";
import { useWindowWidth } from "@/hooks/useWindowWidth";

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

const quotes = [
  "/quote-pink.png",
  "/quote-yellow.png",
  "/quote-pastel.png",
  "/quote-orange.png",
];

export default function Home() {
  const width = useWindowWidth();
  const [sliderImages, setSliderImages] = useState([]);
  const [reviews, setReviews] = useState<
    { _id: string; name: string; content: string }[]
  >([]);
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (isLoading) return;

      if (!containerRef.current) return;

      const scrollLeft = containerRef.current.scrollLeft;
      const width = containerRef.current.offsetWidth;

      const index = Math.round(scrollLeft / width);

      setActiveIndex(index);
    };

    const ref = containerRef.current;
    ref?.addEventListener("scroll", handleScroll);

    return () => ref?.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  useEffect(() => {
    axios.get("/api/gallery").then((res) => {
      setSliderImages(res.data);
    });

    axios.get("/api/reviews").then((res) => {
      setReviews(res.data);
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
    const middle = Math.floor(arr.length / 2);
    return arr.slice(middle).concat(arr.slice(0, middle));
  };

  if (isLoading) return <Loader admin={false} />;

  return (
    <div className="snap-y snap-mandatory md:h-screen-minus-header overflow-scroll">
      <Toaster />
      {/* LANDING */}
      <section className="h-screen-minus-header-mobile md:h-screen-minus-header bg-OMBpink py-0 gap-4 relative grid snap-start">
        {/* <div className="flex flex-col h-screen-minus-header pt-6">
          <div className="flex gap-6 h-1/2 px-6 pb-6">
            {sliderImages
              .slice(0, 5)
              .map((image: { _id: string; uuid: string; name: string }, i) => (
                <div
                  key={image._id}
                  className="relative w-fit h-full max-w-[25%] overflow-hidden bg-red-200"
                >
                  <Image
                    src={`https://ucarecdn.com/${image.uuid}/`}
                    alt={`Gallery image ${i}`}
                    fill
                    className="object-cover h-full !static"
                  />
                  {image.name}
                </div>
              ))}
          </div>
          <div className="flex gap-6 h-1/2 px-6 pb-6">
            {sliderImages
              .slice(5, 10)
              .map((image: { _id: string; uuid: string; name: string }, i) => (
                <div
                  key={image._id}
                  className="relative w-fit h-full max-w-[25%] overflow-hidden bg-red-200"
                >
                  <Image
                    src={`https://ucarecdn.com/${image.uuid}/`}
                    alt={`Gallery image ${i}`}
                    fill
                    className="object-cover h-full !static"
                  />
                </div>
              ))}
          </div>
          {width < 768 &&
          <>
                 <div className="flex gap-6 h-1/2 px-6 pb-6">
            {sliderImages
              .slice(0, 5).reverse()
              .map((image: { _id: string; uuid: string; name: string }, i) => (
                <div
                  key={image._id}
                  className="relative w-fit h-full max-w-[25%] overflow-hidden bg-red-200"
                >
                  <Image
                    src={`https://ucarecdn.com/${image.uuid}/`}
                    alt={`Gallery image ${i}`}
                    fill
                    className="object-cover h-full !static"
                  />
                  {image.name}
                </div>
              ))}
          </div>
          <div className="flex gap-6 h-1/2 px-6 pb-6">
            {sliderImages
              .slice(5, 10).reverse()
              .map((image: { _id: string; uuid: string; name: string }, i) => (
                <div
                  key={image._id}
                  className="relative w-fit h-full max-w-[25%] overflow-hidden bg-red-200"
                >
                  <Image
                    src={`https://ucarecdn.com/${image.uuid}/`}
                    alt={`Gallery image ${i}`}
                    fill
                    className="object-cover h-full !static"
                  />
                </div>
              ))}
          </div>
          </>}
        </div> */}

        <LandingSwiper images={sliderImages} dir="ltr" mobileOnly={false} />
        <LandingSwiper
          images={mixUpArray(sliderImages)}
          dir="rtl"
          mobileOnly={false}
        />
        {width < 768 &&
        <>
         <LandingSwiper images={mixUpArray(sliderImages).toReversed()} dir="ltr" mobileOnly={false} />
        <LandingSwiper
          images={sliderImages.toReversed()}
          dir="rtl"
          mobileOnly={false}
        />
        </>}

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
      <section className="h-fit md:h-screen-minus-header bg-amber-200 custom-bg1 md:p-12 px-6 py-8 relative overflow-hidden snap-start">
        <div className="flex flex-col justify-center h-full gap-8 md:gap-12 max-w-screen-2xl mx-auto">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white w-fit">
            <span className="realistic-marker-highlight2">
              Pourquoi nous rejoindre ?
            </span>
          </h1>

          <div className="w-full">
            <div
              ref={containerRef}
              className="overflow-x-auto snap-x snap-mandatory scrollbar-hide shadow-lg md:shadow-none"
            >
              <div className="grid md:grid-cols-3 grid-flow-col auto-cols-[100%] w-full gap-6 md:gap-0">
                {objectifs.map((objectif, index) => (
                  <div
                    className="notes shadow-lg md:mx-2 md:mb-6 p-8 pt-12 h-full md:h-auto z-10 snap-start [scroll-snap-stop:always]"
                    key={objectif.title}
                  >
                    <h3 className="text-xl font-medium font-headline pb-4">
                      {objectif.title}
                    </h3>
                    {objectif.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Bullets */}
            <div className="flex justify-center mt-4 gap-[8px] md:hidden">
              {objectifs.map((_, i) => (
                <button
                  key={i}
                  className={`w-[8px] h-[8px] rounded-full ${
                    i === activeIndex ? "bg-white" : "bg-gray-500/30"
                  }`}
                  onClick={() => {
                    containerRef.current?.scrollTo({
                      left: i * containerRef.current.offsetWidth,
                      behavior: "smooth",
                    });
                  }}
                />
              ))}
            </div>
          </div>
          {/* </div> */}
        </div>
      </section>

      {/* UPCOMING EVENT */}
      {nextEvent?.name.length > 0 && (
        <section className="h-fit md:h-screen-minus-header bg-pastelPink custom-bg2 px-6 py-8 md:p-12 snap-start">
          <div className="flex flex-col items-center md:flex-row gap-8 md:gap-12 max-w-screen-2xl mx-auto h-full">
            <div className="flex-1 flex flex-col justify-center gap-2 w-full md:w-1/2 self-start 2xl:my-auto 2xl:-translate-y-4">
              <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl md:mt-8 text-white w-fit">
                <span className="realistic-marker-highlight4">
                  Prochain événement
                </span>
              </h1>
              <Polaroids
                images={nextEvent.images.map((img) => img.uuid)}
                hasTitleAbove
                fromUCare
              />
            </div>

            {/* event infos */}
            <div className="w-full md:w-2/5">
              <EventCard
                event={nextEvent}
                isMobile={width < 768}
                hasCountdown={true}
              />
            </div>
          </div>
        </section>
      )}

      {/* CUSTOMERS REVIEWS */}
      {reviews.length > 0 && (
        <section className="bg-OMBpink custom-bg3 h-fit md:h-screen-minus-header pt-10 pb-16 md:py-12 gap-4 overflow-x-hidden relative snap-start">
          {/* <Image
          aria-hidden
          src="/3hearts-doodle.png"
          alt="doodle"
          width={500}
          height={500}
          className="h-auto md:w-[10%] w-1/4 absolute right-4 md:right-20"
        /> */}
          <div className="flex flex-col justify-center h-full gap-8 md:gap-12 md:-mt-2">
            <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white w-fit ml-12">
              <span className="realistic-marker-highlight">Vos avis</span>
            </h1>
            <CustomSwiper
              classes={
                width < 768 ? "cardsEffectSwiper" : "fullWidthSwiper !h-[350px]"
              }
              grabCursor={true}
              navigation={width < 768 ? false : true}
              effect={width < 768 ? "cards" : undefined}
              slidesPerView={width < 768 ? 1 : width > 1440 ? 5 :4}
              centeredSlides={true}
              spaceBetween={width < 768 ? 0 : 30}
              loop={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              items={reviews}
              renderItem={(review, index) => (
                <div
                  className="grid items-center sticky-note p-8 aspect-square relative shadow-lg overflow-y-scroll"
                  style={{
                    ...(width > 768 && {
                      transform: `rotate(${randomRotation(index)})`,
                    }),
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
              )}
            />
          </div>
        </section>
      )}
    </div>
  );
}
