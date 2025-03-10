"use client";
import React, { useEffect, useState } from "react";
import {
  BriefcaseIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useSession } from "next-auth/react";
import AcceptButton from "./acceptButton";

export default function ContractDetails({
  contractId,
}: {
  contractId: string;
}) {
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchContractOffers = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth(
          `/api/fetch-contracts?freelancerId=${session?.user.id}&contractId=${contractId}`
        );
        const { success, data } = await response.json();

        if (success) {
          setContract(data);
        } else {
          setError("Failed to fetch contract details.");
        }
      } catch (err) {
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.id) {
      fetchContractOffers();
    }
  }, [session?.user.id, contractId]);

  if (loading)
    return (
      <p className="text-center text-gray-500">Loading contract details...</p>
    );

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-lg border px-10  border-gray-200 shadow-sm overflow-hidden sticky top-6">
      <div className="p-6 pb-3">
        <h2 className="text-xl font-semibold">Contract Summary</h2>
      </div>

      <div className="px-6 pb-6 space-y-4">
        <div className="flex items-center">
          <BriefcaseIcon className="h-5 w-5 mr-3 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Client</p>
            <p className="font-medium">{contract?.clientDetails.fullName}</p>
          </div>
        </div>

        <div className="flex items-center">
          <CurrencyDollarIcon className="h-5 w-5 mr-3 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Offered Budget</p>
            <p className="font-medium">
              {contract?.paymentType === "fixed" ? "$" : "$/hr"}
              {contract?.price}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <ClockIcon className="h-5 w-5 mr-3 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Payment Type</p>
            <p className="font-medium capitalize">{contract?.paymentType}</p>
          </div>
        </div>

        <div className="flex items-center">
          <CalendarDaysIcon className="h-5 w-5 mr-3 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="font-medium">
              {new Date(contract?.deadline).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <MapPinIcon className="h-5 w-5 mr-3 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Client Location</p>
            <p className="font-medium">{contract?.clientDetails?.location}</p>
          </div>
        </div>
        <div className="flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 mr-3 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Offer Expiration</p>
            <p className="font-medium text-red-500">
              {new Date(contract?.expiration).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="my-4 border-t border-gray-200"></div>
      </div>
      <AcceptButton
        jobId={contract.jobId._id}
        freelancerId={session?.user.id}
      />
    </div>
  );
}
