"use client";
import { useEffect } from "react";
import type { SetupWorkerApi } from "msw/browser";

export const MSWComponent = () => {
  useEffect(() => {
    console.log(
      "NEXT_PUBLIC_API_MOCKING:",
      process.env.NEXT_PUBLIC_API_MOCKING
    );

    if (typeof window !== "undefined") {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        import("@/mocks/browser")
          .then((module) => {
            const worker = module.default;
            worker.start({ onUnhandledRequest: "bypass" });
            console.log("msw is running");
          })
          .catch((err) => {
            console.error("mws failed", err);
          });
      }
    }
  }, []);

  return null;
};
