"use client";
import React, { useState } from "react";
import Card from "../../card";
import AccountGrowthChart from "./user-count";
import Link from "next/link";

const Charts = () => {
  const [timeframe, setTimeframe] = useState<string>("monthly"); // Default to monthly
  const [chartSelected, setChartSelected] = useState<string>("Account-Growth");

  return (
    <div className="flex w-1/2">
      <Card className="flex flex-col gap-2 p-6 shadow-lg rounded-lg border border-primary-500 bg-white">
        {/* User Growth Chart */}
        <div className="flex justify-between items-center">
          <h1 className="px-8 font-medium text-gray-700 text-lg">
            User Analytics
          </h1>
          {/* Dropdown for Time Frame Selection */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border border-gray-300 bg-gray-50 rounded-md px-8 py-1 shadow-sm text-gray-700 focus:ring focus:ring-blue-300"
            name="timeframe"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="flex gap-5">
          <Link onClick={() => setChartSelected("Account-Growth")} href={""}>
            User account growth chart
          </Link>
        </div>

        {chartSelected === "Account-Growth" && (
          <AccountGrowthChart timeframe={timeframe} />
        )}
      </Card>
    </div>
  );
};

export default Charts;
