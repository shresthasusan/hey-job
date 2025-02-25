import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { authenticateToken } from "./app/lib/authorizationMiddleware";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = req.nextUrl.pathname;

  // Define routes
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/api/register";

  // Check if we can create a seperate middleware for the server api requests
  if (pathname.startsWith("/api/") && !isAuthPage) {
    const authTokenMiddleware = await authenticateToken(req);
    // console.log('authResult:', authTokenMiddleware)

    if (!authTokenMiddleware?.user) {
      return NextResponse.json(
        { error: authTokenMiddleware?.error || "Authentication required" },
        { status: 401 }
      );
    }
    // Clone the request and add the user data as a custom header
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user", JSON.stringify(authTokenMiddleware.user));

    // console.log("Set x-user header:", authTokenMiddleware.user);


    // Pass the modified headers to the next handler
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  }



  // https://nextjs.org/docs/app/building-your-application/authentication#creating-a-data-access-layer-dal
  // better way for authorization rather than using the middleware
  // check this and remove it all from here

  const isAdminAuthPage =
    pathname === "/admin/login" || pathname === "/api/admin/register";

  const isAdminPanel = pathname.startsWith("/admin") && !isAdminAuthPage;

  // 1. Redirect authenticated users trying to access login or signup to home
  if ((isAuthPage || isAdminAuthPage) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. Redirect unauthenticated users trying to access user-protected routes to login
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

  // 3. Redirect unauthenticated users trying to access admin panel to admin login
  if (isAdminPanel && (!token || token.role !== "admin")) {
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
  if (token && token.role === "admin" && isUserPage) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // // 5. Handle API routes
  if (pathname.startsWith("/api/admin") && (!token || token.role !== "admin")) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 6. If none of the above conditions are met, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)"],
};
