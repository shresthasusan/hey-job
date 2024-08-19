import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import path from "path";
import { NextApiHandler } from "next";
import User from "../../../../models/user"; // Assuming this is a TypeScript file or has a declaration file
import { authOptions } from "@/app/lib/auth";

// Type the handler properly for TypeScript
const handler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
