"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductSearch } from "@/app/api/product";
import { Product } from "@/app/types/types";
import Link from "next/link";
import ProductItem from "@/app/components/ProductItem";
import styles from "./searchResult.module.scss";

interface Props {
  keyword: string;
  category: string;
  over: string;
}

export default function SearchResult({ keyword, category, over }: Props) {
  const { data } = useQuery<Product[]>({
    queryKey: ["category", keyword, "", over],
    queryFn: () => getProductSearch(keyword, "", over),
  });

  return (
    <div className={styles.itemArea}>
      {data && (
        <>
          {data
            .filter((data) => {
              if (category != "All") {
                return data.category == category;
              }
              return true;
            })
            .map((item, index) => (
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
        </>
      )}
    </div>
  );
}
