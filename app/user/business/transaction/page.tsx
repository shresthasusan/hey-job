"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../ui/admin-components/sidebar";
import NavBar from "../../../ui/navbar/navbar";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "Credit" | "Debit";
  status: "Completed" | "Pending" | "Failed";
}

const transactions: Transaction[] = [
  { id: "TXN001", date: "2024-02-01", amount: 150, type: "Credit", status: "Completed" },
  { id: "TXN002", date: "2024-02-03", amount: -50, type: "Debit", status: "Pending" },
  { id: "TXN003", date: "2024-02-05", amount: 200, type: "Credit", status: "Completed" },
  { id: "TXN004", date: "2024-02-08", amount: -100, type: "Debit", status: "Failed" },
  { id: "TXN005", date: "2024-02-10", amount: 75, type: "Credit", status: "Completed" },
];

const TransactionPage = () => {
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch user transactions here (Replace with API call)
    setUserTransactions(transactions);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-700">Transaction History</h1>
          <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Transaction ID</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-center">Amount</th>
                  <th className="py-3 px-6 text-center">Type</th>
                  <th className="py-3 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {userTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{txn.id}</td>
                    <td className="py-3 px-6 text-left">{txn.date}</td>
                    <td
                      className={`py-3 px-6 text-center font-semibold ${
                        txn.amount < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {txn.amount < 0 ? `- $${Math.abs(txn.amount)}` : `+ $${txn.amount}`}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          txn.type === "Credit" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                        }`}
                      >
                        {txn.type}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      {txn.status === "Completed" && (
                        <span className="flex items-center justify-center text-green-500 font-semibold">
                          <CheckCircleIcon className="w-5 h-5 mr-1" /> {txn.status}
                        </span>
                      )}
                      {txn.status === "Pending" && (
                        <span className="flex items-center justify-center text-yellow-500 font-semibold">
                          <ClockIcon className="w-5 h-5 mr-1" /> {txn.status}
                        </span>
                      )}
                      {txn.status === "Failed" && (
                        <span className="flex items-center justify-center text-red-500 font-semibold">
                          <XCircleIcon className="w-5 h-5 mr-1" /> {txn.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
