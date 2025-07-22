import { PublicAxiosApi } from "../utils/commons";
import { AuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

const api = PublicAxiosApi();

export const authOptions: AuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        const kakaoAccessToken = account.access_token!;

        try {
          const res = await api.post(`/auth/kakao`, {
            accessToken: kakaoAccessToken,
          });

          const user = res.data;

          token.id = user.userPk;
          token.email = user.email;
          token.name = user.name;
        } catch (err) {
          console.error("요청 실패", err);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.fcm = true;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
