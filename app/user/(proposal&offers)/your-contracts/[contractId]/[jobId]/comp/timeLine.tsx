"use client";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PlusIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

const TimeLine = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Not Started":
        return "bg-gray-100 text-gray-800";
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const [isAddTimelineItemOpen, setIsAddTimelineItemOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    timeline: true,
    budget: true,
    requirements: true,
    deliverables: true,
    communication: true,
    files: true,
  });
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
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
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div
        className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-50"
        onClick={() => toggleSection("timeline")}
      >
        <h2 className="text-lg font-semibold">Project Timeline</h2>
        <div className="flex items-center">
          {expandedSections.timeline ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500 ml-2" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500 ml-2" />
          )}
        </div>
      </div>
      {expandedSections.timeline && (
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAddTimelineItemOpen(true);
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Phase
            </button>
          </div>
          <div className="space-y-6">
            {contract.timeline.map((phase, index) => (
              <div
                key={index}
                className="relative pl-8 pb-6 border-l-2 border-gray-200 last:pb-0"
              >
                <div
                  className={`absolute left-[-8px] top-0 w-4 h-4 rounded-full border-2 border-white ${
                    phase.status === "Completed"
                      ? "bg-green-500"
                      : phase.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-gray-300"
                  }`}
                ></div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="font-medium">{phase.phase}</h3>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(phase.status)}`}
                  >
                    {phase.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  <ClockIcon className="inline-block h-4 w-4 mr-1 text-gray-500" />
                  {phase.startDate} - {phase.endDate}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeLine;
