"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./mainArea.module.scss";
import TodayItems from "./TodayItems";
import { useQuery } from "@tanstack/react-query";
import { getTodayList } from "@/app/_api/product";
import { TodayList } from "@/app/_types/types";
import MainSlider from "@/app/(route)/_components/MainSlider";
import { useNavStore } from "@/app/_store/navStore";

export default function MainArea() {
  const [bgColor, setBgColor] = useState<string>("");
  const navRect = useNavStore((state) => state.navRect);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        const isInside =
          navRect &&
          e.clientX >= navRect.left &&
          e.clientX <= navRect.right &&
          e.clientY >= navRect.top &&
          e.clientY <= navRect.bottom;

        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.display = isInside ? "none" : "block";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [navRect]);

  const { data } = useQuery<TodayList>({
    queryKey: ["todayList"],
    queryFn: () => getTodayList(),
  });

  console.log(data);

  const handleBg = (color: string) => {
    setBgColor(color);
  };

  return (
    <div className={styles.main}>
      {data && (
        <>
          {data.todayNotOverProducts.length != 0 && (
            <MainSlider todayList={data.todayNotOverProducts} onBg={handleBg} />
          )}
          <TodayItems todayList={data.todayProducts} bgColor={bgColor} />
        </>
      )}
      <div ref={cursorRef} className={styles.scrollCursor}>
        <div>Scroll</div>
      </div>
    </div>
  );
}
