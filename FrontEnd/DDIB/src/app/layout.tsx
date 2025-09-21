import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { MSWComponent } from "./_components/MSWComponent";
import { SessionProvider } from "next-auth/react";
import { NextAuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DDIB",
  description: "DDIB",
  icons: {
    icon: "/ddib.png",
    shortcut: "/ddib.png",
    apple: "/ddib.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MSWComponent />
      <body>
        <NextAuthProvider> {children}</NextAuthProvider>
      </body>
    </html>
  );
}
