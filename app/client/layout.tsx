import "../ui/globals.css";
import NavBar from "../ui/navbar/navbar";
import AuthProvider from "../providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="fixed z-10 bg-white w-full ">
        <NavBar />
      </div>
      <div className="max-w-[1980px] body-container pt-[75px] m-auto">
        {children}
      </div>
    </div>
  );
}
