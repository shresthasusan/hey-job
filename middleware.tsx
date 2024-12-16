export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/((?!login|signup|api/userExists|api/register|api/auth|/public).*)", // Exclude these routes from authentication
  ],
};
