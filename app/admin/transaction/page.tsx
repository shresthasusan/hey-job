"use client";

import React, { useEffect, useState } from "react";

const TransactionsPage = () => {
  interface Transaction {
    _id: string;
    userId: { name: string; role: string };
    amount: number;
    type: string;
    status: string;
    timestamp: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState({ status: "", type: "" });

  // useEffect(() => {
  //   fetchTransactions();
  // }, []);

  // const fetchTransactions = async () => {
  //   try {
  //     const res = await fetch("/api/transactions");
  //     const data = await res.json();
  //     setTransactions(data);
  //   } catch (error) {
  //     console.error("Error fetching transactions:", error);
  //   }
  // };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredTransactions = transactions.filter(
    (t) =>
      (filter.status ? t.status === filter.status : true) &&
      (filter.type ? t.type === filter.type : true)
  );

  return (
    <div className="">
        <h1 className="text-5xl  align-middle text-center font-bold">Transaction</h1>
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">


      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          name="status"
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
        <select
          name="type"
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="payment">Payment</option>
        </select>
      </div>

      {/* Transactions Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">User</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction._id} className="border">
              <td className="p-2">{transaction.userId.name}</td>
              <td className="p-2">{transaction.userId.role}</td>
              <td className="p-2">${transaction.amount.toFixed(2)}</td>
              <td className="p-2">{transaction.type}</td>
              <td className="p-2">{transaction.status}</td>
              <td className="p-2">
                {new Date(transaction.timestamp).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default TransactionsPage;
