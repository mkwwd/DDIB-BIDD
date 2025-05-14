"use client";

import styles from "./productItem.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSolidBusiness } from "react-icons/bi";
import { getDiscount } from "../utils/commonFunction";

interface Props {
  thumbnailImage: string;
  companyName: string;
  name: string;
  eventStartDate: string;
  eventStartTime: string;
  eventEndTime: string;
  price: number;
  totalStock: number;
  stock: number;
  discount: number;
  over: boolean;
}

export default function ProductItem({
  thumbnailImage,
  companyName,
  name,
  eventStartDate,
  eventStartTime,
  eventEndTime,
  price,
  totalStock,
  stock,
  discount,
  over,
}: Props) {
  const date = (num: String) => {
    if (num.substring(0, 1) == "0") {
      return num.charAt(1);
    } else {
      return num;
    }
  };

  return (
    <div className={styles.containers}>
      <div className={styles.wrapper}>
        <Image src={thumbnailImage} alt="상품썸네일" fill sizes="auto"></Image>
        {over ? (
          <>
            <div className={styles.sold}></div>
            <div className={styles.soldLogo}>SOLD</div>
          </>
        ) : (
          <>
            <div className={styles.reserve}></div>
            <div className={styles.reserveLogo}>
              {date(eventStartDate.substring(5, 7))}/
              {date(eventStartDate.substring(8, 10))} {eventStartTime}시 오픈
            </div>
          </>
        )}
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.priceArea}>
        <div>{price.toLocaleString("ko-KR")}</div>
        <div>{getDiscount(price, discount).toLocaleString("ko-KR")}</div>
        <div>{discount}%</div>
      </div>
    </div>
  );
}
