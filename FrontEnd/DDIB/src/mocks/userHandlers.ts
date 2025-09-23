import { http, HttpResponse } from "msw";
export const userHandlers = [
  http.post("/auth/kakao", () => {
    return HttpResponse.json({
      userPk: 1,
      name: "조자영",
      email: "mkwhwkdud@naver.com",
    });
  }),
];
