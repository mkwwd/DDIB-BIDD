"use client";

import styles from "./mainSlider.module.scss";
import React, { useState, useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./Clock";

interface TimeDeg{
  hourDeg : number;
  minDeg : number;
}

const MainSlider: React.FC = () => {

  const [timeDeg, setTimeDeg] = useState<TimeDeg>({hourDeg : 0, minDeg : 0});

  useEffect(() => {

    const timeInterval = setInterval(() => {

      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
  
      setTimeDeg({
        hourDeg : (hours * 30) + (minutes * 0.5),
        minDeg : (minutes * 6) + (seconds * 0.1),
      });

      console.log(timeDeg)
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    }
  })


  return (
    <div className={styles.container}>
      <section className={styles.sectionOne}>
        <Clock hourDeg={timeDeg.hourDeg} minDeg={timeDeg.minDeg}></Clock>
        <div className={styles.timer}>
          <div></div>
          <div></div>
        </div>
      </section>
      <section className={styles.sectionTwo}></section>
      <section className={styles.sectionThree}></section>
      <section className={styles.sectionFour}></section>
      <section className={styles.sectionFive}></section>
    </div>
  );
};

export default MainSlider;
