"use client";

import styles from "./weekItem.module.scss";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Pagination, EffectFade, Mousewheel } from "swiper/modules";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProductWeek } from "@/app/api/product";
import { Product } from "@/app/types/types";
import { useState, useEffect, useRef } from "react";
import { getDiscount } from "@/app/utils/commonFunction";
import TimeCount from "@/app/components/TimeCount";
import Lottie from "react-lottie-player";
import noProduct from "@/app/components/noProduct.json";
import { PiTimerBold } from "react-icons/pi";
import { timerStore } from "@/app/store/product";

interface Props {
  checkDay: number;
}

export default function WeekItem({ checkDay }: Props) {
  const { data } = useQuery<Product[][]>({
    queryKey: ["weekList"],
    queryFn: () => getProductWeek(),
  });

  const [weekData, setWeekData] = useState<Product[]>();

  useEffect(() => {
    if (data) {
      const currentDayData = data[checkDay];
      const notOver = currentDayData.filter((item) => !item.over);
      const over = currentDayData.filter((item) => item.over);
      setWeekData([...notOver, ...over]);
    }
  }, [data, checkDay]);

  const paginationRef = useRef<HTMLDivElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (swiperInstance && paginationRef.current) {
      swiperInstance.params.pagination.el = paginationRef.current;
      swiperInstance.pagination.init(); // 수동으로 pagination 초기화
      swiperInstance.pagination.render();
      swiperInstance.pagination.update();
    }
  }, [swiperInstance]);

  const { timerOn } = timerStore();

  return (
    <>
      <div className={styles.container}>
        {weekData && weekData.length > 0 ? (
          <>
            <Swiper
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              loop={true}
              effect={"fade"}
              mousewheel={true}
              pagination={{
                el: paginationRef.current,
                clickable: true,
              }}
              modules={[EffectFade, Pagination, Mousewheel]}
              fadeEffect={{ crossFade: false }}
              loopAdditionalSlides={1}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {weekData.map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={`${styles.swiperItem} ${
                      index == activeIndex ? styles.active : ""
                    }`}
                  >
                    <Link href={`/products/${item.productId}`}>
                      {item.over && (
                        <>
                          <div className={styles.sold}></div>
                          <div className={styles.soldLogo}>SOLD OUT</div>
                        </>
                      )}
                      <div className={styles.backGroundLight}>
                        <div className={styles.backGroundColor}>
                          <div className={styles.timeAndstock}>
                            <div className={styles.eventTime}>
                              <div>
                                <PiTimerBold style={{ marginTop: "2px" }} />
                              </div>
                              {item.eventStartTime}:00 - {item.eventEndTime}:00
                            </div>
                            <div className={styles.stock}>
                              {item.over ? (
                                <>0개 남음</>
                              ) : (
                                <>{item.stock}개 한정</>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.priceArea}>
                              <div>{item.price.toLocaleString("ko-KR")}</div>
                              <div>
                                {getDiscount(
                                  item.price,
                                  item.discount
                                ).toLocaleString("ko-KR")}
                              </div>
                              <div>{item.discount}%</div>
                            </div>
                            {checkDay == 0 ? (
                              item.over ? (
                                <div className={styles.timeThree}>
                                  타임딜 종료
                                </div>
                              ) : timerOn ? (
                                <div className={styles.timeOne}>
                                  <TimeCount startTime={item.eventStartDate} />
                                </div>
                              ) : (
                                <div className={styles.timeFour}>
                                  🚨타임딜 진행중🚨
                                </div>
                              )
                            ) : (
                              <div className={styles.timeTwo}>
                                {`${item.eventStartTime}`.padStart(2, "0")}:00
                                OPEN
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={styles.imgContainer}>
                        <div className={styles.wrapper}>
                          <Image
                            src={item.thumbnailImage}
                            alt="상품썸네일"
                            fill
                            sizes="auto"
                            loading="lazy"
                          ></Image>

                          {/* <div className={styles.stock}>
                              {item.stock}개 남음
                            </div> */}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div ref={paginationRef} className={styles.paginationButton}></div>
          </>
        ) : (
          <div className={styles.noItem}>
            <div className={styles.noItemText}>NO</div>
            <div>
              <Lottie
                loop
                animationData={noProduct}
                play
                style={{ width: 400, height: 500 }}
              />
            </div>
            <div className={styles.noItemText}>ITEM</div>
            {/* <div className={styles.noItemText}>준비된 TimeDeal이 없어요</div> */}
          </div>
        )}
      </div>
    </>
  );
}
