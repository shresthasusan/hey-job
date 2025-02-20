import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import { connectMongoDB } from "./mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { type DefaultSession, type DefaultUser } from "next-auth";

// Extend the NextAuth User and Session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name: string;
      email: string;
      lastName: string;
      id: string;
      roles: {
        client?: boolean;
        freelancer?: boolean;
      };
    };
  }
  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    lastName: string;
    roles: {
      client?: boolean;
      freelancer?: boolean;
    };
  }
}

// Define the authOptions with proper TypeScript types
export const authOptions: NextAuthOptions = {
  providers: [
    // Google Authentication
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),

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

          // const emailVerified = user.emailVerified;
          // if (!emailVerified) {
          //   console.log("Email not verified for user:", email);
          //   return null;
          // }

          // Transform the Mongoose document into a plain JSON object
          const plainUser = {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            id: user.id,
            roles: user.roles,
          };

          console.log("User authorized:", plainUser);
          return plainUser;
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
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        await connectMongoDB();
        const existingUser = await User.findOne({ email: user.email });

        // Split name into firstName and lastName
        let [name, ...lastNameParts] = user.name.split(" ");
        let lastName = lastNameParts.join(" ") || ""; // Join the remaining parts as last name

        if (!existingUser) {
          // Create a new user if not found
          const newUser = await User.create({
            name,
            lastName,
            email: user.email,
            profilePicture: user.image,
            emailVerified: true,
            oauth: true,
          });
          user.id = newUser._id.toString();
          user.name = name;
          user.lastName = lastName;
          user.roles = newUser.roles;
        } else {
          // Use existing user data

          user.id = existingUser._id.toString();
          user.name = existingUser.name;
          user.lastName = existingUser.lastName;
          user.email = existingUser.email;
          user.roles = existingUser.roles;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.lastName = user.lastName;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          lastName: token.lastName as string,
          roles: token.roles as { client?: boolean; freelancer?: boolean },
        };
      }
      return session;
    },
  },
};
