import React from "react";
import Sidebar from "../ui/admin-components/sidebar";
import "../ui/globals.css";
import Charts from "../ui/admin-components/dashboard-charts";

const Page = () => {
  return (
    <div className="flex flex-row min-h-screen bg-white-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex p-6 flex-col md:p-10 w-full">
        {/* Header */}
        <h1 className="text-4xl text-black-400 text-center md:text-left">
          Admin Dashboard
        </h1>

        {/* Content Section */}
        <div className="mt-10  md:grid-cols-2 gap-10">
          {/* Left Column - Cards */}

          <Charts />

          {/* Right Column - Additional Components */}
          <div className="flex flex-col gap-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
