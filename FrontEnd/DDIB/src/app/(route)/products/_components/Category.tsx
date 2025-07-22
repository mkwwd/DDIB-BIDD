"use client";

import ProductItem from "@/app/components/ProductItem";
import styles from "./category.module.scss";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/app/types/types";
import { getProductSearch } from "@/app/api/product";
import { useEffect } from "react";
import Lottie from "react-lottie-player";
import noProduct2 from "@/app/components/noProduct2.json";

interface Props {
  category: string;
}

export default function Category({ category }: Props) {
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
        <>
          <div className={styles.itemArea}>
            {data.map((item, index) => (
              <Link
                href={`/products/${item.productId}`}
                className={styles.item}
                key={index}
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
        </>
      ) : (
        <div className={styles.noItem}>
          {/* <div className={styles.noItemText}>NO</div> */}
          <div>
            <Lottie
              loop
              animationData={noProduct2}
              play
              style={{ width: 600, height: 450 }}
            />
          </div>
          {/* <div className={styles.noItemText}>ITEM</div> */}
          <div className={styles.noItemText}>
            <div>&nbsp;&nbsp;NO&nbsp;&nbsp;</div> <div>ITEM</div>{" "}
          </div>
        </div>
      )}
    </div>
  );
}
