"use client";

import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Updated interfaces to include more relevant information
interface Job {
  _id: string;
  title: string;
  description: string;
  budget: number;
}

interface FreelancerDetails {
  _id: string;
  userId: string;
  fullName: string;
  location: string;
  rate: number;
  industries: string[];
}

interface Contract {
  _id: string;
  jobId: Job;
  status: "pending" | "active" | "completed" | "canceled" | "declined";
  paymentType: "fixed" | "hourly" | "milestone";
  price: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  freelancerDetails: FreelancerDetails;
}

interface ContractsListProps {
  contractStatus?: string;
  paymentType?: string;
  search?: string;
}

const ContractsList: React.FC<ContractsListProps> = () => {
  const searchParams = useSearchParams();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const status = searchParams.get("status") || "";
  const paymentType = searchParams.get("paymentType") || "";
  const search = searchParams.get("search") || "";

  // Debounced fetch function
  const debouncedFetchContracts = useCallback(
    async (clientId: string, status: string, paymentType: string) => {
      setLoading(true);
      try {
        const response = await fetchWithAuth(
          `/api/fetch-contracts?clientId=${clientId}${status ? `&status=${status}` : ""}${paymentType ? `&paymentType=${paymentType}` : ""}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch contracts");
        }

        const { data } = await response.json();
        setContracts(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to load contracts. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [] // Include debounce
  );

  useEffect(() => {
    if (!session?.user?.id) return;

    debouncedFetchContracts(session.user.id, status, paymentType);
  }, [status, paymentType, session?.user?.id, debouncedFetchContracts]);

  // Filter contracts by search term if provided
  const filteredContracts = search
    ? contracts.filter(
        (contract) =>
          contract.jobId.title.toLowerCase().includes(search.toLowerCase()) ||
          (contract.freelancerDetails?.fullName &&
            contract.freelancerDetails.fullName
              .toLowerCase()
              .includes(search.toLowerCase()))
      )
    : contracts;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredContracts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {filteredContracts?.map((contract) => (
            <div
              key={contract._id}
              className="border rounded-lg shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <div className="border-b bg-gray-50 p-4 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {contract.jobId.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    contract.status === "active"
                      ? "bg-green-100 text-green-800"
                      : contract.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : contract.status === "completed"
                          ? "bg-blue-100 text-blue-800"
                          : contract.status === "canceled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {contract.status.charAt(0).toUpperCase() +
                    contract.status.slice(1)}
                </span>
              </div>

              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                  <div className="mb-2 sm:mb-0">
                    <div className="text-sm font-medium text-gray-500">
                      Freelancer
                    </div>
                    <div className="mt-1">
                      {contract.freelancerDetails?.fullName || "Unknown"}
                    </div>
                    {contract.freelancerDetails?.location && (
                      <div className="text-sm text-gray-500">
                        {contract.freelancerDetails.location}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-500">
                      Contract Value
                    </div>
                    <div className="mt-1 font-medium">
                      ${contract.price.toLocaleString()}
                      {contract.paymentType === "hourly" && (
                        <span className="text-sm font-normal"> /hour</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {contract.paymentType} payment
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <span className="text-gray-500">Created:</span>{" "}
                    {contract.createdAt
                      ? new Date(contract.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div>
                    <span className="text-gray-500">Deadline:</span>{" "}
                    {contract.deadline
                      ? new Date(contract.deadline).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-end">
                  <Link
                    href={`/contracts/${contract._id}`}
                    className="inline-flex items-center px-4 py-2 border border-primary-600 text-sm font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">No contracts found.</p>
          {status || paymentType ? (
            <p className="mt-2 text-sm text-gray-500">
              Try adjusting your filter criteria to see more results.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ContractsList;
