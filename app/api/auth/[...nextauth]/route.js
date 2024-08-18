import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import path from "path";

console.log("Current directory:", __dirname);
console.log(
  "Resolved path:",
  path.resolve(__dirname, "../../../../models/user")
);

import User from "../../../../models/user";

if (!User) {
  console.error("User model is not defined");
}

export const authOptions = {
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
          // console.log(User);
          if (!user) {
            console.log("User not found:", email); // Added logging for debugging
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            console.log("Password mismatch for user:", email); // Added logging for debugging
            return null;
          }
          console.log("user authorized ");
          return user;
        } catch (error) {
          console.error("Authorization error:", error); // Added logging for errors
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secrets: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    // signOut: "/login",
  },
  callbacks: {
    async jwt({ token, user, session }) {
      // console.log("jwt callback", { token, user, session });
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.lastName = user.lastName;
      }
      // console.log("jwt callback", { token, user, session });
      return token;
    },
    async session({ session, token }) {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.lastName = token.lastName;
      // console.log("session callback", { session, token });
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
