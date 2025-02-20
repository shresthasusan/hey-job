"use client";
import React, { useEffect, useState } from "react";
import Card from "../card";

const Comp = () => {
  const [stats, setStats] = useState({
    freelancers: 0,
    clients: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Card className="flex flex-col gap-2 ">
      <h1 className="text-2xl font-medium"> Active users</h1>
      {/* User Stats */}
      <div className="flex justify-between flex-col text-gray-700 p-5">
        <p>Freelancers: {stats.freelancers}</p>
        <p>Clients: {stats.clients}</p>
      </div>
    </Card>
  );
};

export default Comp;
