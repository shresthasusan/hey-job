import React from "react";
import Sidebar from "../ui/admin-components/sidebar";
import Comp from "../ui/admin-components/cards";
import "../ui/globals.css";
import OrderCard from "../ui/dashboard-components/orderCard";

const Page = () => {
  return (
    <div className="flex min-h-screen bg-white-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6 md:p-10">
        {/* Header */}
        <h1 className="text-4xl text-black-400 text-center md:text-left">
          Admin Dashboard
        </h1>

        {/* Content Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column - Cards */}
          <div className="flex flex-col gap-6">
            <Comp />
          </div>

          {/* Right Column - Additional Components */}
          <div className="flex flex-col gap-6">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
