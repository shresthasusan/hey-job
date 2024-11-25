export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/((?!login|signup|api/userExists|api/register|api/uploadthing|api/auth).*)", // Exclude these routes from authentication
  ],
};
