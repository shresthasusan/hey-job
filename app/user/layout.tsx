import "../ui/globals.css";
import { poppins } from "../ui/fonts";
import NavBar from "../ui/navbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div>
          <div className="fixed z-10 bg-white w-full ">
            <NavBar />
          </div>
          <div className="max-w-[1980px] pt-[75px] m-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
