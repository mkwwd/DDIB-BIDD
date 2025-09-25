"use client";

import ProductItem from "@/app/_components/ProductItem";
import styles from "./category.module.scss";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/app/_types/types";
import { getProductSearch } from "@/app/_api/product";
import { useEffect } from "react";
import Lottie from "react-lottie-player";
import noProduct2 from "@/app/_components/_lottie/noProduct2.json";
import dynamic from "next/dynamic";

interface Props {
  category: string;
}

export default function Category({ category }: Props) {
  const LottiePlayer = dynamic(() => import("react-lottie-player"), {
    ssr: false,
  });

  const { data } = useQuery<Product[]>({
    queryKey: ["category", category],
    queryFn: () => getProductSearch("", category, "false"),
  });

  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <div>
      {data && data.length > 0 ? (
        <div className={styles.itemContainer}>
          <div className={styles.itemArea}>
            {data.map((item, index) => (
              <Link
                href={`/products/${item.productId}`}
                className={styles.item}
                key={index}
                onClick={(e) => {
                  if (item.over) {
                    e.preventDefault();
                    alert("종료된 타임딜 입니다.");
                  }
                }}
              >
                <ProductItem
                  thumbnailImage={item.thumbnailImage[0].imageUrl}
                  companyName={item.companyName}
                  name={item.name}
                  eventStartDate={item.eventStartDate}
                  eventStartTime={item.eventStartTime}
                  eventEndTime={item.eventEndTime}
                  price={item.price}
                  totalStock={item.totalStock}
                  stock={item.stock}
                  discount={item.discount}
                  over={item.over}
                />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.noItem}>
          {/* <div className={styles.noItemText}>NO</div> */}
          <LottiePlayer
            loop
            animationData={noProduct2}
            play
            className={styles.noItemImage}
          />
          {/* <div className={styles.noItemText}>ITEM</div> */}
          <div className={styles.noItemText}>
            <div>&nbsp;&nbsp;NO&nbsp;</div> <div>&nbsp;&nbsp;ITEM</div>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
