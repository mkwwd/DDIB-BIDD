// src/api/axios.ts
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const waitForMSW = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if ((window as any).mswReady) {
          clearInterval(interval);
          resolve();
        }
      }, 10);
    });
  }
};

const retryRequest = async (
  fn: () => Promise<any>,
  retries = 3,
  delay = 500
) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

const PublicAxiosApi = () => {
  const instance = axios.create({ baseURL: BASE_URL });
  instance.defaults.headers.put["Content-Type"] = "application/json";

  instance.interceptors.request.use(async (config) => {
    await waitForMSW();
    return config;
  });

  // response interceptor로 자동 재시도
  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      return retryRequest(() => instance.request(error.config));
    }
  );

  return instance;
};

const ClientAxiosApi = () => {
  const instance = axios.create({ baseURL: BASE_URL });
  const token = Cookies.get("jwt");
  instance.defaults.headers.common["Authorization"] = token;
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.delete["Content-Type"] = "application/json";

  instance.interceptors.request.use(async (config) => {
    await waitForMSW();
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      return retryRequest(() => instance.request(error.config));
    }
  );

  return instance;
};

export { PublicAxiosApi, ClientAxiosApi };
