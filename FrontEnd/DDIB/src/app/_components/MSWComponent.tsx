"use client";
import { useEffect } from "react";
import type { SetupWorkerApi } from "msw/browser";

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        import("@/_mocks/browser").then((module) => {
          const worker = module.default;
          worker.start();
        });
      }
    }
  }, []);

  return null;
};
