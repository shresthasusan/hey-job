"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const KYCPage = () => {
  interface Document {
    _id: string;
    userId: string;
    fullName: string;
    status: "pending" | "approved" | "rejected";
    dateOfBirth: string;
    gender: string;
    nationality: string;
    citizenshipNumber: string;
    passportNumber: string;
    panNumber: string;
    address: {
      streetAddress: string;
      wardNumber: string;
      municipality: string;
      district: string;
      province: string;
    };
    documents: {
      profilePicture: string;
      citizenshipFront: string;
      citizenshipBack: string;
    };
  }

  const [uploadedDocs, setUploadedDocs] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false); // State to track refreshing status

  // Function to fetch KYC data
  const fetchKYCData = async () => {
    try {
      const res = await fetch("/api/admin/fetch-kycs");
      const data = await res.json();
      setUploadedDocs(data);
    } catch (error) {
      console.error("Error fetching KYC data:", error);
    } finally {
      setIsRefreshing(false); // Reset refreshing state
    }
  };

  // Fetch KYC data on component mount
  useEffect(() => {
    fetchKYCData();
  }, []);

  // Function to handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true); // Set refreshing state to true
    await fetchKYCData(); // Refetch KYC data
  };

  // Function to handle approval or rejection of a document
  const handleAction = async (id: string, status: "approved" | "rejected") => {
    try {
      const res = await fetch(`/api/admin/update-kyc-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        // Refetch KYC data after successful update
        await fetchKYCData();
        setSelectedDoc(null); // Close the overlay after action
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating KYC status:", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-6 md:p-10 bg-white min-h-screen">
      {/* Heading */}
      <h1 className="text-4xl text-black-400 text-center md:text-left">
        KYC Verification
      </h1>

      {/* Refresh Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Uploaded Documents Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-700">
          Uploaded Documents:
        </h2>

        <div className="mt-4 space-y-4">
          {uploadedDocs
            .filter((doc) => doc.status === "pending")
            .map((doc) => (
              <div
                key={doc._id}
                className="flex items-center justify-between bg-gray-50 shadow-md p-4 rounded-lg cursor-pointer"
                onClick={() => setSelectedDoc(doc)}
              >
                <p className="text-gray-800 font-medium">{doc.fullName}</p>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-lg font-semibold ${
                      doc.status === "pending"
                        ? "bg-yellow-400 text-black"
                        : doc.status === "approved"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Overlay Card */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedDoc(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">KYC Details</h2>
            <div className="space-y-2">
              <p>
                <strong>Full Name:</strong> {selectedDoc.fullName}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(selectedDoc.dateOfBirth).toLocaleDateString()}
              </p>
              <p>
                <strong>Gender:</strong> {selectedDoc.gender}
              </p>
              <p>
                <strong>Nationality:</strong> {selectedDoc.nationality}
              </p>
              <p>
                <strong>Citizenship Number:</strong>{" "}
                {selectedDoc.citizenshipNumber}
              </p>
              <p>
                <strong>Passport Number:</strong> {selectedDoc.passportNumber}
              </p>
              <p>
                <strong>PAN Number:</strong> {selectedDoc.panNumber}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${selectedDoc.address.streetAddress}, ${selectedDoc.address.wardNumber}, ${selectedDoc.address.municipality}, ${selectedDoc.address.district}, ${selectedDoc.address.province}`}
              </p>
              <div className="flex gap-4">
                <div>
                  <p>
                    <strong>Profile Picture:</strong>
                  </p>
                  <Image
                    src={selectedDoc.documents.profilePicture}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
                <div>
                  <p>
                    <strong>Citizenship Front:</strong>
                  </p>
                  <Image
                    src={selectedDoc.documents.citizenshipFront}
                    alt="Citizenship Front"
                    className="w-32 h-32 object-cover rounded-md"
                    width={128}
                    height={128}
                  />
                </div>
                <div>
                  <p>
                    <strong>Citizenship Back:</strong>
                  </p>
                  <Image
                    src={selectedDoc.documents.citizenshipBack}
                    alt="Citizenship Back"
                    className="w-32 h-32 object-cover rounded-md"
                    width={128}
                    height={128}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="px-4 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => handleAction(selectedDoc._id, "approved")}
              >
                Approve
              </button>
              <button
                className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => handleAction(selectedDoc._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCPage;
