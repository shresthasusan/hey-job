"use client";

import { useEffect, useState } from "react";
import JobDetails from "./jobDetails";
import TimeLine from "./timeLine";

import Requirements from "./Requirements";
import Deliveries from "./deliveries";
import FileSection from "./fileSection";
import ClientInfomation from "./clientInfomation";
import CommunicationSection from "./communicationSection";
import Button from "./contractButton";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

interface Props {
  contractId: string;
  jobId: string;
}

export default function ContractDetailsPage({ contractId, jobId }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);

  const handleSuccess = () => {
    console.log("Action completed successfully");
    fetchProjectDetails(); // Refetch to update UI with new status
  };

  const handleError = (error: Error) => {
    console.error("Action failed:", error.message);
    setError(error.message);
  };

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(
        `/api/project-details?contractId=${contractId}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }
      const { project } = await response.json();
      setContract(project);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contractId) {
      fetchProjectDetails();
    }
  }, [contractId]);

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 text-red-600">
        Error: {error}
      </div>
    );
  }

  // Helper function to get status styling
  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <JobDetails jobId={jobId} />
      {/* Display Project Status */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Project Status</h2>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
            contract?.status
          )}`}
        >
          {contract?.status || "Active"}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TimeLine
            contractId={contractId}
            project_todo={contract?.project_todo}
          />
          <Requirements requirements={contract?.requirements} />
          <Deliveries
            deliverables={contract?.deliveries}
            contractId={contractId}
          />
          <FileSection
            files={contract?.project_files}
            contractId={contractId}
          />
        </div>
        <div className="space-y-6">
          <ClientInfomation jobId={jobId} />
          <CommunicationSection
            contractId={contractId}
            meetings={contract?.meetings}
            userRole={
              contract?.freelancerId === "current-user-id"
                ? "freelancer"
                : "client"
            } // Replace with auth logic
          />
          <div className="flex gap-3">
            <Button
              action="completed"
              contractId={contractId}
              onSuccess={handleSuccess}
              onError={handleError}
              disabled={
                contract?.status === "completed" ||
                contract?.status === "canceled"
              } // Disable if already completed/canceled
            />
            <Button
              action="canceled"
              contractId={contractId}
              onSuccess={handleSuccess}
              onError={handleError}
              disabled={
                contract?.status === "completed" ||
                contract?.status === "canceled"
              } // Disable if already completed/canceled
            >
              Cancel Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
  <div
    className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50"
    onClick={() => toggleSection("communication")}
  >
    <h2 className="text-lg font-semibold">Communication</h2>
    {expandedSections.communication ? (
      <ChevronUpIcon className="h-5 w-5 text-gray-500" />
    ) : (
      <ChevronDownIcon className="h-5 w-5 text-gray-500" />
    )}
  </div>
  {expandedSections.communication && (
    <div className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-5 w-5 text-blue-500 mr-3" />
            <div>
              <p className="font-medium text-gray-900">
                Kickoff Meeting
              </p>
              <p className="text-xs text-gray-500">
                March 16, 2025 • 10:00 AM
              </p>
            </div>
          </div>
        </div>
        <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mt-2">
          <PlusIcon className="h-4 w-4 mr-1" />
          Schedule Meeting
        </button>
      </div>
    </div>
  )}
</div> */
}
{
  /* Budget Section */
}
{
  /* <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div
              className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("budget")}
            >
              <h2 className="text-lg font-semibold">Budget & Payments</h2>
              {expandedSections.budget ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
            {expandedSections.budget && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Budget</p>
                    <p className="text-xl font-bold">{contract.budget.total}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Paid</p>
                    <p className="text-xl font-bold text-green-700">
                      {contract.budget.paid}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-xl font-bold text-yellow-700">
                      {contract.budget.pending}
                    </p>
                  </div>
                </div>
                <h3 className="font-medium mb-3">Payment Schedule</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Milestone
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Due Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contract.budget.schedule.map((payment, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {payment.milestone}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {payment.amount}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {payment.date}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(payment.status)}`}
                            >
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div> */
}
