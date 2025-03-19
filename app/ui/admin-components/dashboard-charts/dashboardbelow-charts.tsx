"use client";
import React, { useState } from "react";
import Card from "../../card";
import TurnOverChart from "./turn-overcharts";
import Financialchart from "./freelancer-earnings-chart";
import PlatformRevenueChart from "./platform-revenue-chart";

const DashboardCharts = () => {
  const [querySelect, setQuerySelect] = useState<string>("monthly"); // Default to monthly
  const [chartSelected, setChartSelected] = useState<string>("TurnOver");

  return (
    <div className="flex w-full">
      <Card className="flex flex-col gap-2 p-6 shadow-lg rounded-lg border border-primary-500 bg-white">
        {/* Chart Header */}
        <div className="flex justify-between items-center">
          <h1 className="px-8 font-medium text-primary-600 text-lg">
            Financial Analytics
          </h1>
          {/* Dropdown for Time Frame Selection */}
          <select
            value={querySelect}
            onChange={(e) => setQuerySelect(e.target.value)}
            className="border border-gray-300 bg-gray-50 rounded-md px-8 py-1 shadow-sm text-gray-700 focus:ring focus:ring-blue-300"
            name="querySelect"
          >
            <option value="daily">day</option>
            <option value="monthly">month</option>
            <option value="yearly">year</option>
          </select>
        </div>

        {/* Chart Selection Tabs */}
        <div className="flex gap-5 px-8 py-5">
          <button
            onClick={() => setChartSelected("TurnOver")}
            className={`relative text-gray-700 font-medium transition-colors ${
              chartSelected === "TurnOver"
                ? "before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary-500 before:rounded-full"
                : "text-gray-500"
            }`}
          >
            Turn Over
          </button>
          <button
            onClick={() => setChartSelected("FreelancerEarnings")}
            className={`relative text-gray-700 font-medium transition-colors ${
              chartSelected === "FreelancerEarnings"
                ? "before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary-500 before:rounded-full"
                : "text-gray-500"
            }`}
          >
            Freelancer Earnings
          </button>
          <button
            onClick={() => setChartSelected("PlatformRevenue")}
            className={`relative text-gray-700 font-medium transition-colors ${
              chartSelected === "PlatformRevenue"
                ? "before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-primary-500 before:rounded-full"
                : "text-gray-500"
            }`}
          >
            Platform Revenue
          </button>
        </div>

        {/* Render Selected Chart */}
        {chartSelected === "TurnOver" && <TurnOverChart timeframe={querySelect} />}
        {chartSelected === "FreelancerEarnings" && (
          <Financialchart timeframe={querySelect} />
        )}
        {chartSelected === "PlatformRevenue" && (
          <PlatformRevenueChart timeframe={querySelect} />
        )}
      </Card>
    </div>
  );
};

export default DashboardCharts;
