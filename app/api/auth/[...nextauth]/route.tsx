import NextAuth from "next-auth";
import { NextApiHandler } from "next";
import { authOptions } from "@/app/lib/auth";

// Type the handler properly for TypeScript
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };

//************************************ */
// import { NextApiRequest, NextApiResponse } from "next";
// import NextAuth from "next-auth";
// import { authOptions } from "@/app/lib/auth";

// // Type the handler properly for TypeScript
// export const config = {
//   runtime: "nodejs", // Explicitly use Node.js runtime
// };

// const handler = (req: NextApiRequest, res: NextApiResponse) =>
//   NextAuth(req, res, authOptions);

// // Export the handler for GET and POST requests
// export { handler as GET, handler as POST };
//************************************* */
// import NextAuth from "next-auth";
// import { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
// import { authOptions } from "@/app/lib/auth";
// import { NextRequest } from "next/server";

// // Type the handler properly for TypeScript
// const handler = (req: NextApiRequest, res: NextApiResponse) =>
//   NextAuth(req, res, authOptions);

// // Export the handler for GET and POST requests
// export { handler as GET, handler as POST };
//************************************ */
