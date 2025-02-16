"use client";

import React, { useState } from "react";

const Terms = () => {
  const [bidAmount, setBidAmount] = useState("");
  const platformCut = bidAmount
    ? (parseFloat(bidAmount) * 0.1).toFixed(2)
    : "0.00";
  const totalAmount = bidAmount ? parseFloat(bidAmount).toFixed(2) : "0.00";
  const freelancerReceives = bidAmount
    ? (parseFloat(bidAmount) * 0.9).toFixed(2)
    : "0.00";

  return (
    <div className="border-2 border-gray-300 rounded-xl p-6 w-full bg-white">
      <p className="font-semibold text-2xl mb-4">Terms</p>
      <p className="text-sm text-gray-500">
        Bit the amount you&apos;ll like to get for the complete project.
      </p>
      <div className="space-y-6 flex justify-between ">
        <div>
          <div className="flex gap-24 items-center mt-8">
            <label className="text-lg font-lg mb-2">
              Enter Your Bid Amount
            </label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="border p-1 rounded-md text-lg text-center"
              placeholder="Enter bid amount"
            />
          </div>
        </div>
        <div className="flex flex-col text-gray-500">
          <div className=" p-2">
            <div className="flex justify-between gap-14 font-medium">
              <span>Total Bid Amount</span>
              <span className="text-black">${totalAmount}</span>
            </div>
          </div>
          <div className=" p-2">
            <div className="flex justify-between gap-14 font-medium">
              <span>Service Fee (10%)</span>
              <span className="text-red-500">-${platformCut}</span>
            </div>
          </div>
          <div className="p-2">
            <div className="flex justify-between gap-14 font-medium">
              <span>You’ll Receive</span>
              <span className="text-green-600">${freelancerReceives}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
