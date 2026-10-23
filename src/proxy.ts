import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;
  const pathname = request.nextUrl.pathname;

  // Protected routes list
  const protectedRoutes = ["/profile", "/category","/product"];

  // যদি protected route হয় আর user না থাকে → signin এ redirect
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/category/:path*", "/product/:path*"], 
};

