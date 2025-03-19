"use client";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import UserProfile from "../user/profile/page";
import UserProfileLoader from "../lib/userProfileLoader";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="px-4 py-4">
        <UserProfileLoader />
        <Link href="/">
          <Image
            src="/logo/login-logo.png" // Replace with your logo's path in the public folder
            alt="Logo"
            width={100} // Adjust width as needed
            height={100} // Adjust height as needed
            className="object-contain "
          />
        </Link>
      </div>

      {/* Page Content */}
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          currency: "USD",
          intent: "capture",
        }}
      >
        {children}
      </PayPalScriptProvider>
    </>
  );
}
