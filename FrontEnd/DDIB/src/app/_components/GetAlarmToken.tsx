"use client";
import { useEffect } from "react";
import "@/firebase-messaging-sw";
import Cookies from "js-cookie";

export default function GetAlarmToken() {
  useEffect(() => {
    // 쿠키가 있는지 확인
    if (Cookies.get("Authorization")) {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("../../../public/firebase-messaging-sw.js")
          .then((registration) => {
            console.log("Service Worker 등록 성공:", registration);
          })
          .catch((err) => {
            console.log("Service Worker 등록 실패:", err);
          });
      }
    }
  }, []); // 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때만 실행

  return null;
}
