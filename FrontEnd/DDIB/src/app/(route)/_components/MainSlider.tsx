"use client";

import styles from "./mainSlider.module.scss";
import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "@/app/_types/types";
import TimeCount from "@/app/_components/TimeCount";
import { getDiscount } from "@/app/_utils/commonFunction";
import Link from "next/link";
import Image from "next/image";
import { PiTimerBold } from "react-icons/pi";
import ColorThief from "colorthief";
import tinycolor from "tinycolor2";
import fog from "../../../../public/images/fogg2.png";

type SlideshowItem = {
  id: number;
  imageUrl: string;
  title: string;
};

interface Props {
  todayList: Product[];
  onBg: (color: string) => void;
}

export default function MainSlider({ todayList, onBg }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const maxItems = todayList.length; // 슬라이드 아이템 수
  const sliderLeftRef = useRef<Slider | null>(null);
  const sliderRightRef = useRef<Slider | null>(null);
  const [colors, setColors] = useState<string>("");

  useEffect(() => {
    ImageWithColors(todayList[currentSlide].thumbnailImage);
  }, [currentSlide]);

  const ImageWithColors = (imageUrl: string) => {
    const img = document.createElement("img");
    img.crossOrigin = "Annoymous";
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const extractedColors = colorThief.getColor(img);
      const [r, g, b] = extractedColors;
      const color = `rgb(${r}, ${g}, ${b})`;
      const lightenColor = tinycolor(color).lighten(20).toString();
      const darkenColor = tinycolor(color).darken(20).toString();
      setColors(`rgb(${r}, ${g}, ${b})`);
      onBg(`rgb(${r}, ${g}, ${b})`);
      console.log("배경색" + color);
    };
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        sliderLeftRef.current?.slickPrev();
        sliderRightRef.current?.slickGoTo(2 - (currentSlide - 1));
      } else {
        sliderLeftRef.current?.slickNext();
        sliderRightRef.current?.slickGoTo(2 - (currentSlide + 1));
        if (currentSlide === maxItems - 1) {
          // currentSlide가 2일 때 아래로 스크롤이 발생하면, 화면을 100vh 아래로 이동
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }
      }
    };

    const sliderElement = document.querySelector(
      ".slideshow-left"
    ) as HTMLElement;
    const sliderRightElement = document.querySelector(
      ".slideshow-right"
    ) as HTMLElement;
    sliderElement?.addEventListener("wheel", handleWheel);
    sliderRightElement?.addEventListener("wheel", handleWheel);

    return () => {
      sliderElement?.removeEventListener("wheel", handleWheel);
      sliderRightElement?.removeEventListener("wheel", handleWheel);
    };
  }, [currentSlide, maxItems]);

  const settingsLeft = {
    arrows: false, // 화살표 숨기기
    dots: false, // 점 네비게이션 숨기기
    vertical: true,
    verticalSwiping: true,
    infinite: false,
    speed: 1000,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    beforeChange: (current: number, next: number) => {
      setCurrentSlide(next);
      sliderRightRef.current?.slickGoTo(maxItems - 1 - next);
    },
  };

  const settingsRight = {
    arrows: false, // 화살표 숨기기
    dots: false, // 점 네비게이션 숨기기
    vertical: true,
    swipe: false,
    infinite: false,
    speed: 950,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    beforeChange: (current: number, next: number) => {
      sliderLeftRef.current?.slickGoTo(maxItems - 1 - next);
    },
    initialSlide: maxItems - 1,
  };

  return (
    <div
      className={styles.container}
      style={{
        background: colors,
        //background: tinycolor(colors).darken(10).toString(),
        // background: `linear-gradient(300deg, ${tinycolor(colors)
        //   .lighten(20)
        //   .toString()}, ${colors}, ${tinycolor(colors).darken(20).toString()})`,
        // backgroundSize: "200% 200%",
      }}
    >
      <div className="slideshow-right">
        <Slider ref={sliderRightRef} {...settingsRight}>
          {todayList
            .map((item, index) => (
              <div className={styles.background} key={index}>
                <div className={styles.timer}>
                  <TimeCount startTime={item.eventStartDate} />
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.timedeal}>
                    <div>
                      <PiTimerBold />
                    </div>
                    <div> 타임딜가</div>
                  </div>
                  <div className={styles.priceArea}>
                    <div>{item.price.toLocaleString("ko-KR")}원</div>
                    <div>
                      {getDiscount(item.price, item.discount).toLocaleString(
                        "ko-KR"
                      )}
                      원
                    </div>
                  </div>
                  <div className={styles.stock}>{item.stock}개 남음</div>
                </div>
              </div>
            ))
            .reverse()}
        </Slider>
      </div>
      <div className="slideshow-left">
        <Slider ref={sliderLeftRef} {...settingsLeft}>
          {todayList.map((item, index) => (
            <div className={styles.background} key={index}>
              <div className={styles.eventTime}>
                <div>{item.eventStartTime}:00</div>
                <div>-</div>
                <div>{item.eventEndTime}:00</div>
              </div>
              <div className={styles.imageArea}>
                <Link href={`/products/${item.productId}`}>
                  <div className={styles.wrapper}>
                    <Image
                      src={item.thumbnailImage}
                      alt="썸네일"
                      fill
                      sizes=""
                    ></Image>
                  </div>
                  <div className={styles.hover}>
                    <div>Detail View ---&gt;</div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.discount}>{todayList[currentSlide].discount}%</div>
      <div className={styles.fogContainer}>
        <Image src={fog} alt="fog1.png" fill sizes=""></Image>
        <Image src={fog} alt="fog1.png" fill sizes=""></Image>
        <Image src={fog} alt="fog1.png" fill sizes=""></Image>
      </div>
    </div>
  );
}
