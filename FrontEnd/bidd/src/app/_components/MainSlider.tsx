"use client";

import styles from "./mainSlider.module.scss";
import React, { useState, useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./Clock";
import TimeUnit from "./TimeUnit";

interface TimeDeg{
  hourDeg : number;
  minDeg : number;
  secDeg : number;
  hourLeft : string;
  minLeft : string;
  secLeft : string;
}

const getTimeData = () => {
  const now = new Date();
  
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ms = now.getMilliseconds();
  
  const hDeg = ((h%12) + m / 60) * 30;
  const mDeg = (m + s/60) * 6;
  const sDeg = (s + ms /1000) * 6;

  const target = new Date();

  if(h < 12){
    target.setHours(12, 0, 0 ,0);
  }else{
    target.setHours(24, 0, 0, 0);
  }

  const diff = target.getTime() - now.getTime();
  
  const rHour = Math.floor((diff / (1000*60*60)) % 24).toString().padStart(2, '0');
  const rMin = Math.floor((diff / (1000*60)) % 60).toString().padStart(2, '0');
  const rSec = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
  
  return{
    hourDeg : hDeg,
    minDeg : mDeg,
    secDeg : sDeg,
    hourLeft : rHour,
    minLeft : rMin,
    secLeft : rSec,
  };
}

const MainSlider: React.FC = () => {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeData, setTimeData] = useState<TimeDeg>(getTimeData);

  useEffect(() => {

    let frameId : number;

    const updateClock = () => {
      const newData = getTimeData();
      setTimeData(newData);
      frameId = requestAnimationFrame(updateClock);
    };

    updateClock();

    return () => {
      cancelAnimationFrame(frameId);
    }
  },[])

  const getSectionClass = (idx:number) : string => {
    return `${styles.sectionWrapper} ${currentIndex === idx ? styles.activeSection : ''}`;
  }


  return (
    <div className={styles.container}>
      <section className={`${getSectionClass(0)} ${styles.sectionOne}`}>
        <div className={styles.bigTitle}>타임딜의 성공 &#039;BBID&#039;로 대여하세요</div>
        <Clock hourDeg={timeData.hourDeg} minDeg={timeData.minDeg} secDeg={timeData.secDeg}></Clock>
        <div className={styles.timer}>
          <div className={styles.dealTitle}>TIME DEAL LIVE</div>
          <div className={styles.timerDisplay}>
            <TimeUnit value={timeData.hourLeft} label="Hours"></TimeUnit>
            <div className={styles.separator}>:</div>
            <TimeUnit value={timeData.minLeft} label="Minutes"></TimeUnit>
            <div className={styles.separator}>:</div>
            <TimeUnit value={timeData.secLeft} label="Seconds"></TimeUnit>
          </div>
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
