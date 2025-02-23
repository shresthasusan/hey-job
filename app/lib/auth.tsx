import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import { connectMongoDB } from "./mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { type DefaultSession, type DefaultUser } from "next-auth";
import Admin from "@/models/admin";
import { SignJWT } from "jose";

// Extend the NextAuth User and Session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      name: string;
      email: string;
      lastName: string;
      id: string;
      role: string;
      profilePicture?: string;
      accessToken?: string;
    };
  }
  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    lastName: string;
    role: string;
    profilePicture?: string;
    accessToken?: string;
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
          let user = await User.findOne({ email });

          if (!user) {
            // Check if the user is an admin
            const admin = await Admin.findOne({ userName: email });
            if (admin) {
              const isPasswordValid = await bcrypt.compare(
                password,
                admin.password
              );
              if (isPasswordValid) {
                return {
                  name: admin.name,
                  lastName: admin.lastName,
                  email: admin.userName,
                  id: admin._id.toString(),
                  role: "admin",
                };
              }
            }
            console.log("User not found:", email);
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            console.log("Password mismatch for user:", email);
            return null;
          }

          const secretKey = new TextEncoder().encode(
            process.env.ACCCESS_TOKEN_SECRET_KEY
          );
          const accessToken = await new SignJWT({
            email,
            name: user.name,
            lastname: user.lastName,
            id: user._id.toString(),
          })
            .setProtectedHeader({ alg: "HS256" })
            .sign(secretKey);

          // all these can be attached to the accessToken
          // const plainUser = {
          //   name: user.name,
          //   email: user.email,
          //   lastName: user.lastName,
          //   id: user._id.toString(),
          //   role: "user",
          //   profilePicture: user.profilePicture,
          // };

          // console.log("User authorized:", plainUser);
          return {
            ...user,
            role: "user",
            id: user._id.toString(),
            accessToken,
          };
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
          user.role = "user";
          user.profilePicture = newUser.profilePicture;
        } else {
          // Use existing user data

          user.id = existingUser._id.toString();
          user.name = existingUser.name;
          user.lastName = existingUser.lastName;
          user.email = existingUser.email;
          user.role = "user";
          user.profilePicture = existingUser.profilePicture;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        lastName: token.lastName as string,
        role: token.role as string,
        profilePicture: token.profilePicture as string | undefined,
        accessToken: token.accessToken as string | undefined,
      };

      return session;
    },
  },
};
