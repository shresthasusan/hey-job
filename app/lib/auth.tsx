import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import path from "path";
import { connectMongoDB } from "./mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// console.log("Current directory:", __dirname);
// console.log(
//   "Resolved path:",
//   path.resolve(__dirname, "../../../../models/user")
// );

// if (!User) {
//   console.error("User model is not defined");
// }

interface User {
  name: string;
  email: string;
  lastname: string;
  password: string;
}

// Define the authOptions with proper TypeScript types
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            console.log("User not found:", email);
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            console.log("Password mismatch for user:", email);
            return null;
          }

          console.log("User authorized:", user);
          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          name: token.name as string,
          email: token.email as string,
          lastName: token.lastName as string,
        };
      }
      return session;
    },
  },
};
