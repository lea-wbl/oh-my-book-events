import React from "react";
import Image from "next/image";

const Polaroids = ({
  images,
  hasTitleAbove = false,
  fromUCare = false,
}: {
  images: string[];
  hasTitleAbove?: boolean;
  fromUCare?: boolean;
}) => {
  return (
    <div
      className={`h-full hidden md:flex items-center ${
        hasTitleAbove ? "mt-8" : "mt-[3%]"
      }`}
    >
      {/* POLAROID 1 */}
      <div
        className={`w-1/2 h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white z-0 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-left ease-in relative transform ${
          hasTitleAbove
            ? "translate-x-12 rotate-6"
            : "translate-x-[10%] translate-y-[20%] -rotate-6"
        }`}
      >
        <div className="bg-gray-300 w-full min-w-52 2xl:min-w-64 aspect-square">
          <Image
            aria-hidden
            src={fromUCare ? `https://ucarecdn.com/${images[0]}/` : images[0]}
            alt="File icon"
            fill
            className="shadow object-cover"
          />
        </div>
      </div>
      {/* POLAROID 2 */}
      <div
        className={`w-1/2 h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white z-10 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 ease-in relative transform ${
          hasTitleAbove
            ? "translate-y-12 -rotate-2 origin-center"
            : "-translate-y-1/4 -translate-x-[20%] rotate-3 origin-top"
        }`}
      >
        <div className="bg-gray-300 w-full min-w-52 2xl:min-w-64 aspect-square">
          <Image
            aria-hidden
            src={fromUCare ? `https://ucarecdn.com/${images[1]}/` : images[1]}
            alt="File icon"
            fill
            className="shadow object-cover"
          />
        </div>
      </div>
      {/* POLAROID 3 */}
      <div
        className={`w-1/2 h-fit border-x-[20px] border-t-[20px] border-b-[75px] border-white z-20 rounded shadow-lg hover:z-30 hover:scale-150 transition-all duration-300 origin-right ease-in relative transform ${
          hasTitleAbove
            ? "-translate-x-12 rotate-[4deg]"
            : "-translate-x-1/2 translate-y-1/4 rotate-12"
        }`}
      >
        <div className="bg-gray-300 w-full min-w-52 2xl:min-w-64 aspect-square">
          <Image
            aria-hidden
            src={fromUCare ? `https://ucarecdn.com/${images[2]}/` : images[2]}
            alt="File icon"
            fill
            className="shadow object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Polaroids;
