"use client";

import { useState, useEffect } from "react";
import { timerStore } from "@/app/store/product";

interface Props {
  startTime: string;
}

export default function TimeCount({ startTime }: Props) {
  const [targetTime] = useState<Date>(new Date(startTime));
  const [timeLeft, setTimeLeft] = useState<number>(
    targetTime.getTime() - new Date().getTime()
  );

  const { setTimerOn } = timerStore();

  useEffect(() => {
    console.log(startTime);
    console.log(targetTime.getTime());
    console.log(new Date().getTime());
    const timerID = setInterval(() => {
      const newTimeLeft = targetTime.getTime() - new Date().getTime();

      if (newTimeLeft <= 0) {
        setTimeLeft(0);
        setTimerOn(false);
        clearInterval(timerID);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timerID);
  }, [targetTime]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <>
      {/* <span>{start}</span> */}
      {/* <div>{endTime}</div> */}
      <div>
        {days <= 0 ? "" : `${days}:`}
        {hours < 0 ? "00" : hours < 10 ? `0${hours}` : `${hours}`}:
        {minutes < 0 ? "00" : minutes < 10 ? `0${minutes}` : `${minutes}`}:
        {seconds < 0 ? "00" : seconds < 10 ? `0${seconds}` : `${seconds}`}
      </div>
    </>
  );
}
