"use client";

import { useState, useEffect } from "react";
import { timerStore } from "@/app/_store/product";

interface Props {
  id: number;
  startTime: string;
}

export default function TimeCount({ startTime, id }: Props) {
  const [targetTime] = useState<Date>(new Date(startTime));
  const [timeLeft, setTimeLeft] = useState<number>(
    targetTime.getTime() - new Date().getTime()
  );

  const { setTimerOn } = timerStore();

  useEffect(() => {
    console.log(startTime);
    console.log(targetTime.getTime());
    console.log(new Date().getTime());

    setTimerOn(id, true);
    const timerID = setInterval(() => {
      const newTimeLeft = targetTime.getTime() - new Date().getTime();

      if (newTimeLeft <= 1) {
        setTimeLeft(0);
        setTimerOn(id, false);
        clearInterval(timerID);
      } else {
        setTimeLeft(newTimeLeft);
        console.log(`[${id}] 작동중`);
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
