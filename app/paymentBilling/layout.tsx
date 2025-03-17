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
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {/* Logo at Top Left */}
        <div className="px-4 py-4">
          <Link href="/">
            <Image
              src="/logo/login-logo.png" // Replace with your logo's path in the public folder
              alt="Logo"
              width={150} // Adjust width as needed
              height={50} // Adjust height as needed
              className="object-contain bg-primary-400"
            />
          </Link>
        </div>

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
