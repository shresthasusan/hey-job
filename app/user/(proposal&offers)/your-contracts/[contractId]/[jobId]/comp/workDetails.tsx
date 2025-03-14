"use client";

import { useEffect, useState } from "react";
import JobDetails from "./jobDetails";
import TimeLine from "./timeLine";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import Requirements from "./Requirements";
import Deliveries from "./deliveries";
import FileSection from "./fileSection";
import ClientDashboard from "@/app/ui/dashboard-components/talent-posting/dashboard";
import ClientInfomation from "./clientInfomation";
import CommunicationSection from "./communicationSection";

interface Props {
  contractId: string;
  jobId: string;
}

export default function ContractDetailsPage({ contractId, jobId }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project details using useEffect
  useEffect(() => {
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

    if (contractId) {
      fetchProjectDetails();
    }
  }, [contractId]);

  const [contract, setContract] = useState<any>();

  // Update the handleAddTimelineItem function to use the state setter
  // Replace the existing handleAddTimelineItem function with:

  // Helper function to get status color

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <JobDetails jobId={jobId} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline Section */}
          <TimeLine
            contractId={contractId}
            project_todo={contract?.project_todo}
          />
          {/* Requirements Section */}
          <Requirements requirements={contract?.requirements} />
          {/* Deliverables Section */}
          <Deliveries
            deliverables={contract?.deliveries}
            contractId={contractId}
          />
          {/* Files Section */}
          <FileSection
            files={contract?.project_files}
            contractId={contractId}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Information */}
          <ClientInfomation jobId={jobId} />
          {/* Communication Section */}
          <CommunicationSection
            contractId={contractId}
            meetings={contract?.meetings}
          />
          {/* <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
          </div> */}
        </div>
      </div>
    </div>
  );
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
