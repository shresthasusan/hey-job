"use client";
import React, { useEffect, useState } from "react";

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
    <div className="flex flex-col max-w-[600px] w-[40%] min-w-[250px] gap-2 relative rounded-3xl h-[150px] px-5 py-2 overflow-hidden shadow-lg">
      <h1 className="text-2xl font-medium"> Active users</h1>

      {/* User Stats */}
      <div className="flex justify-between flex-col text-gray-700">
        <p>Freelancers: {stats.freelancers}</p>
        <p>Clients: {stats.clients}</p>
      </div>
    </div>
  );
};

export default Comp;
