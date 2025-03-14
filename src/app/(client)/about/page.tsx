"use client";
import Image from "next/image";

const faq = [
  {
    id: 1,
    question: "Voici une première question ?",
    answer:
      "Voici la super réponse à cette super question ! En espérant qu'elle apporte les informations nécessaires voire peut-être plus.",
  },
  {
    id: 2,
    question:
      "Et maintenant j'ai besoin d'une question plus longue pour évaluer le comportement du saut de ligne ?",
    answer:
      "Sem facilisis tempus feugiat parturient praesent potenti nec magnis. Venenatis nulla dolor vitae mauris malesuada congue potenti nec. Feugiat nec nascetur duis ipsum pretium tortor.",
  },
];

const About = () => {
  return (
    <div>
      {/* OUR STORY */}
      <section className="px-6 py-8 md:px-16 md:py-16 h-screen-minus-header w-full bg-[#F6838D] custom-bg3 flex relative text-white">
        <div className="grid flex-1">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
            Notre histoire
          </h1>
          <p className="text-xl font-bold">
            On va pas se mentir : on aurait pu juste être deux lectrices qui se
            croisent, parlent livres et s’arrêtent là. Mais non.
          </p>
          <span className="font-handwritten text-4xl leading-[0]">
            Lire, c’est bien. Mais partager, c’est mieux.
          </span>
          <p className="leading-7">
            Combien de fois on a refermé un livre en se disant "Il faut
            absolument que j’en parle à quelqu’un !" sans jamais trouver LA
            personne qui comprendrait l’émotion brute, le frisson d’une
            révélation ou l’impact d’une scène ? Combien de fois on a rêvé de
            partager sans pression, sans justification, avec des passionnés qui
            vibrent au même rythme… mais ne jamais savoir où les trouver ?
          </p>
          <span className="text-xl font-bold">
            Alors on a décidé de créer Oh My Book.
          </span>
        </div>
        {/* POLAROIDS */}
        <div className="w-1/2 mx-auto relative h-full">
          {/* pol 1 */}
          <div className="w-fit h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white absolute bottom-0 left-1/2 transform rotate-12 z-20 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-bottom-right ease-in">
            <div className="bg-gray-300 w-52 aspect-square">
              <Image
                aria-hidden
                src="/presentation.jpg"
                alt="File icon"
                fill
                className="shadow object-cover"
              />
            </div>
          </div>
          {/* pol 2 */}
          <div className="w-fit h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white absolute bottom-0 right-1/2 transform -rotate-6 z-0 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-bottom-left ease-in">
            <div className="bg-gray-300 w-52 aspect-square overflow-hidden grid align-center">
              <Image
                aria-hidden
                src="/books.jpg"
                alt="File icon"
                fill
                className="shadow object-cover"
              />
            </div>
          </div>
          {/* pol 3 */}
          <div className="w-fit h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white absolute top-0 left-1/2 transform -translate-x-1/2 rotate-3 z-10 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-top ease-in">
            <div className="bg-gray-300 w-52 aspect-square overflow-hidden grid align-center">
              <Image
                aria-hidden
                src="/library.jpg"
                alt="File icon"
                fill
                className="shadow object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* OUR STORY PART 2 */}
      <section className="px-6 py-8 md:px-16 md:py-6 h-screen-minus-header w-full custom-bg1 bg-amber-200 grid content-evenly">
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
        <div className="grid grid-cols-3 gap-12 h-fit">
          <div className="notes shadow-lg p-10 flex flex-col gap-4 items-center text-center">
            <div className="h-28">
              <Image
                src="/starz.png"
                alt="File icon"
                width={800}
                height={800}
                className="h-full w-auto object-cover"
              />
            </div>
            <h3 className="text-lg font-medium font-headline">
              Des expériences qui font vibrer.
            </h3>
            <p>
              Vivre les livres autrement, à travers des rencontres et des
              événements pensés pour surprendre et créer du lien.
            </p>
          </div>
          <div className="notes shadow-lg p-10 flex flex-col gap-4 items-center text-center">
            <div className="h-28">
              <Image
                src="/gem-book.png"
                alt="File icon"
                width={800}
                height={800}
                className="h-full w-auto object-cover"
              />
            </div>
            <h3 className="text-lg font-medium font-headline">
              Des pépites littéraires à découvrir.
            </h3>
            <p>
              Fini les recommandations vues et revues ! Ici, on met en lumière
              des romans qui méritent vraiment d’être sous les projecteurs.
            </p>
          </div>
          <div className="notes shadow-lg p-10 flex flex-col gap-4 items-center text-center">
            <div className="h-28">
              <Image
                src="/bubbles.png"
                alt="File icon"
                width={800}
                height={800}
                className="h-full w-auto object-cover"
              />
            </div>
            <h3 className="text-lg font-medium font-headline">
              Une communauté où tu as ta place.
            </h3>
            <p>
              Peu importe combien tu lis ou si tu es sur les réseaux, tu
              trouveras ici des passionnés avec qui partager sans filtre.
            </p>
          </div>
        </div>
      </section>
      {/* US */}
      <section className="px-6 py-8 md:px-16 md:py-6 h-screen-minus-header w-full bg-[#FCC0C5] custom-bg2 flex gap-8 overflow-hidden">
        <div className="flex-1 grid items-end -mb-10">
          <Image
            src="/girlz.png"
            alt="File icon"
            width={800}
            height={800}
            className="h-auto w-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight4 relative z-0 w-fit mb-8">
            Et nous ?
          </h1>
          <p className="mb-4">
            <span className="font-medium font-headline text-lg">Chloé</span>,
            c’est la créative qui a toujours mille idées en tête et qui adore
            raconter des histoires, créer du lien et donner vie aux projets.
            Toujours le sourire, avec cette envie de partager sa bonne humeur et
            sa bienveillance.
          </p>
          <p className="mb-8">
            <span className="font-medium font-headline text-lg">Inès</span>,
            c’est l’âme rêveuse qui adore penser les événements dans les
            moindres détails pour que chaque expérience soit unique. Elle lit
            tout le temps et aime dénicher ces pépites littéraires dont personne
            ne parle encore.
          </p>
          <span className="font-bold text-lg">
            Et toi, tu viens partager tes plus belles histoires avec nous ?
          </span>
        </div>
      </section>
      {/* FAQ */}
      {/* <section className="bg-[#F6838D] custom-bg3 px-6 py-8 md:px-12 md:py-6 h-screen-minus-header w-full">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit mb-8">
          FAQ
        </h1>
        <div className="grid grid-cols-3 gap-8">
          <div className="relative z-10 w-full flex flex-col gap-4">
            <h2 className="font-headline font-medium text-white text-2xl">
              Un titre de section
            </h2>
            {questions.map((q) => (
              <div
                key={q._id}
                className="flex flex-col cursor-pointer"
                onClick={() => showAnswers(q._id)}
              >
                <div className="boxx">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="circlee"></div>
                      <p className="font-semibold">{q.question}</p>
                    </div>
                    <CircleArrowDown01Icon
                      size={28}
                      color="#f6838d"
                      className={`min-w-max transition-transform duration-300 ${
                        answersShown.includes(q._id) ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      answersShown.includes(q._id)
                        ? "max-h-40 opacity-100 pt-4"
                        : "max-h-0 opacity-0 pt-0"
                    }`}
                  >
                    {q.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative z-10 w-full flex flex-col gap-4">
            <h2 className="font-headline font-medium text-white text-2xl">
              Ici la deuxième section
            </h2>
            {questions.map((q) => (
              <div
                key={q._id}
                className="flex flex-col cursor-pointer"
                onClick={() => showAnswers(q._id)}
              >
                <div className="boxx">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="circlee"></div>
                      <p className="font-semibold">{q.question}</p>
                    </div>
                    <CircleArrowDown01Icon
                      size={28}
                      color="#f6838d"
                      className={`min-w-max transition-transform duration-300 ${
                        answersShown.includes(q._id) ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      answersShown.includes(q._id)
                        ? "max-h-40 opacity-100 pt-4"
                        : "max-h-0 opacity-0 pt-0"
                    }`}
                  >
                    {q.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="relative z-10 w-full flex flex-col gap-4">
            <h2 className="font-headline font-medium text-white text-2xl">
              Et enfin la troisième
            </h2>
            {questions.map((q) => (
              <div
                key={q._id}
                className="flex flex-col cursor-pointer"
                onClick={() => showAnswers(q._id)}
              >
                <div className="boxx">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="circlee"></div>
                      <p className="font-semibold">{q.question}</p>
                    </div>
                    <CircleArrowDown01Icon
                      size={28}
                      color="#f6838d"
                      className={`min-w-max transition-transform duration-300 ${
                        answersShown.includes(q._id) ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      answersShown.includes(q._id)
                        ? "max-h-40 opacity-100 pt-4"
                        : "max-h-0 opacity-0 pt-0"
                    }`}
                  >
                    {q.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;
