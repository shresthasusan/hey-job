"use client";

import React, { useState } from "react";

const TransactionsPage = () => {
  interface Transaction {
    _id: string;
    userId: { name: string; role: string };
    amount: number;
    type: string;
    status: string;
    timestamp: string;
  }

  // Dummy Transactions Data
  const [transactions, setTransactions] = useState<Transaction[]>([
    { _id: "1", userId: { name: "John Doe", role: "Freelancer" }, amount: 120, type: "deposit", status: "completed", timestamp: "2024-02-10T10:30:00" },
    { _id: "2", userId: { name: "Jane Smith", role: "Client" }, amount: 250, type: "withdrawal", status: "pending", timestamp: "2024-02-09T14:00:00" },
    { _id: "3", userId: { name: "Emily Brown", role: "Freelancer" }, amount: 80, type: "payment", status: "failed", timestamp: "2024-02-08T16:45:00" },
    { _id: "4", userId: { name: "Michael Johnson", role: "Client" }, amount: 300, type: "deposit", status: "completed", timestamp: "2024-02-07T09:15:00" },
    { _id: "5", userId: { name: "Sarah Lee", role: "Freelancer" }, amount: 150, type: "withdrawal", status: "completed", timestamp: "2024-02-06T11:20:00" },
  ]);

  const [filter, setFilter] = useState({ status: "", type: "" });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredTransactions = transactions.filter(
    (t) =>
      (filter.status ? t.status === filter.status : true) &&
      (filter.type ? t.type === filter.type : true)
  );

  return (
    <div className="flex flex-col flex-1 p-6 md:p-10 bg-white min-h-screen">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-yellow-400 text-center md:text-left">
        Transactions
      </h1>

      {/* Transactions Container */}
      <div className="max-w-5xl  p-6 bg-gray-50 shadow-lg rounded-lg mt-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            name="status"
            onChange={handleFilterChange}
            className="border p-2 rounded-lg bg-white shadow-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>

          <select
            name="type"
            onChange={handleFilterChange}
            className="border p-2 rounded-lg bg-white shadow-sm"
          >
            <option value="">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="payment">Payment</option>
          </select>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="border-b text-gray-800">
                    <td className="p-3">{transaction.userId.name}</td>
                    <td className="p-3">{transaction.userId.role}</td>
                    <td className="p-3 font-bold text-gray-900">${transaction.amount.toFixed(2)}</td>
                    <td className="p-3 capitalize">{transaction.type}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          transaction.status === "pending"
                            ? "bg-yellow-400 text-black"
                            : transaction.status === "completed"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
