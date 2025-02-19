import Sidebar from "@/app/ui/admin-components/sidebar";
import "../../ui/globals.css";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <div lang="en" className="flex">
    <Sidebar />
    <main className="">{children}</main>
  </div>
);

export default RootLayout;
