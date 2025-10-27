"use client";

import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import cat from "@/app/_components/_lottie/cat.json";

export default function MaintenancePage() {
  const LottiePlayer = dynamic(() => import("react-lottie-player"), {
    ssr: false,
  });

  return (
    <div className={styles.maintenanceArea}>
      <div className={styles.title}>🛠️ 서비스 점검중입니다 🛠️</div>
      <div>
        <LottiePlayer
          className={styles.cat}
          loop
          animationData={cat}
          play
        ></LottiePlayer>
      </div>
      <div>보다 안정적인 서비스 이용을 위해</div>
      <div>헌재 DDIB을 점검 중 입니다</div>
      <div>점검 후 더욱 멋진 서비스로 찾아 뵙겠습니다.</div>
      <div></div>
      <div className={styles.fixTime}>
        점검시간 : 2025.10.28(화) 00:00 ~ 2025.10.28(화) 23:30
      </div>
      <div className={styles.ex}>
        ※ 작업 일정은 상황에 따라 변동 될 수 있습니다.
      </div>
    </div>
  );
}
