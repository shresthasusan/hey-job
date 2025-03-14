"use client";

import {
  ChevronUpIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/lib/firebase";
import { fetchWithAuth } from "@/app/lib/fetchWIthAuth";

interface FileItem {
  file_name: string;
  url: string;
  uploaded_at: string | Date;
}

interface Props {
  files: FileItem[];
  contractId: string; // Add contractId for PATCH request
}

const FileSection = ({ files: initialFiles, contractId }: Props) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Sync initial files from props to local state
  useEffect(() => {
    console.log("Initial files from props:", initialFiles);
    setFiles(initialFiles);
  }, [initialFiles]);

  const [expandedSections, setExpandedSections] = useState({
    files: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // Create a reference to the file in Firebase Storage
      const fileRef = ref(
        storage,
        `project_files/${contractId}/${selectedFile.name}`
      );

      // Upload the file
      await uploadBytes(fileRef, selectedFile);

      // Get the download URL
      const fileUrl = await getDownloadURL(fileRef);

      // Create new file object
      const newFile: FileItem = {
        file_name: selectedFile.name,
        url: fileUrl,
        uploaded_at: new Date().toISOString(),
      };

      // Optimistically update local state
      const updatedFiles = [...files, newFile];
      setFiles(updatedFiles);

      // Send PATCH request to update project_files in the database
      const response = await fetchWithAuth("/api/project-details", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId,
          updates: {
            project_files: updatedFiles, // Send full array
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project files");
      }

      const data = await response.json();
      console.log("Project files updated successfully:", data);

      // Reset file input
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file or updating project:", error);
      // Revert local state on failure
      setFiles(files);
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
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
          <div className="flex justify-end mb-4">
            <label
              htmlFor="file-upload"
              className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center cursor-pointer"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Add File
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>
          {selectedFile && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Selected file: {selectedFile.name}
              </p>
              <button
                onClick={handleUploadFile}
                disabled={isUploading}
                className={`mt-2 px-4 py-2 rounded-md text-white font-medium text-sm ${
                  isUploading
                    ? "bg-primary-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                }`}
              >
                {isUploading ? "Uploading..." : "Upload File"}
              </button>
            </div>
          )}
          <ul className="space-y-2">
            {files?.length > 0 ? (
              files.map((file, index) => (
                <li key={index} className="flex items-center">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    {file.file_name}
                  </a>
                  <span className="ml-2 text-sm text-gray-500">
                    (Uploaded:{" "}
                    {typeof file.uploaded_at === "string"
                      ? new Date(file.uploaded_at).toLocaleDateString()
                      : file.uploaded_at.toLocaleDateString()}
                    )
                  </span>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No files available.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileSection;
