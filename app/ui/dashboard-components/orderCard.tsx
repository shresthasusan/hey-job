"use client"; // Required for Next.js client components

import { useEffect, useState } from "react";
import { CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/solid";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useSession } from "next-auth/react";
import { useAuth } from "@/app/providers";

interface Props {
  mode: string;
}

const OrderCard = ({ mode }: Props) => {
  const [activeCount, setActiveCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);

  const { session } = useAuth();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const response = await fetchWithAuth(
          `/api/contractsFetchwithcount?userId=${userId}`
        );
        const data = await response.json();
        setActiveCount(data.activeCount || 0);
        setCompleteCount(data.completeCount || 0);
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };

    if (userId) {
      fetchContractData();
    }
  }, [userId]);

  return (
    <div
      className="flex min-w-[250px] w-[15%] flex-col gap-5 justify-center 
      items-center relative rounded-3xl h-[250px] p-5 overflow-hidden 
      shadow-[0_10px_20px_rgba(228,228,228,_0.7)]"
    >
      <h1 className="text-3xl font-medium">
        {mode === "Client" ? "Your Jobs" : "Order"}
      </h1>
      <div className="w-full flex gap-3 flex-col">
        {/* Pending Orders */}
        <div className="bg-primary-400 text-primary-700 relative rounded-3xl p-[3px] pl-10">
          <p>{activeCount} Pending</p>
          <ClockIcon className="h-4 w-5 absolute -translate-y-[50%] left-3 top-1/2" />
        </div>

        {/* Completed Orders with Green Background */}
        <div className="bg-sucess-400 text-sucess-600 relative rounded-3xl p-[3px] pl-10">
          <p>{completeCount} Completed</p>
          <CheckBadgeIcon className="h-4 w-5 absolute -translate-y-[50%]  left-3 top-1/2 " />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
