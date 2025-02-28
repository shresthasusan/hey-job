"use client";
import React, { useEffect, useState } from "react";
import Card from "../card";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { AreaChart } from "../tremorChart-components/area-chart";

interface UserGrowthData {
  _id: number;
  count: number;
}

const Charts = () => {
  const [stats, setStats] = useState(null);
  const [userGrowth, setUserGrowth] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetchWithAuth("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    }

    async function fetchUserGrowth() {
      const res = await fetchWithAuth("/api/admin/user-growth");
      const data = await res.json();
      setUserGrowth(
        data.map((d: UserGrowthData) => ({ month: d._id, users: d.count }))
      );
    }

    fetchStats();
    fetchUserGrowth();
  }, []);
  return (
    <div className="flex w-1/2">
      <Card className="flex flex-col gap-2 ">
        {/* User Growth Chart */}
        <h1>User Growth Over Time</h1>
        <AreaChart
          data={userGrowth}
          index="month"
          categories={["count"]}
          colors={["blue"]}
          yAxisWidth={50}
        />
      </Card>
    </div>
  );
};

export default Charts;
