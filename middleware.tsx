export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/((?!login|signup|api/userExists|api/register).*)", // Exclude these routes from authentication
  ],
};