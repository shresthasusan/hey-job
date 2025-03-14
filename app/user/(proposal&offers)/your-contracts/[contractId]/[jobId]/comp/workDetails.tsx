"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  DocumentPlusIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  PhoneIcon,
  PlusIcon,
  SignalIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import JobDetails from "./jobDetails";
import TimeLine from "./timeLine";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

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
          {/* <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div
              className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("requirements")}
            >
              <h2 className="text-lg font-semibold">Project Requirements</h2>
              {expandedSections.requirements ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
            {expandedSections.requirements && (
              <div className="p-4">
                <ul className="space-y-2">
                  {contract.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}

          {/* Deliverables Section */}
          {/* <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div
              className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("deliverables")}
            >
              <h2 className="text-lg font-semibold">Deliverables</h2>
              {expandedSections.deliverables ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
            {expandedSections.deliverables && (
              <div className="p-4">
                <ul className="space-y-2">
                  {contract.deliverables.map((del, index) => (
                    <li key={index} className="flex items-start">
                      <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div> */}

          {/* Files Section */}
          {/* <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div
              className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleSection("files")}
            >
              <h2 className="text-lg font-semibold">Project Files</h2>
              {expandedSections.files ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div> */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Information */}

          {/* <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Client Information</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">{contract.client.name}</p>
                  <p className="text-sm text-gray-600">
                    {contract.client.position}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href={`mailto:${contract.client.email}`}
                  className="flex items-center text-sm text-gray-700 hover:text-blue-600"
                >
                  <DocumentPlusIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {contract.client.email}
                </a>
                <a
                  href={`tel:${contract.client.phone}`}
                  className="flex items-center text-sm text-gray-700 hover:text-blue-600"
                >
                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {contract.client.phone}
                </a>
                <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mt-2">
                  <PaperAirplaneIcon className="h-4 w-4 mr-1" />
                  Send Message
                </button>
              </div>
            </div>
          </div> */}

          {/* Communication Section */}
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
