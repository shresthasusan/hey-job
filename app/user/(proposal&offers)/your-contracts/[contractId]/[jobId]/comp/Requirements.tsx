"use client";

import {
  ChevronUpIcon,
  ChevronDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface Props {
  requirements?: string[]; // Allow undefined
}

const Requirements = ({ requirements = [] }: Props) => {
  const [expandedSections, setExpandedSections] = useState({
    requirements: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
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
          {requirements.length > 0 ? (
            <ul className="space-y-2">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No requirements specified.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Requirements;
