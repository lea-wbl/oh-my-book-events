"use client";
import CustomSwiper from "@/components/CustomSwiper";
import Polaroids from "@/components/Polaroids";
import Image from "next/image";
import { useState, useEffect, JSX, useRef } from "react";

const objectifs = [
  {
    image: "/starz.png",
    title: "Des expériences qui font vibrer.",
    description:
      "Vivre les livres autrement, à travers des rencontres et des événements pensés pour surprendre et créer du lien.",
  },
  {
    image: "/gem-book.png",
    title: "Des pépites littéraires à découvrir.",
    description:
      "Fini les recommandations vues et revues ! Ici, on met en lumière des romans qui méritent vraiment d’être sous les projecteurs.",
  },
  {
    image: "/bubbles.png",
    title: "Une communauté où tu as ta place.",
    description:
      "Peu importe combien tu lis ou si tu es sur les réseaux, tu trouveras ici des passionnés avec qui partager sans filtre.",
  },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollLeft = containerRef.current.scrollLeft;
      const width = containerRef.current.offsetWidth;

      const index = Math.round(scrollLeft / width);

      setActiveIndex(index);
    };

    const ref = containerRef.current;
    ref?.addEventListener("scroll", handleScroll);

    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* OUR STORY */}
      <section className="px-6 py-8 md:px-16 md:py-16 h-fit md:h-screen-minus-header w-full bg-OMBpink custom-bg3 text-white grid">
        <div className="max-w-screen-2xl mx-auto flex items-center relative gap-8">
          <div className="grid flex-1 h-fit gap-10">
            <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white w-fit">
              <span className="realistic-marker-highlight">Notre histoire</span>
            </h1>
            <p className="text-xl font-bold">
              On va pas se mentir : on aurait pu juste être deux lectrices qui
              se croisent, parlent livres et s’arrêtent là. Mais non.
            </p>
            <span className="font-handwritten text-4xl leading-[0]">
              Lire, c’est bien. Mais partager, c’est mieux.
            </span>
            <p className="leading-7">
              Combien de fois on a refermé un livre en se disant "Il faut
              absolument que j’en parle à quelqu’un !" sans jamais trouver LA
              personne qui comprendrait l’émotion brute, le frisson d’une
              révélation ou l’impact d’une scène ? Combien de fois on a rêvé de
              partager sans pression, sans justification, avec des passionnés
              qui vibrent au même rythme… mais ne jamais savoir où les trouver ?
            </p>
            <span className="text-xl font-bold">
              Alors on a décidé de créer Oh My Book.
            </span>
          </div>
          <div className="w-1/2">
            <Polaroids
              images={["/books.jpg", "/presentation.jpg", "/library.jpg"]}
            />
          </div>
        </div>
      </section>
      {/* OUR STORY PART 2 */}
      <section className="px-6 py-8 md:px-16 md:py-6 h-fit md:h-screen-minus-header w-full custom-bg1 bg-amber-200">
        <div className="flex flex-col gap-8 max-w-screen-2xl mx-auto h-full justify-center">
          <div className="text-xl font-bold tracking-wide flex flex-col gap-4 text-center">
            <p>
              Pas juste pour parler de livres. Pas juste pour organiser des
              événements.
            </p>
            <p>
              Mais pour que chaque lecteur puisse enfin vivre sa passion
              autrement.
            </p>
          </div>
          {/* Notes */}
          <div className="w-full">
            <div
              ref={containerRef}
              className="overflow-x-auto snap-x snap-mandatory scrollbar-hide shadow-lg md:shadow-none"
            >
              <div className="grid md:grid-cols-3 grid-flow-col auto-cols-[100%] w-full gap-6">
                {objectifs.map((objectif, index) => (
                  <div
                    key={index}
                    className="w-full notes shadow-lg p-8 flex flex-col gap-4 md:mx-3 md:mb-4 items-center text-center snap-start [scroll-snap-stop:always] shrink-0"
                  >
                    <div className="h-28">
                      <Image
                        src={objectif.image}
                        alt="File icon"
                        width={800}
                        height={800}
                        className="h-full w-auto object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-medium font-headline">
                      {objectif.title}
                    </h3>
                    <p>{objectif.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bullets */}
            <div className="flex md:hidden justify-center mt-4 gap-[8px]">
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
        </div>
      </section>
      {/* US */}
      <section className="px-6 py-8 md:px-16 md:py-6 h-fit md:h-screen-minus-header w-full bg-pastelPink custom-bg2 overflow-hidden grid">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row-reverse gap-8">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white w-fit mb-8">
              <span className="realistic-marker-highlight4">Et nous ?</span>
            </h1>
            <p className="mb-4">
              <span className="font-medium font-headline text-lg">Chloé</span>,
              c’est la créative qui a toujours mille idées en tête et qui adore
              raconter des histoires, créer du lien et donner vie aux projets.
              Toujours le sourire, avec cette envie de partager sa bonne humeur
              et sa bienveillance.
            </p>
            <p className="mb-8">
              <span className="font-medium font-headline text-lg">Inès</span>,
              c’est l’âme rêveuse qui adore penser les événements dans les
              moindres détails pour que chaque expérience soit unique. Elle lit
              tout le temps et aime dénicher ces pépites littéraires dont
              personne ne parle encore.
            </p>
            <span className="font-bold text-lg">
              Et toi, tu viens partager tes plus belles histoires avec nous ?
            </span>
          </div>
          <div className="flex-1 grid items-end -mb-10">
            <Image
              src="/girlz.png"
              alt="File icon"
              width={800}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
