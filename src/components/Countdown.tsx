"use client";

import React, { useEffect, useState } from "react";
import { addLeadingZero } from "@/app/utils/tools";

interface TimeLeft {
  jours: number;
  heures: number;
  minutes: number;
  secondes: number;
}

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference > 0) {
      return {
        jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        secondes: Math.floor((difference / 1000) % 60),
      };
    }

    return null; // Event has passed
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [targetDate]);

  if (!timeLeft) {
    return <div>The event has started or passed!</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-6 text-center">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div className="relative" key={key}>
          <div className="perforations-mobile md:perforations">
            <div className="paper-ring"></div>
          </div>
          <div className="perforations-mobile md:perforations">
            <div className="paper-ring"></div>
          </div>
          <div className="countdown font-mono bg-red-200 rounded-md grid content-center px-2 pt-6 pb-3 shadow-md mb-2">
            <span
              className="countdown font-mono text-5xl md:text-6xl w-full"
              style={
                {
                  "--value": `${addLeadingZero(value)}`,
                } as React.CSSProperties
              }
            ></span>
          </div>
          <span className="text-sm md:text-md tracking-widest">
            {key.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
