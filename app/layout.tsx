import "./ui/globals.css";
import { poppins } from "./ui/fonts";
import NavBar from "./ui/navbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth subpixel-antialiased ">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
