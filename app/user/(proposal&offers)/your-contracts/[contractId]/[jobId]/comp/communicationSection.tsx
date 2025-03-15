"use client";

import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  CalendarDaysIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";

interface MeetingItem {
  meeting_date: string | Date;
  meeting_link: string;
  scheduled_by: "freelancer" | "client";
  notes?: string;
}

interface Props {
  meetings: MeetingItem[]; // Allow undefined
  contractId: string;
  userRole: "freelancer" | "client"; // Make required to match schema
}

const CommunicationSection = ({
  meetings: initialMeetings, // Default to empty array
  contractId,
  userRole,
}: Props) => {
  const [meetings, setMeetings] = useState<MeetingItem[]>(initialMeetings);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    meeting_date: "",
    meeting_link: "",
    notes: "",
  });

  // Sync initial meetings from props safely
  useEffect(() => {
    if (Array.isArray(initialMeetings)) {
      setMeetings(initialMeetings);
    }
  }, [initialMeetings]);

  const [expandedSections, setExpandedSections] = useState({
    communication: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleScheduleMeeting = async () => {
    if (!newMeeting.meeting_date || !newMeeting.meeting_link) return;

    const newMeetingData: MeetingItem = {
      meeting_date: newMeeting.meeting_date,
      meeting_link: newMeeting.meeting_link,
      scheduled_by: userRole, // Use the passed userRole
      notes: newMeeting.notes || undefined,
    };

    // Optimistically update local state
    const updatedMeetings = [...meetings, newMeetingData];
    setMeetings(updatedMeetings);

    try {
      // Send PATCH request using fetchWithAuth
      const response = await fetchWithAuth("/api/project-details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
          updates: {
            meetings: updatedMeetings,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule meeting");
      }

      const data = await response.json();
      console.log("Meeting scheduled successfully:", data);

      // Reset form and close dialog
      setNewMeeting({ meeting_date: "", meeting_link: "", notes: "" });
      setIsScheduleOpen(false);
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      // Revert local state on failure
      setMeetings(meetings);
      alert("Failed to schedule meeting. Please try again.");
    }
  };

  return (
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
            {meetings?.length > 0 ? (
              meetings.map((meeting, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-5 w-5 text-primary-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">
                        <a
                          href={meeting.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Meeting Link
                        </a>
                      </p>
                      <p className="text-xs text-gray-500">
                        {typeof meeting.meeting_date === "string"
                          ? new Date(meeting.meeting_date).toLocaleString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : meeting.meeting_date.toLocaleString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        {" • Scheduled by "}
                        {meeting.scheduled_by === userRole
                          ? "You"
                          : meeting.scheduled_by}
                      </p>
                      {meeting.notes && (
                        <p className="text-sm text-gray-600 mt-1">
                          {meeting.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No meetings scheduled.</p>
            )}
            <button
              onClick={() => setIsScheduleOpen(true)}
              className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-800 mt-2"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Schedule Meeting
            </button>
          </div>
        </div>
      )}
      {isScheduleOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium">Schedule a Meeting</h3>
              <p className="text-gray-500 mt-1">
                Add a new meeting to the project communication.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="meeting-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Meeting Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="meeting-date"
                  value={newMeeting.meeting_date}
                  onChange={(e) =>
                    setNewMeeting({
                      ...newMeeting,
                      meeting_date: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label
                  htmlFor="meeting-link"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Meeting Link
                </label>
                <input
                  type="url"
                  id="meeting-link"
                  value={newMeeting.meeting_link}
                  onChange={(e) =>
                    setNewMeeting({
                      ...newMeeting,
                      meeting_link: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., https://zoom.us/j/123456789"
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={newMeeting.notes}
                  onChange={(e) =>
                    setNewMeeting({ ...newMeeting, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Additional details..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsScheduleOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleMeeting}
                disabled={!newMeeting.meeting_date || !newMeeting.meeting_link}
                className={`px-4 py-2 rounded-md text-white font-medium text-sm ${
                  !newMeeting.meeting_date || !newMeeting.meeting_link
                    ? "bg-primary-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                }`}
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationSection;
