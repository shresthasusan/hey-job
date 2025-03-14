"use client";

import React from "react";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

interface ButtonProps {
  action: "completed" | "canceled"; // Updated action types
  contractId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  action,
  contractId,
  onSuccess,
  onError,
  disabled = false,
  children,
  className = "",
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  // Default styles based on action type
  const baseStyles =
    "px-4 py-2 rounded-md text-white font-medium text-sm focus:outline-none";
  const actionStyles =
    action === "completed"
      ? "bg-green-600 hover:bg-green-700 disabled:bg-green-400" // Green for completed
      : "bg-red-600 hover:bg-red-700 disabled:bg-red-400"; // Red for canceled
  const combinedStyles = `${baseStyles} ${actionStyles} ${className} ${
    disabled || isLoading ? "cursor-not-allowed" : ""
  }`;

  // Default text if no children provided
  const defaultText =
    action === "completed" ? "Mark as Completed" : "Cancel Project";

  const handleAction = async () => {
    if (isLoading || disabled) return;

    setIsLoading(true);

    try {
      const endpoint = "/api/project-details";
      const updates =
        action === "completed"
          ? { status: "completed" } // Updated status
          : { status: "canceled" };

      const response = await fetchWithAuth(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
          updates,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${action === "completed" ? "complete" : "cancel"} project`
        );
      }

      const data = await response.json();
      console.log(`${action} project successful:`, data);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(
        `Error ${action === "completed" ? "completing" : "canceling"} project:`,
        error
      );
      if (onError) {
        onError(error instanceof Error ? error : new Error("Unknown error"));
      }
      alert(
        `Failed to ${action === "completed" ? "complete" : "cancel"} project. Please try again.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAction}
      disabled={disabled || isLoading}
      className={combinedStyles}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
            />
          </svg>
          {action === "completed" ? "Completing..." : "Canceling..."}
        </span>
      ) : (
        children || defaultText
      )}
    </button>
  );
};

export default Button;
