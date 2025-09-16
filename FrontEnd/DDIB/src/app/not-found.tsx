"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import Lottie from "react-lottie-player";
import notfound from "./_components/_lottie/notfound.json";

const NotFound = () => {
  const LottiePlayer = dynamic(() => import("react-lottie-player"), {
    ssr: false,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10vw",
      }}
    >
      <div style={{ fontSize: "2vw", fontWeight: "bold" }}>
        존재하지 않는 페이지 입니다.
      </div>
      <div>
        <LottiePlayer
          loop
          animationData={notfound}
          play
          style={{ width: 400, height: 400 }}
        />
      </div>
      <Link href="/" style={{ fontSize: "2vw", fontWeight: "bold" }}>
        DDIB으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
