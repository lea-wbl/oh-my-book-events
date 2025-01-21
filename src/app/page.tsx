"use client";

import CardsSwiper from "@/components/CardsSwiper";
import Countdown from "@/components/Countdown";
import FlipCountdown from "@/components/FlipCountdown";
import PartnersSlider from "@/components/PartnersSlider";
import ReviewSlider from "@/components/ReviewSlider";
import ReviewSlider2 from "@/components/ReviewSlider2";
import ReviewSwiper from "@/components/ReviewSwiper";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      {/* LANDING */}
      <section className="flex h-screen-minus-header bg-red-200 px-12 py-6">
        <div className="w-1/2 flex justify-center items-center flex-col bg-[url('/paper.png')] bg-contain bg-no-repeat [background-position-x:10px]">
          {/* <Image
            src="/landing-img.png"
            alt="Oh My Book"
            width={200}
            height={100}
            className="border"
          /> */}
          <Image
            src="/logo-oh-my-book.png"
            alt="Oh My Book"
            width={200}
            height={100}
            className="border border-gray-950"
          />
          <p>transforme tes lectures en souvenirs uniques</p>
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          <h2 className="text-xl font-bold">LOREM IPSUM DOLOR SIT AMET</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur?
          </p>
        </div>
      </section>

      {/* GOALS */}
      <section className="flex gap-4 h-screen-minus-header bg-amber-200 px-12 py-6">
        <div>
          <h3 className="text-lg font-semibold">
            Rencontrer de nouvelles personnes
          </h3>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            Découvrir de nouvelles lectures
          </h3>
          <p>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus.{" "}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            Participer à des ateliers créatifs
          </h3>
          <p>
            Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates repudiandae sint et
            molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
            delectus, ut aut reiciendis voluptatibus maiores alias consequatur
            aut perferendis doloribus asperiores repellat.
          </p>
        </div>
      </section>

      {/* UPCOMING EVENT */}
      <section className="flex flex-col gap-4 h-screen-minus-header bg-red-200 px-12 py-6">
        <h1 className="font-headline text-[2.5rem] leading-none md:text-6xl text-white realistic-marker-highlight relative z-0 w-fit">
          Prochain événement
        </h1>

        <div className="flex-1 flex">
          {/* POLAROIDS */}
          <div className="flex w-1/2 justify-center items-center">
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
          <div className="bg-white rounded-xl w-1/2 p-8 shadow-md">
            <h3 className="font-headline text-2xl">Un Nom d'Event</h3>
            <h4>Brunch littéraire</h4>
            <p>La Fabuleuse Cantine, 107 rue de Marseille, 69007 Lyon</p>
            <p>De 10h à 18h</p>
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Et amet
              convallis adipiscing hac posuere turpis. Malesuada tincidunt
              vulputate eget elit sed fringilla habitasse felis? Malesuada
              malesuada varius inceptos; volutpat eros quis. Est vulputate
              porttitor blandit accumsan nascetur nisl odio. Efficitur
              consectetur erat ornare velit tristique suspendisse. Porta
              inceptos quis dolor maximus habitasse semper tortor netus nibh.
              {/* <br />
              Torquent fermentum eleifend dolor hac ac molestie pharetra.
              Iaculis maecenas pharetra magnis neque potenti elit finibus. Diam
              magna nostra parturient sagittis cubilia hac sem rutrum. Ultricies
              feugiat vitae commodo aliquam rutrum magna tristique euismod? Leo
              pharetra fermentum bibendum egestas amet, orci tellus habitant.
              Litora vitae natoque fames hac; amet blandit habitant ultrices
              quis. Nisl quisque cubilia consectetur tempor; enim tincidunt?
              Metus auctor facilisis varius vel mattis feugiat; ultricies
              himenaeos. Inceptos elit tincidunt penatibus suspendisse gravida. */}
            </p>
            <PartnersSlider />
            <button className="rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]">
              Acheter mon billet
            </button>
            <button className="rounded-full bg-[#f7a976] text-white px-4 py-1 border-[#f7a976] border-2 hover:bg-white hover:text-[#f7a976]">
              En savoir plus
            </button>
            <Countdown targetDate="2025-01-31T00:00:00" />
          </div>
        </div>
      </section>

      {/* CUSTOMERS REVIEWS */}
      <section className="flex flex-col bg-white h-screen-minus-header py-6 gap-4 overflow-x-hidden">
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

      {/* <div>
        <div className="ml-52 mb-20 grid grid-cols-2 grid-rows-2 relative paper shadow-md">
          <div className="top-left"></div>
          <div className="top-right"></div>
          <div className="bottom-left"></div>
          <div className="bottom-right"></div>
          <div className="w-full aspect-square flex flex-col justify-center p-2 absolute top-0 left-0">
            <cite className="block font-bold">Utillisatrice1</cite>
            <blockquote className="mt-4 italic">Trop chouette !</blockquote>
          </div>
        </div>
      </div> */}
    </div>
  );
}
