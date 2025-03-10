"use client";
import useFetch from "@/app/hooks/useFetch";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import { Button } from "@/app/ui/button";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface Props {
  jobId: string;
  freelancerId?: string;
  contractId?: string;
}

const AcceptButton = ({ jobId, freelancerId, contractId }: Props) => {
  const { data: actions = [], loading } = useFetch<string[]>(
    `/check-action?jobId=${jobId}&freelancerId=${freelancerId}`
  );

  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);

  const handleAccept = async () => {
    try {
      // Call the API to accept the contract
      const response = await fetchWithAuth("/api/contract-action", {
        method: "PATCH",
        body: JSON.stringify({
          contractId,
          userId: freelancerId,
          newStatus: "active",
        }),
      });

      if (response.ok) {
        // Handle successful acceptance
        setIsAcceptDialogOpen(false);
        alert("Contract accepted successfully!");
      } else {
        // Handle error case
        alert("Failed to accept the contract. Please try again.");
      }
    } catch (error) {
      console.error("Error accepting contract:", error);
      alert("An error occurred while accepting the contract.");
    }
  };

  const handleDecline = async () => {
    try {
      // Call the API to decline the contract
      const response = await fetchWithAuth("/api/contract-action", {
        method: "PATCH",
        body: JSON.stringify({
          jobId,
          userId: freelancerId,
          newStatus: "declined",
        }),
      });

      if (response.ok) {
        // Handle successful decline
        setIsDeclineDialogOpen(false);
        alert("Contract declined successfully!");
      } else {
        // Handle error case
        alert("Failed to decline the contract. Please try again.");
      }
    } catch (error) {
      console.error("Error declining contract:", error);
      alert("An error occurred while declining the contract.");
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="py-2 space-y-3 mb-4">
      {Array.isArray(actions) && actions.includes("proposal_submitted") ? (
        <span className="">You&apos;ve taken action for this offer</span>
      ) : (
        <>
          <Button
            className="w-full text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => setIsAcceptDialogOpen(true)}
          >
            Accept Offer
          </Button>

          <Button
            outline={true}
            danger={true}
            className="w-full font-medium py-2 px-4 rounded-md border hover:bg-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={() => setIsDeclineDialogOpen(true)}
          >
            Decline Offer
          </Button>
        </>
      )}

      {/* Accept Dialog */}
      {isAcceptDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Accept Contract Offer</h3>
              <p className="text-gray-500 mt-1">
                Are you sure you want to accept this contract offer? Once
                accepted, you will be committed to the terms and conditions
                outlined in the contract.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
              <div className="flex items-start">
                <div className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0">
                  <ShieldCheckIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">
                    Binding Agreement
                  </h4>
                  <p className="mt-1 text-sm text-blue-700">
                    By accepting this offer, you acknowledge that you are
                    entering into a legally binding agreement. You will be
                    obligated to fulfill all requirements and deliverables as
                    specified in the contract terms above.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setIsAcceptDialogOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAccept}
                className="px-4 py-2 rounded-md text-white font-medium text-sm hover:bg-primary-700"
              >
                Confirm & Accept
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Dialog */}
      {isDeclineDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Decline Contract Offer</h3>
              <p className="text-gray-500 mt-1">
                Are you sure you want to decline this contract offer? This
                action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setIsDeclineDialogOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDecline}
                className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 font-medium text-sm"
              >
                Confirm & Decline
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptButton;
