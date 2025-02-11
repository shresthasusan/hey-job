import { Suspense } from "react";
import Sidebar from "../ui/admin-components/sidebar";
import React from "react";
import Comp from "../ui/admin-components/cards";
import "../ui/globals.css";
import RightCard from "../ui/dashboard-components/rightCard";
import ProfileCard from "../ui/dashboard-components/profileCard";

const Page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-20 md:ml-64 flex flex-col p-6 w-full gap-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className=" flex flex-col gap-6">
            <Comp />
          </div>

          {/* Right Column */}
          <div className=" flex flex-col gap-6">
          
            <RightCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
