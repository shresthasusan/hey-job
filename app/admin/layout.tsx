import "../ui/globals.css";
import Sidebar from "../ui/admin-components/sidebar";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <div lang="en" className="flex">
    <Sidebar /> 
    <main className="ml-20 md:ml-64 flex-1 p-6">{children}</main>
  </div>
);

export default RootLayout;
