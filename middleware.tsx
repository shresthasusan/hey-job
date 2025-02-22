import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = req.nextUrl.pathname;

  // Define routes
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/api/register";

  const isAdminAuthPage =
    pathname === "/admin/login" || pathname === "/api/admin/register";

  const isAdminPanel = pathname.startsWith("/admin") && !isAdminAuthPage;

  // 1. Redirect authenticated users trying to access login/signup/admin-login pages
  if ((isAuthPage || isAdminAuthPage) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. Redirect unauthenticated users trying to access user-protected routes
  if (!token && !isAuthPage && !isAdminAuthPage) {
    if (pathname.startsWith("/api")) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(req.url)}`, req.url)
    );
  }

  // 3. Redirect unauthenticated users trying to access the admin panel
  if (isAdminPanel && (!token || token?.role !== "admin")) {
    return NextResponse.redirect(
      new URL(
        `/admin/login?callbackUrl=${encodeURIComponent(req.url)}`,
        req.url
      )
    );
  }

  const isUserPage =
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !isAuthPage &&
    !isAdminAuthPage;

  // 4. Prevent admin users from accessing regular user pages
  if (token?.role === "admin" && isUserPage) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 5. Handle API routes for admin authentication
  if (
    pathname.startsWith("/api/admin") &&
    (!token || token?.role !== "admin")
  ) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 6. Prevent logged-in admins from accessing /admin/login
  if (isAdminAuthPage && token?.role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 7. If none of the above conditions are met, proceed with the request
  return NextResponse.next();
}

// Middleware only runs on protected routes, improving performance
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/protected/:path*",
  ],
};
