"use client";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    const startMSW = async () => {
      if (
        typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
      ) {
        try {
          const msModule = await import("@/mocks/browser");
          const worker = msModule.default;
          await worker.start({ onUnhandledRequest: "bypass" });
          console.log(
            "NEXT_PUBLIC_API_MOCKING" +
              " " +
              process.env.NEXT_PUBLIC_API_MOKCING
          );
          console.log("MSW is running");
          (window as any).mswReady = true;
        } catch (err) {
          console.error("MSW failed", err);
          (window as any).mswReady = true; // 실패해도 요청 막지 않음
        }
      } else {
        (window as any).mswReady = true; // mocking 안 켜져도 true
      }
    };

    startMSW();
  }, []);

  return null;
};
