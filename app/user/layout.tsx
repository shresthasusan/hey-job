import "../ui/globals.css";
import { poppins } from "../ui/fonts";
import NavBar from "../ui/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NavBar />
        <div className="max-w-[1940px] m-auto">{children}</div>
      </body>
    </html>
  );
}
