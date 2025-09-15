import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      accessToken: string;
      email: string;
      name?: string | null;
      image?: string | null;
      fcm?: boolean | null;
    };
  }

  interface User {
    id: string;
    accessToken: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    accessToken: string;
  }
}
