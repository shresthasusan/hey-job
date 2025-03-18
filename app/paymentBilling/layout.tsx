import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

// Define metadata for the app (Next.js 13+)
export const metadata = {
  title: "My App",
  description: "A payment success application",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="px-4 py-4">
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
      {children}
    </>
  );
}
