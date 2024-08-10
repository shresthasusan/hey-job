import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import path from "path";
import { NextAuthOptions } from "next-auth";

console.log("Current directory:", __dirname);
console.log(
  "Resolved path:",
  path.resolve(__dirname, "../../../../models/User")
);

import User from "../../../../models/User";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" }, //change to type email in signup and login form if error occurs
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          // console.log(user);
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  sessions: {
    strategy: "jwt",
  },
  secrets: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      // console.log("jwt callback", { token, user, session });
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.lastName = user.lastName;
      }
      console.log("jwt callback", { token, user, session });
      return token;
    },
    async session({ session, token }) {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.lastName = token.lastName;
      console.log("session callback", { session, token });
      return session;
    },
  },
};

// Ensure the type of authOptions matches the expected type
// checkFields <
//   Diff <
//   {
//     GET: Function,
//     HEAD: Function,
//     OPTIONS: Function,
//     authOptions: NextAuthOptions,
//   } >>
//     authOptions;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
