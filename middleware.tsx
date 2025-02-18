import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = req.nextUrl.pathname;
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // 🚀 If the user is authenticated and tries to access login/signup, redirect to home
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🚀 If the user is not authenticated and tries to access a protected route, redirect to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)"],
};
