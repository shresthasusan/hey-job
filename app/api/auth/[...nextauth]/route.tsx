import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth";

// Type the handler properly for TypeScript
export const config = {
  runtime: "nodejs", // Explicitly use Node.js runtime
};

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import { NextApiHandler, NextApiResponse, NextApiRequest } from "next";
// import { authOptions } from "@/app/lib/auth";
// import { NextRequest } from "next/server";

// // Type the handler properly for TypeScript
// const handler = (req: NextApiRequest, res: NextApiResponse) =>
//   NextAuth(req, res, authOptions);

// // Export the handler for GET and POST requests
// export { handler as GET, handler as POST };

// import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connectMongoDB } from "../../../lib/mongodb";
// import bcrypt from "bcryptjs";
// import path from "path";
// import { NextApiHandler } from "next";
// import User from "../../../../models/user"; // Assuming this is a TypeScript file or has a declaration file
// import { authOptions } from "@/app/lib/auth";

// // Type the handler properly for TypeScript
// const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

// // Export the handler for GET and POST requests
// export { handler as GET, handler as POST, authOptions };
