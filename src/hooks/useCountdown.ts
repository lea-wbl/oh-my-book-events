import { useEffect, useState, useMemo } from "react";

export function useCountdown(): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const [nowTime, setNowTime] = useState(Date.now());
  const [endTime, setEndTime] = useState<number>();

  useEffect(() => {
    const savedEndTime = localStorage.getItem("end-time");
    if (savedEndTime) {
      setEndTime(Number(savedEndTime));
    } else {
      const fourteenDays = 14 * 24 * 60 * 60;
      const newEndTime = Math.floor(Date.now() / 1000) + fourteenDays;
      setEndTime(newEndTime);
      localStorage.setItem("end-time", newEndTime.toString());
    }
  }, []);

  useEffect(() => {
    if (!endTime) return;
    const interval = setInterval(() => {
      setNowTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const timeValues = useMemo(() => {
    if (!endTime) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const timeRemaining = endTime - Math.floor(nowTime / 1000);
    const days = Math.floor(timeRemaining / (24 * 60 * 60));
    const hours = Math.floor(timeRemaining / (60 * 60)) % 24;
    const minutes = Math.floor(timeRemaining / 60) % 60;
    const seconds = timeRemaining % 60;

    return { days, hours, minutes, seconds };
  }, [nowTime, endTime]);

  return timeValues;
}
