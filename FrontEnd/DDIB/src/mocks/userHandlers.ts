import { http, HttpResponse } from "msw";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;
export const userHandlers = [
  http.post(`${BASE_URL}/auth/kakao`, () => {
    return HttpResponse.json({
      userPk: 1,
      name: "조자영",
      email: "mkwhwkdud@naver.com",
    });
  }),
];
