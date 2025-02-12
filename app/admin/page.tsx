import { Suspense } from "react";
import Sidebar from "../ui/admin-components/sidebar";
import React from "react";
import Comp from "../ui/admin-components/cards";
import "../ui/globals.css";
import OrderCard from "../ui/dashboard-components/orderCard";

const Page = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="ml-2 md:ml-5 flex flex-col p-2 w-full gap-6">
        <h1 className="text-5xl  align-middle text-center font-bold">Admin Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-14">
          {/* Left Column */}
          <div className=" flex flex-col gap-2">
            <Comp />
          </div>

          {/* Right Column */}
          <div className=" flex flex-col gap-2">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
