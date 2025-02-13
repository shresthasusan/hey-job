"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../../ui/admin-components/sidebar";
import NavBar from "../../../ui/navbar/navbar";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/solid";

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: "Credit Card" | "Bank Transfer" | "Khalti" | "PayPal";
  status: "Successful" | "Pending" | "Failed";
}

const payments: Payment[] = [
  { id: "PAY001", date: "2024-02-01", amount: 100, method: "Khalti", status: "Successful" },
  { id: "PAY002", date: "2024-02-05", amount: 250, method: "Credit Card", status: "Pending" },
  { id: "PAY003", date: "2024-02-08", amount: 75, method: "Bank Transfer", status: "Failed" },
  { id: "PAY004", date: "2024-02-12", amount: 50, method: "PayPal", status: "Successful" },
  { id: "PAY005", date: "2024-02-15", amount: 300, method: "Credit Card", status: "Successful" },
];

const PaymentHistoryPage = () => {
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);

  useEffect(() => {
    // Fetch user payment history here (Replace with API call)
    setPaymentHistory(payments);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-700">Payment History</h1>
          <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Payment ID</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-center">Amount</th>
                  <th className="py-3 px-6 text-center">Payment Method</th>
                  <th className="py-3 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {paymentHistory.map((pay) => (
                  <tr key={pay.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{pay.id}</td>
                    <td className="py-3 px-6 text-left">{pay.date}</td>
                    <td className="py-3 px-6 text-center font-semibold text-green-500">
                      $ {pay.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-6 text-center">{pay.method}</td>
                    <td className="py-3 px-6 text-center">
                      {pay.status === "Successful" && (
                        <span className="flex items-center justify-center text-green-500 font-semibold">
                          <CheckCircleIcon className="w-5 h-5 mr-1" /> {pay.status}
                        </span>
                      )}
                      {pay.status === "Pending" && (
                        <span className="flex items-center justify-center text-yellow-500 font-semibold">
                          <ClockIcon className="w-5 h-5 mr-1" /> {pay.status}
                        </span>
                      )}
                      {pay.status === "Failed" && (
                        <span className="flex items-center justify-center text-red-500 font-semibold">
                          <XCircleIcon className="w-5 h-5 mr-1" /> {pay.status}
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

export default PaymentHistoryPage;
