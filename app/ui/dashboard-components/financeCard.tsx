import { ClockIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import React from "react";

const FinanceCard = () => {
  return (
    <div className="flex min-w-[250px] flex-col gap-5 justify-center items-center relative rounded-3xl h-[250px] p-5 overflow-hidden shadow-[0_10px_20px_rgba(228,228,228,_0.7)]">
      <h1 className="text-2xl font-semibold"> Earning & Expenses</h1>
      <div className="w-full flex gap-1 divide-y-2 flex-col ">
        <div className="flex flex-col gap-1 ">
          <p className="text-gray-400 text-sm ">Earning</p>
          <h1 className="text-sucess-600 text-center text-2xl "> $2000</h1>
        </div>
        <div className="flex flex-col gap-1 ">
          <p className="text-gray-400 text-sm">Expenses</p>
          <h1 className="text-danger-600 text-center text-2xl"> $2000</h1>
        </div>
      </div>
    </div>
  );
};

export default FinanceCard;
