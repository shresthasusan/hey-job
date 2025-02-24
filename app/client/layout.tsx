import "../ui/globals.css";
import KYCStatus from "../ui/kycStatus";
import NavBar from "../ui/navbar/navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="fixed z-10 bg-white w-full ">
        <NavBar />
      </div>
      <KYCStatus />
      <div className="max-w-[1980px] body-container pt-[75px] m-auto">
        {children}
      </div>
    </div>
  );
}
