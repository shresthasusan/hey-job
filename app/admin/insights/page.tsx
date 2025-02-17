"use client";

import React, { useEffect, useState } from "react";

const InsightsPage = () => {
  const [insights, setInsights] = useState({
    totalUsers: 0,
    freelancers: 0,
    clients: 0,
    totalKYC: 0,
    verifiedKYC: 0,
    pendingKYC: 0,
    rejectedKYC: 0,
  });

  // useEffect(() => {
  //   const fetchKYCData = async () => {
  //     try {
  //       const res = await fetch("/api/admin/fetch-kycs");
  //       const data = await res.json();

  //       // Count KYC statuses
  //       const verifiedKYC = data.filter((doc: any) => doc.status === "approved").length;
  //       const pendingKYC = data.filter((doc: any) => doc.status === "pending").length;
  //       const rejectedKYC = data.filter((doc: any) => doc.status === "rejected").length;
  //       const totalKYC = verifiedKYC + pendingKYC + rejectedKYC; // Correct total count

  //       setInsights((prev) => ({
  //         ...prev,
  //         totalKYC,
  //         verifiedKYC,
  //         pendingKYC,
  //         rejectedKYC,
  //       }));
  //     } catch (error) {
  //       console.error("Error fetching KYC data:", error);
  //     }
  //   };

  //   fetchKYCData();
  // }, []);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const datas = await response.json();

        if (response.ok) {
          setInsights((prev) => ({
            ...prev,
            totalUsers: datas.totalUsers,
            freelancers: datas.freelancers,
            clients: datas.clients,
            totalKYC: datas.totalKyc,
            verifiedKYC: datas.approvedKyc,
            rejectedKYC: datas.rejectedKyc,
            pendingKYC: datas.pendingKyc,
          }));
        } else {
          console.error("Failed to fetch user stats:", datas.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="flex flex-col flex-1 p-6 md:p-10 bg-white-100 min-h-screen">
      {/* Heading */}
      <h1 className="text-4xl text-black-400 text-center md:text-left">
        Insights
      </h1>

      {/* Insights Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Total Users */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-gray-900">
            {insights.totalUsers}
          </p>
        </div>

        {/* Freelancers */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Freelancers</h2>
          <p className="text-3xl font-bold text-gray-900">
            {insights.freelancers}
          </p>
        </div>

        {/* Clients */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Clients</h2>
          <p className="text-3xl font-bold text-gray-900">{insights.clients}</p>
        </div>

        {/* Total KYC Submissions */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Total KYC Submissions
          </h2>
          <p className="text-3xl font-bold text-gray-900">
            {insights.totalKYC}
          </p>
        </div>

        {/* Verified KYC */}
        <div className="bg-green-200 shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Verified KYC</h2>
          <p className="text-3xl font-bold text-green-800">
            {insights.verifiedKYC}
          </p>
        </div>

        {/* Pending KYC */}
        <div className="bg-yellow-200 shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Pending KYC</h2>
          <p className="text-3xl font-bold text-yellow-800">
            {insights.pendingKYC}
          </p>
        </div>

        {/* Rejected KYC */}
        <div className="bg-red-200 shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Rejected KYC</h2>
          <p className="text-3xl font-bold text-red-800">
            {insights.rejectedKYC}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
