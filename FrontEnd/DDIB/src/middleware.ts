import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE === "true";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    MAINTENANCE_MODE &&
    !request.nextUrl.pathname.startsWith("/maintenance")
  ) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  if (pathname.startsWith("/order") && !request.cookies.has("state")) {
    return NextResponse.redirect(new URL("/products/wait", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
