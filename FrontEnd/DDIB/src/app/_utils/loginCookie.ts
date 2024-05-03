import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const removeCookie = (key: string) => {
  return cookies.remove(key);
};
