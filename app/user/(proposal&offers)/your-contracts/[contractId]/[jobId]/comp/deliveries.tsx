"use client";

import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

interface Props {
  deliverables: string[]; // Allow undefined
  contractId: string;
}

const Deliveries = ({
  deliverables: initialDeliverables,
  contractId,
}: Props) => {
  const [deliverables, setDeliverables] =
    useState<string[]>(initialDeliverables);
  const [newDeliverable, setNewDeliverable] = useState("");
  const [isAddDeliverableOpen, setIsAddDeliverableOpen] = useState(false);

  // Sync initial deliverables from props safely
  useEffect(() => {
    if (Array.isArray(initialDeliverables)) {
      setDeliverables(initialDeliverables);
    }
  }, [initialDeliverables]);

  const [expandedSections, setExpandedSections] = useState({
    deliverables: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddDeliverable = async () => {
    if (!newDeliverable.trim()) return;

    const updatedDeliverables = [...deliverables, newDeliverable];
    setDeliverables(updatedDeliverables);

    try {
      const response = await fetchWithAuth("/api/project-details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
          updates: {
            deliveries: updatedDeliverables,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update deliverables");
      }

      const data = await response.json();
      console.log("Deliverables updated successfully:", data);

      // Reset form and close modal
      setNewDeliverable("");
      setIsAddDeliverableOpen(false);
    } catch (error) {
      console.error("Error updating deliverables:", error);
      setDeliverables(deliverables); // Revert to the previous state
      alert("Failed to add deliverable. Please try again.");
    }
  };

  return (
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
          <div className="flex justify-end mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAddDeliverableOpen(true);
              }}
              className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Deliverable
            </button>
          </div>
          <ul className="space-y-2">
            {deliverables?.length > 0 ? (
              deliverables.map((del, index) => (
                <li key={index} className="flex items-start">
                  <DocumentTextIcon className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{del}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No deliverables available.</p>
            )}
          </ul>
        </div>
      )}

      {isAddDeliverableOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Add Deliverable</h3>
              <p className="text-gray-500 mt-1">
                Add a new deliverable to the project.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="deliverable"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Deliverable
                </label>
                <input
                  type="text"
                  id="deliverable"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Final Design Mockup"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddDeliverableOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDeliverable}
                disabled={!newDeliverable.trim()}
                className={`px-4 py-2 rounded-md text-white font-medium text-sm ${
                  !newDeliverable.trim()
                    ? "bg-primary-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                }`}
              >
                Add Deliverable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deliveries;
