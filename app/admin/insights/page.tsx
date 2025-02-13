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
    <div className="flex flex-col flex-1 p-6 md:p-10 bg-white-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-yellow-400 text-center md:text-left">
        Insights
      </h1>

      {/* Insights Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Total Users */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-gray-900">{insights.totalUsers}</p>
        </div>

        {/* Freelancers */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Freelancers</h2>
          <p className="text-3xl font-bold text-gray-900">{insights.freelancers}</p>
        </div>

        {/* Clients */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Clients</h2>
          <p className="text-3xl font-bold text-gray-900">{insights.clients}</p>
        </div>

        {/* Total KYC Submissions */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total KYC Submissions</h2>
          <p className="text-3xl font-bold text-gray-900">{insights.totalKYC}</p>
        </div>

        {/* Verified KYC */}
        <div className="bg-green-200 shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Verified KYC</h2>
          <p className="text-3xl font-bold text-green-800">{insights.verifiedKYC}</p>
        </div>

        {/* Pending KYC */}
        <div className="bg-yellow-200 shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Pending KYC</h2>
          <p className="text-3xl font-bold text-yellow-800">{insights.pendingKYC}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
