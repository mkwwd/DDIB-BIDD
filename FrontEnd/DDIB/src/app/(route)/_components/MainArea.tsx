"use client";

import { useState, useEffect } from "react";
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOnNav, setIsOnNav] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (navRect) {
        const isInside =
          e.clientX >= navRect.left &&
          e.clientX <= navRect.right &&
          e.clientY >= navRect.top &&
          e.clientY <= navRect.bottom;

        setIsOnNav(isInside);
        if (!isInside) {
          setPosition({ x: e.clientX, y: e.clientY });
        }
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
      <div
        className={styles.scrollCursor}
        style={{
          left: position.x,
          top: position.y,
          display: isOnNav ? "none" : "block",
        }}
      >
        <div> Scroll</div>
      </div>
    </div>
  );
}
