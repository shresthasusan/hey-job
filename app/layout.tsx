import "./ui/globals.css";
import { poppins } from "./ui/fonts";
import AuthProvider from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth subpixel-antialiased ">
      <body>
        <div className={`min-h-screen ${poppins.className}`}>
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
