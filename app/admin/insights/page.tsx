'use client';

import React, { useEffect, useState } from "react";

const InsightsPage = () => {
  const [insights, setInsights] = useState({
    totalUsers: 0,
    freelancers: 0,
    clients: 0,
    totalKYC: 0,
    verifiedKYC: 0,
    pendingKYC: 0,
  });

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setInsights(data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  return (
    <div className="p-4 mx-auto">
        <h1 className="text-5xl  align-middle text-center font-bold">Insights</h1>

      <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{insights.totalUsers}</p>
        </div>

        {/* Freelancers */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Freelancers</h2>
          <p className="text-2xl font-bold">{insights.freelancers}</p>
        </div>

        {/* Clients */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Clients</h2>
          <p className="text-2xl font-bold">{insights.clients}</p>
        </div>

        {/* Total KYC Submissions */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total KYC Submissions</h2>
          <p className="text-2xl font-bold">{insights.totalKYC}</p>
        </div>

        {/* Verified KYC */}
        <div className="bg-green-100 shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Verified KYC</h2>
          <p className="text-2xl font-bold">{insights.verifiedKYC}</p>
        </div>

        {/* Pending KYC */}
        <div className="bg-yellow-100 shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Pending KYC</h2>
          <p className="text-2xl font-bold">{insights.pendingKYC}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
