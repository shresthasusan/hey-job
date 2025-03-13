"use client";

import { useState } from "react";
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

interface Props {
  contractId: string;
  jobId: string;
}

export default function ContractDetailsPage({ contractId, jobId }: Props) {
  const [expandedSections, setExpandedSections] = useState({
    timeline: true,
    budget: true,
    requirements: true,
    deliverables: true,
    communication: true,
    files: true,
  });

  // Add a new state for the add timeline item dialog
  const [isAddTimelineItemOpen, setIsAddTimelineItemOpen] = useState(false);
  const [newTimelineItem, setNewTimelineItem] = useState({
    phase: "",
    startDate: "",
    endDate: "",
    status: "Not Started",
  });

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Change the contract from a constant to a state variable
  // Replace the constant contract declaration with:

  const [contract, setContract] = useState({
    title: "E-commerce Website Redesign",
    status: "In Progress",
    startDate: "March 15, 2025",
    endDate: "May 30, 2025",
    company: "ShopEasy Inc.",
    description:
      "Complete redesign of the ShopEasy e-commerce platform with focus on user experience, mobile optimization, and improved checkout flow.",
    budget: {
      total: "$7,500",
      paid: "$2,250",
      pending: "$5,250",
      schedule: [
        {
          milestone: "Project Initiation",
          amount: "$2,250 (30%)",
          status: "Paid",
          date: "March 15, 2025",
        },
        {
          milestone: "Design Approval",
          amount: "$2,250 (30%)",
          status: "Pending",
          date: "April 15, 2025",
        },
        {
          milestone: "Project Completion",
          amount: "$3,000 (40%)",
          status: "Pending",
          date: "May 30, 2025",
        },
      ],
    },
    timeline: [
      {
        phase: "Research & Planning",
        startDate: "March 15, 2025",
        endDate: "March 25, 2025",
        status: "Completed",
        description:
          "Market research, competitor analysis, and project planning.",
      },
      {
        phase: "Wireframing & Design",
        startDate: "March 26, 2025",
        endDate: "April 15, 2025",
        status: "In Progress",
        description: "Create wireframes and design mockups for all pages.",
      },
      {
        phase: "Development",
        startDate: "April 16, 2025",
        endDate: "May 15, 2025",
        status: "Not Started",
        description:
          "Frontend and backend implementation of the approved designs.",
      },
      {
        phase: "Testing & QA",
        startDate: "May 16, 2025",
        endDate: "May 25, 2025",
        status: "Not Started",
        description: "Comprehensive testing and quality assurance.",
      },
      {
        phase: "Deployment",
        startDate: "May 26, 2025",
        endDate: "May 30, 2025",
        status: "Not Started",
        description: "Final deployment and handover.",
      },
    ],
    client: {
      name: "Sarah Johnson",
      position: "Product Manager",
      email: "sarah.johnson@shopeasy.com",
      phone: "+1 (555) 123-4567",
    },
    requirements: [
      "Responsive design that works seamlessly on desktop, tablet, and mobile devices",
      "Integration with existing inventory management system",
      "Improved product search and filtering functionality",
      "Streamlined checkout process with multiple payment options",
      "Customer account management with order history",
      "Admin dashboard for content and order management",
    ],
    deliverables: [
      "Complete design files (Figma)",
      "Fully functional website with responsive design",
      "Integration with payment gateways (Stripe, PayPal)",
      "Admin dashboard for product and order management",
      "Documentation for content management",
      "30 days of post-launch support",
    ],
    nextSteps: [
      "Schedule kickoff meeting with client",
      "Gather brand assets and style guidelines",
      "Set up project management and communication tools",
      "Begin research phase",
    ],
    files: [
      { name: "Project Brief.pdf", size: "2.4 MB", date: "March 10, 2025" },
      { name: "Brand Guidelines.pdf", size: "5.1 MB", date: "March 10, 2025" },
      {
        name: "Current Site Analysis.xlsx",
        size: "1.8 MB",
        date: "March 12, 2025",
      },
    ],
  });

  // Update the handleAddTimelineItem function to use the state setter
  // Replace the existing handleAddTimelineItem function with:

  const handleAddTimelineItem = () => {
    // Validate the form
    if (
      !newTimelineItem.phase ||
      !newTimelineItem.startDate ||
      !newTimelineItem.endDate
    ) {
      return;
    }

    // Create a new timeline item with description
    const newItem = {
      ...newTimelineItem,
      description: `Added phase: ${newTimelineItem.phase}`,
    };

    // Update the contract state using the setter function
    setContract((prevContract) => ({
      ...prevContract,
      timeline: [...prevContract.timeline, newItem],
    }));

    // Reset the form and close the dialog
    setNewTimelineItem({
      phase: "",
      startDate: "",
      endDate: "",
      status: "Not Started",
    });
    setIsAddTimelineItemOpen(false);
  };

  // Helper function to get status color

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <JobDetails jobId={jobId} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline Section */}
          <TimeLine />
          {/* Requirements Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
          </div>

          {/* Deliverables Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
          </div>

          {/* Files Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
            {expandedSections.files && (
              <div className="p-4">
                <div className="space-y-3">
                  {contract.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {file.size} • Uploaded on {file.date}
                          </p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                        <SignalIcon className="h-4 w-4 mr-1" />
                        SignalIcon
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Upload New File
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Information */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Next Steps</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {contract.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center text-xs font-bold text-blue-500 mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Start Project
              </button>
            </div>
          </div>

          {/* Communication Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
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
          </div>
        </div>
      </div>
      {isAddTimelineItemOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Add Timeline Phase</h3>
              <p className="text-gray-500 mt-1">
                Add a new phase to the project timeline.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="phase-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phase Name
                </label>
                <input
                  type="text"
                  id="phase-name"
                  value={newTimelineItem.phase}
                  onChange={(e) =>
                    setNewTimelineItem({
                      ...newTimelineItem,
                      phase: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., User Testing"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="start-date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date
                  </label>
                  <input
                    type="text"
                    id="start-date"
                    value={newTimelineItem.startDate}
                    onChange={(e) =>
                      setNewTimelineItem({
                        ...newTimelineItem,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., June 1, 2025"
                  />
                </div>

                <div>
                  <label
                    htmlFor="end-date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    End Date
                  </label>
                  <input
                    type="text"
                    id="end-date"
                    value={newTimelineItem.endDate}
                    onChange={(e) =>
                      setNewTimelineItem({
                        ...newTimelineItem,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., June 15, 2025"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={newTimelineItem.status}
                  onChange={(e) =>
                    setNewTimelineItem({
                      ...newTimelineItem,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddTimelineItemOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTimelineItem}
                disabled={
                  !newTimelineItem.phase ||
                  !newTimelineItem.startDate ||
                  !newTimelineItem.endDate
                }
                className={`px-4 py-2 rounded-md text-white font-medium text-sm ${
                  !newTimelineItem.phase ||
                  !newTimelineItem.startDate ||
                  !newTimelineItem.endDate
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Add to Timeline
              </button>
            </div>
          </div>
        </div>
      )}
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
