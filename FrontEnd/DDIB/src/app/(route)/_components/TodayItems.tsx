"use client";

import styles from "./todayItem.module.scss";
import { Product } from "@/app/types/types";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Link from "next/link";
import Image from "next/image";
import { getDiscount } from "@/app/utils/commonFunction";
import fog from "../../../../public/images/fogg2.png";

interface Props {
  todayList: Product[];
  bgColor: string;
}

export default function TodayItems({ todayList, bgColor }: Props) {
  const [items, setItems] = useState(todayList);

  useEffect(() => {
    if (items) {
      const currentDayData = items;
      const notOver = currentDayData.filter((item) => !item.over);
      const over = currentDayData.filter((item) => item.over);
      setItems([...notOver, ...over]);
    }
  }, []);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        // deltaY 값이 음수면 사용자가 위로 스크롤
        window.scrollTo({
          top: window.scrollY - window.innerHeight, // 현재 스크롤 위치에서 브라우저 뷰포트 높이만큼 빼기
          behavior: "smooth", // 부드러운 스크롤 동작
        });
      }
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("wheel", handleScroll);

    // 컴포넌트 언마운트시 리스너 제거
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log(bgColor + "입니다.");
  }, [bgColor]);

  return (
    <div
      className={styles.main}
      style={{
        background: bgColor,
      }}
    >
      <div className={styles.title}>Today&#039;s deal</div>
      <div className={styles.area}>
        <Swiper
          initialSlide={0}
          modules={[A11y, Autoplay, EffectCoverflow]}
          effect="coverflow"
          slidesPerView={3}
          //autoplay={{ delay: 2000, disableOnInteraction: false }}
          autoplay={false}
          centeredSlides={true}
          slideToClickedSlide={true}
          loop={true}
          coverflowEffect={{
            rotate: 30,
            depth: 50,
            slideShadows: false,
          }}
          slideActiveClass={styles.active}
        >
          {items.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Link href={`/products/${item.productId}`}>
                  <div className={styles.container}>
                    <div className={styles.wrapper}>
                      <div className={styles.time}>
                        {`${item.eventStartTime}`.padStart(2, "0")}:00
                      </div>
                      <Image
                        src={item.thumbnailImage}
                        alt="상품썸네일"
                        fill
                        sizes="auto"
                      ></Image>
                      {item.over ? (
                        <>
                          <div className={styles.sold}></div>
                          <div className={styles.soldLogo}>SOLD OUT</div>
                        </>
                      ) : (
                        <>
                          <div className={styles.reserve}></div>
                          <div className={styles.reserveLogo}>
                            {item.eventStartTime}시 오픈
                          </div>
                        </>
                      )}
                    </div>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.priceArea}>
                      <div>{item.price.toLocaleString("ko-KR")}원</div>
                      <div>
                        {getDiscount(item.price, item.discount).toLocaleString(
                          "ko-KR"
                        )}
                        원
                      </div>
                      <div>{item.discount}%</div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className={styles.fogContainer}>
        <Image src={fog} alt="fog1.png" fill sizes=""></Image>
        <Image src={fog} alt="fog1.png" fill sizes=""></Image>
        <Image src={fog} alt="fog1.png" fill sizes=""></Image>
      </div>
    </div>
  );
}
