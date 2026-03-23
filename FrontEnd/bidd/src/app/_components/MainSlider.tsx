"use client";

import styles from "./mainSlider.module.scss";
import React, { useState, useRef, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./Clock";
import TimeUnit from "./TimeUnit";
import CardSection from "./CardSection";

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

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeData, setTimeData] = useState<TimeDeg>(getTimeData);

  useEffect(() => {

    let frameId : number;

    const updateClock = () => {
      const newData = getTimeData();
      setTimeData(newData);
      frameId = requestAnimationFrame(updateClock);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const newIdx = Math.min(5, Math.floor(scrollY/vh));
      setCurrentIndex(newIdx);

      if(newIdx ===1 || newIdx === 2){
        const progress = (scrollY - vh) / vh;
        if(progress > 0.5){
          setIsFlipped((prev) => {
            return true;
          });
        }else{
          setIsFlipped(false);
        }
      }
    };

    updateClock();
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    }
  },[])


  const getSectionClass = (idx:number) : string => {
    return `${styles.sectionWrapper} ${currentIndex === idx ? styles.activeSection : ''}`;
  }


  return (
    <div className={styles.container}>
      <section className={`${getSectionClass(0)} ${styles.sectionOne}`}>
        {/* <div className={styles.bigTitle}>타임딜의 성공 &#039;BBID&#039;로 대여하세요</div> */}
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
      <section className={`${getSectionClass(1)} ${styles.sectionTwo} ${currentIndex === 2 ? styles.activeSection : ''}`}>
        <div className={styles.topArea}>
          <div className={`${styles.secTitle} ${isFlipped ? styles.isFlipped : ''}`}>How It Works</div>
          <div className={styles.flipContainer}>
            <div className={`${styles.flipCard} ${isFlipped ? styles.isFlipped : ''}`}>
              <div className={`${styles.side} ${styles.front}`}>BIDD</div>
              <div className={`${styles.side} ${styles.back}`}>DDIB</div>
            </div>
          </div>
        </div>
        <div className={styles.bottomArea}>
            {!isFlipped ? ( 
              <CardSection></CardSection>
              ): (
              <>
              </>
            )}
        </div>
      </section>
      <section className={`${getSectionClass(3)} ${styles.sectionThree}`}></section>
      <section className={`${getSectionClass(4)} ${styles.sectionThree}`}></section>
      <section className={`${getSectionClass(5)} ${styles.sectionThree}`}></section>
    </div>
  );
};

export default MainSlider;
